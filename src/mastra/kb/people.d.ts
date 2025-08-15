export interface Person {
    url: string;
    title: string;
    bio: string;
    genre: string;
    genreConfidence: number;
    genreKeywords: string[];
    webSearchResults: Array<{
        title: string;
        url: string;
        snippet: string;
    }>;
    links: string[];
    timestamp: Date;
}
export interface QueryResult {
    person: Person;
    similarity: number;
}
export declare class PeopleKB {
    private people;
    /**
     * Simple token-overlap similarity calculation
     */
    private calculateSimilarity;
    /**
     * Store a person in the knowledge base
     */
    embed(docs: Person[]): Promise<void>;
    /**
     * Query the knowledge base for similar people
     */
    query({ query, topK }: {
        query: string;
        topK?: number;
    }): Promise<QueryResult[]>;
    /**
     * Get all people in the knowledge base
     */
    getAll(): Person[];
    /**
     * Get person by URL
     */
    getByUrl(url: string): Person | undefined;
    /**
     * Get people by genre
     */
    getByGenre(genre: string): Person[];
    /**
     * Clear all data
     */
    clear(): void;
    /**
     * Get statistics about the knowledge base
     */
    getStats(): {
        total: number;
        genres: Record<string, number>;
    };
}
//# sourceMappingURL=people.d.ts.map