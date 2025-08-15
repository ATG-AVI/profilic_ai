# Social Agent

A full-stack TypeScript application for social profile analysis with a modern Next.js frontend and powerful backend engine.

## 🌟 Features

### Backend
- **Profile Fetching**: Scrapes social profile URLs using Cheerio to extract title, bio, and links
- **Web Search**: Enriches profile data with web search results (stub implementation ready for API integration)
- **Genre Classification**: Simple keyword-based classifier mapping to predefined genres (Technology, Business, Creative, etc.)
- **Knowledge Base**: In-memory store with token-overlap similarity search
- **Similar People Workflow**: End-to-end pipeline to find similar profiles
- **AI Agent**: Simple agent that orchestrates the workflow and provides formatted results

### Frontend
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🌙 **Dark Mode**: Automatic dark/light theme support
- ⚡ **Real-time Analysis**: Live profile analysis with loading states
- 📊 **Rich Results**: Detailed analysis with similar people, statistics, and genre classification
- 🔗 **Direct Links**: Easy access to original profiles
- 📱 **Mobile Friendly**: Responsive design that works on all devices

## 📁 Project Structure

```
social-agent/
├── src/                    # Backend core
│   ├── mastra/
│   │   ├── agents/
│   │   │   └── social.ts   # Main agent class
│   │   ├── kb/
│   │   │   └── people.ts   # Knowledge base
│   │   └── workflow/
│   │       └── similarPeople.ts
│   ├── index.ts            # CLI entry point
│   └── example.js          # Usage examples
├── server/                 # Express API server
│   ├── index.js           # API server
│   └── package.json       # Server dependencies
├── frontend/              # Next.js frontend
│   ├── app/               # Next.js App Router
│   ├── lib/               # Utilities
│   └── package.json       # Frontend dependencies
├── setup.sh               # Automated setup script
└── README.md              # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script to install all dependencies and build the project:

```bash
./setup.sh
```

Then start the services:

```bash
# Terminal 1: Start backend server
cd server && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev
```

### Option 2: Manual Setup

1. **Install Backend Dependencies**:
```bash
npm install
npm run build
```

2. **Install Server Dependencies**:
```bash
cd server
npm install
cd ..
```

3. **Install Frontend Dependencies**:
```bash
cd frontend
npm install
cd ..
```

4. **Start Services**:
```bash
# Terminal 1: Backend server
cd server && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

5. **Open in Browser**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🎯 Usage

### Web Interface (Recommended)

1. Open http://localhost:3000 in your browser
2. Enter a social profile URL (Twitter, LinkedIn, etc.)
3. Click "Analyze Profile"
4. View detailed results including:
   - Profile analysis and genre classification
   - Similar people with similarity scores
   - Knowledge base statistics
   - Processing metrics

### Command Line Interface

```bash
npm start <profile-url> [--topK <number>]
```

Example:
```bash
npm start https://twitter.com/elonmusk --topK 5
```

### Programmatic API

```javascript
import { SocialAgent } from './src/mastra/agents/social.js';

const agent = new SocialAgent();
const result = await agent.analyzeProfile('https://twitter.com/elonmusk', 5);
console.log(JSON.stringify(result, null, 2));
```

## Supported Genres

The genre classifier supports the following categories:

- **Technology**: Software developers, engineers, tech entrepreneurs
- **Business**: Entrepreneurs, consultants, executives
- **Creative**: Designers, artists, photographers, writers
- **Education**: Professors, teachers, researchers
- **Media**: Journalists, content creators, influencers
- **Healthcare**: Doctors, nurses, medical professionals
- **Science**: Scientists, researchers, academics
- **Politics**: Politicians, government officials, activists
- **Sports**: Athletes, coaches, sports professionals
- **Entertainment**: Actors, musicians, performers

## Architecture

### Tools

- **FetchProfileTool**: Uses Cheerio to parse HTML and extract profile information
- **WebSearchTool**: Stub implementation ready for real web search API integration
- **GenreClassifyTool**: Keyword-based classification with confidence scoring

### Knowledge Base

- **PeopleKB**: In-memory store with token-overlap similarity
- Supports embedding, querying, and statistics
- Automatic deduplication by URL

### Workflow

- **SimilarPeopleWorkflow**: Orchestrates the entire process:
  1. Fetch profile data
  2. Enrich with web search
  3. Classify genre
  4. Store in knowledge base
  5. Query for similar people
  6. Return results with statistics

### Agent

- **SocialAgent**: Simple agent that orchestrates the workflow
- Provides formatted results with analysis and statistics
- Handles errors gracefully and returns structured responses

## 🛠️ Development

### Backend Scripts

- `npm run dev` - Start development mode with file watching
- `npm run build` - Build the project
- `npm start` - Run the CLI tool
- `npm run example` - Run the example script

### Frontend Scripts

- `cd frontend && npm run dev` - Start development server
- `cd frontend && npm run build` - Build for production
- `cd frontend && npm run start` - Start production server
- `cd frontend && npm run lint` - Run ESLint

### Server Scripts

- `cd server && npm run dev` - Start development server with auto-reload
- `cd server && npm start` - Start production server

## Configuration

The project uses ESM modules (`"type": "module"`) and TypeScript with strict settings. Key dependencies:

- `cheerio`: HTML parsing
- `node-fetch`: HTTP requests
- `zod`: Schema validation
- `tsx`: TypeScript execution

## Future Enhancements

- [ ] Integrate real web search API (Google Custom Search, Bing, etc.)
- [ ] Add persistent storage for knowledge base
- [ ] Implement more sophisticated similarity algorithms
- [ ] Add support for multiple social platforms
- [ ] Create web interface
- [ ] Add rate limiting and error handling
- [ ] Implement caching for profile data

## License

ISC
