export declare class SocialAgent {
    private workflow;
    constructor();
    /**
     * Analyze a social profile and find similar people
     */
    analyzeProfile(profileUrl: string, topK?: number): Promise<{
        success: boolean;
        targetPerson: {
            name: string;
            url: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            links: string[];
        };
        similarPeople: {
            name: string;
            url: string;
            bio: string;
            genre: string;
            similarity: number;
        }[];
        statistics: {
            totalProfilesInKB: number;
            genreDistribution: Record<string, number>;
            similarPeopleFound: number;
        };
        analysis: {
            summary: string;
            genre: string;
            keywords: string;
        };
        error?: never;
    } | {
        success: boolean;
        error: string;
        targetPerson: null;
        similarPeople: never[];
        statistics: null;
        analysis: null;
    }>;
    /**
     * Get a summary of the knowledge base
     */
    getKnowledgeBaseSummary(): Promise<{
        stats: {
            total: number;
            genres: Record<string, number>;
        };
        allPeople: {
            title: string;
            genre: string;
            url: string;
        }[];
    }>;
}
//# sourceMappingURL=social.d.ts.map