import { SimilarPeopleWorkflow } from '../workflow/similarPeople.js';

export class SocialAgent {
  private workflow: SimilarPeopleWorkflow;

  constructor() {
    this.workflow = new SimilarPeopleWorkflow();
  }

  /**
   * Analyze a social profile and find similar people
   */
  async analyzeProfile(profileUrl: string, topK: number = 5) {
    try {
      const result = await this.workflow.execute({ profileUrl, topK });
      
      // Format the result for better presentation
      return {
        success: true,
        targetPerson: {
          name: result.targetPerson.title,
          url: result.targetPerson.url,
          bio: result.targetPerson.bio,
          genre: result.targetPerson.genre,
          genreConfidence: result.targetPerson.genreConfidence,
          genreKeywords: result.targetPerson.genreKeywords,
          links: result.targetPerson.links,
        },
        similarPeople: result.similarPeople.map(item => ({
          name: item.person.title,
          url: item.person.url,
          bio: item.person.bio,
          genre: item.person.genre,
          similarity: item.similarity,
        })),
        statistics: {
          totalProfilesInKB: result.kbStats.total,
          genreDistribution: result.kbStats.genres,
          similarPeopleFound: result.similarPeople.length,
        },
        analysis: {
          summary: `Found ${result.similarPeople.length} similar people to "${result.targetPerson.title}"`,
          genre: `Classified as ${result.targetPerson.genre} (confidence: ${(result.targetPerson.genreConfidence * 100).toFixed(1)}%)`,
          keywords: result.targetPerson.genreKeywords.length > 0 
            ? `Key indicators: ${result.targetPerson.genreKeywords.join(', ')}`
            : 'No specific keywords identified',
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        targetPerson: null,
        similarPeople: [],
        statistics: null,
        analysis: null,
      };
    }
  }

  /**
   * Get a summary of the knowledge base
   */
  async getKnowledgeBaseSummary() {
    const workflow = new SimilarPeopleWorkflow();
    const kb = workflow.getKnowledgeBase();
    const stats = kb.getStats();
    
    return {
      stats,
      allPeople: kb.getAll().map(person => ({
        title: person.title,
        genre: person.genre,
        url: person.url,
      })),
    };
  }
}
