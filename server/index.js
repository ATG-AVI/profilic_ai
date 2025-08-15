import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { profileUrl, topK = 5 } = req.body

    if (!profileUrl) {
      return res.status(400).json({ error: 'Profile URL is required' })
    }

    // Run the social-agent CLI command
    const result = await runSocialAgent(profileUrl, topK)
    res.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    })
  }
})

// Function to run the social-agent
function runSocialAgent(profileUrl, topK) {
  return new Promise((resolve, reject) => {
    const backendPath = join(__dirname, '..', 'src', 'index.js')
    
    const child = spawn('node', [backendPath, profileUrl, topK.toString()], {
      cwd: join(__dirname, '..'),
      stdio: ['pipe', 'pipe', 'pipe']
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('close', (code) => {
      if (code === 0) {
        try {
          // Extract JSON from the output (it's the last JSON object)
          const lines = stdout.split('\n')
          let jsonOutput = ''
          for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim()
            if (line.startsWith('{') && line.endsWith('}')) {
              jsonOutput = line
              break
            }
          }
          
          if (!jsonOutput) {
            // Try to find JSON in the entire output
            const jsonMatch = stdout.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              jsonOutput = jsonMatch[0]
            }
          }
          
          if (!jsonOutput) {
            reject(new Error(`No JSON found in output: ${stdout}`))
            return
          }
          
          const result = JSON.parse(jsonOutput)
          resolve(result)
        } catch (error) {
          reject(new Error(`Failed to parse output: ${stdout}`))
        }
      } else {
        reject(new Error(`Process failed with code ${code}: ${stderr}`))
      }
    })

    child.on('error', (error) => {
      reject(new Error(`Failed to start process: ${error.message}`))
    })
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Social Agent Server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/analyze`)
})
