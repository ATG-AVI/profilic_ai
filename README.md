# Social Agent

A TypeScript-based social media analysis agent that takes a social profile URL, scrapes basic information, enriches it via web search, classifies the genre, and returns a list of similar people.

## Features

- **Profile Fetching**: Scrapes social profile URLs using Cheerio to extract title, bio, and links
- **Web Search**: Enriches profile data with web search results (stub implementation ready for API integration)
- **Genre Classification**: Simple keyword-based classifier mapping to predefined genres (Technology, Business, Creative, etc.)
- **Knowledge Base**: In-memory store with token-overlap similarity search
- **Similar People Workflow**: End-to-end pipeline to find similar profiles
- **AI Agent**: Simple agent that orchestrates the workflow and provides formatted results

## Project Structure

```
src/
├── mastra/
│   ├── agents/
│   │   └── social.ts          # Main social agent
│   ├── workflow/
│   │   └── similarPeople.ts   # End-to-end workflow with integrated tools
│   └── kb/
│       └── people.ts          # Knowledge base implementation
└── index.ts                   # CLI runner
```

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up your OpenAI API key:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

## Usage

### Command Line Interface

Analyze a social profile and find similar people:

```bash
# Basic usage
npm start https://twitter.com/username

# Specify number of similar people to find
npm start https://twitter.com/username 10
```

### Programmatic Usage

```typescript
import { SocialAgent } from './src/mastra/agents/social.js';

const agent = new SocialAgent();
const result = await agent.analyzeProfile('https://twitter.com/username', 5);
console.log(result);
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

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building

```bash
npm run build
```

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
