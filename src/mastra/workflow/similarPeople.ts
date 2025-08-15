import { z } from 'zod';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { PeopleKB } from '../kb/people.js';
import type { Person } from '../kb/people.js';

const similarPeopleSchema = z.object({
  profileUrl: z.string().url(),
  topK: z.number().optional().default(5),
});

const similarPeopleResultSchema = z.object({
  targetPerson: z.object({
    url: z.string(),
    title: z.string(),
    bio: z.string(),
    genre: z.string(),
    genreConfidence: z.number(),
    genreKeywords: z.array(z.string()),
    webSearchResults: z.array(z.object({
      title: z.string(),
      url: z.string(),
      snippet: z.string(),
    })),
    links: z.array(z.string()),
    timestamp: z.date(),
  }),
  similarPeople: z.array(z.object({
    person: z.object({
      url: z.string(),
      title: z.string(),
      bio: z.string(),
      genre: z.string(),
      genreConfidence: z.number(),
      genreKeywords: z.array(z.string()),
      webSearchResults: z.array(z.object({
        title: z.string(),
        url: z.string(),
        snippet: z.string(),
      })),
      links: z.array(z.string()),
      timestamp: z.date(),
    }),
    similarity: z.number(),
  })),
  kbStats: z.object({
    total: z.number(),
    genres: z.record(z.string(), z.number()),
  }),
});

// Simple keyword-based genre classification
const genreKeywords: Record<string, string[]> = {
  'Technology': [
    'software', 'developer', 'programmer', 'engineer', 'tech', 'coding', 'startup',
    'ai', 'machine learning', 'data science', 'blockchain', 'web3', 'cybersecurity',
    'cloud', 'devops', 'frontend', 'backend', 'fullstack', 'mobile', 'ios', 'android'
  ],
  'Business': [
    'entrepreneur', 'founder', 'ceo', 'consultant', 'business', 'strategy', 'marketing',
    'sales', 'finance', 'investment', 'venture capital', 'startup', 'corporate',
    'management', 'leadership', 'executive', 'board', 'advisor'
  ],
  'Creative': [
    'designer', 'artist', 'photographer', 'filmmaker', 'writer', 'author', 'musician',
    'creative', 'design', 'art', 'photography', 'video', 'content', 'branding',
    'illustration', 'graphic', 'ui/ux', 'visual', 'creative director'
  ],
  'Education': [
    'professor', 'teacher', 'educator', 'researcher', 'academic', 'university',
    'education', 'learning', 'teaching', 'research', 'phd', 'scholar', 'lecturer',
    'student', 'school', 'college', 'institution'
  ],
  'Media': [
    'journalist', 'reporter', 'editor', 'media', 'news', 'broadcast', 'tv', 'radio',
    'podcast', 'blogger', 'influencer', 'content creator', 'youtube', 'social media',
    'publisher', 'broadcasting', 'communication'
  ],
  'Healthcare': [
    'doctor', 'physician', 'nurse', 'healthcare', 'medical', 'health', 'hospital',
    'clinic', 'patient', 'treatment', 'medicine', 'pharmacy', 'therapy', 'wellness',
    'fitness', 'nutrition', 'mental health'
  ],
  'Science': [
    'scientist', 'researcher', 'phd', 'laboratory', 'research', 'science', 'biology',
    'chemistry', 'physics', 'mathematics', 'experiment', 'discovery', 'publication',
    'academic', 'university', 'institute'
  ],
  'Politics': [
    'politician', 'government', 'policy', 'politics', 'election', 'campaign',
    'legislator', 'senator', 'representative', 'mayor', 'governor', 'president',
    'activist', 'advocacy', 'public service', 'diplomat'
  ],
  'Sports': [
    'athlete', 'player', 'coach', 'sports', 'team', 'league', 'championship',
    'fitness', 'training', 'competition', 'olympics', 'football', 'basketball',
    'baseball', 'soccer', 'tennis', 'golf'
  ],
  'Entertainment': [
    'actor', 'actress', 'performer', 'entertainment', 'film', 'movie', 'tv show',
    'theater', 'stage', 'comedy', 'drama', 'music', 'singer', 'dancer', 'celebrity',
    'hollywood', 'broadway'
  ]
};

export class SimilarPeopleWorkflow {
  name = 'similarPeople';
  description = 'Find similar people to a given social profile by fetching, enriching, and querying the knowledge base';
  schema = similarPeopleSchema;

  private kb: PeopleKB;

  constructor() {
    this.kb = new PeopleKB();
  }

  private async fetchProfile(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const title = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled';
      const bio = $('meta[name="description"]').attr('content') || 
                  $('meta[property="og:description"]').attr('content') ||
                  $('.bio, .description, .about, [class*="bio"], [class*="description"]').first().text().trim() ||
                  '';
      
      const links: string[] = [];
      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('http')) {
          links.push(href);
        }
      });
      
      const uniqueLinks = [...new Set(links)].slice(0, 10);
      
      return {
        url,
        title,
        bio,
        links: uniqueLinks,
      };
    } catch (error) {
      throw new Error(`Error fetching profile from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async webSearch(query: string, maxResults: number = 5) {
    // Stub implementation - returns empty results for now
    console.log(`[WebSearch] Stub search for: "${query}" (max ${maxResults} results)`);
    return {
      results: [],
    };
  }

  private classifyGenre(text: string) {
    const lowerText = text.toLowerCase();
    const scores: Record<string, { score: number; keywords: string[] }> = {};
    
    // Initialize scores
    Object.keys(genreKeywords).forEach(genre => {
      scores[genre] = { score: 0, keywords: [] };
    });
    
    // Calculate scores for each genre
    Object.entries(genreKeywords).forEach(([genre, keywords]) => {
      const matchedKeywords: string[] = [];
      const genreScore = scores[genre];
      if (genreScore) {
        keywords.forEach(keyword => {
          if (lowerText.includes(keyword.toLowerCase())) {
            genreScore.score += 1;
            matchedKeywords.push(keyword);
          }
        });
        genreScore.keywords = matchedKeywords;
      }
    });
    
    // Find the genre with the highest score
    let bestGenre = 'Other';
    let bestScore = 0;
    let bestKeywords: string[] = [];
    
    Object.entries(scores).forEach(([genre, { score, keywords }]) => {
      if (score > bestScore) {
        bestScore = score;
        bestGenre = genre;
        bestKeywords = keywords;
      }
    });
    
    // Calculate confidence
    const confidence = bestScore > 0 
      ? Math.min(0.9, bestScore / Math.max(1, text.split(' ').length * 0.1))
      : 0.1;
    
    return {
      genre: bestGenre,
      confidence,
      keywords: bestKeywords,
    };
  }

  async execute({ profileUrl, topK }: z.infer<typeof similarPeopleSchema>): Promise<z.infer<typeof similarPeopleResultSchema>> {
    // Step 1: Fetch the profile
    console.log(`[SimilarPeople] Fetching profile from: ${profileUrl}`);
    const profileData = await this.fetchProfile(profileUrl);

    // Step 2: Web search for additional information
    console.log(`[SimilarPeople] Searching web for: ${profileData.title}`);
    const searchQuery = `${profileData.title} ${profileData.bio}`.substring(0, 100);
    const webSearchResults = await this.webSearch(searchQuery, 5);

    // Step 3: Classify the genre
    console.log(`[SimilarPeople] Classifying genre for: ${profileData.title}`);
    const classificationText = `${profileData.title} ${profileData.bio} ${webSearchResults.results.map((r: any) => r.snippet).join(' ')}`;
    const genreResult = this.classifyGenre(classificationText);

    // Step 4: Create person object
    const targetPerson: Person = {
      url: profileData.url,
      title: profileData.title,
      bio: profileData.bio,
      genre: genreResult.genre,
      genreConfidence: genreResult.confidence,
      genreKeywords: genreResult.keywords,
      webSearchResults: webSearchResults.results,
      links: profileData.links,
      timestamp: new Date(),
    };

    // Step 5: Store in knowledge base
    console.log(`[SimilarPeople] Storing person in knowledge base: ${targetPerson.title} (${targetPerson.genre})`);
    await this.kb.embed([targetPerson]);

    // Step 6: Query for similar people (exclude the same URL)
    console.log(`[SimilarPeople] Querying for similar people to: ${targetPerson.title}`);
    const queryText = `${targetPerson.title} ${targetPerson.bio} ${targetPerson.genre}`;
    const similarResults = await this.kb.query({ query: queryText, topK: topK + 1 });

    // Filter out the same person and limit results
    const filteredResults = similarResults
      .filter(result => result.person.url !== profileUrl)
      .slice(0, topK);

    // Step 7: Get knowledge base statistics
    const kbStats = this.kb.getStats();

    console.log(`[SimilarPeople] Found ${filteredResults.length} similar people out of ${kbStats.total} total profiles`);

    return {
      targetPerson,
      similarPeople: filteredResults,
      kbStats,
    };
  }

  /**
   * Convert workflow to a tool for use in agents
   */
  asTool() {
    return {
      id: this.name,
      name: this.name,
      description: this.description,
      schema: this.schema,
      execute: this.execute.bind(this),
    };
  }

  /**
   * Get the knowledge base instance for direct access
   */
  getKnowledgeBase(): PeopleKB {
    return this.kb;
  }
}
