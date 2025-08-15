import { z } from 'zod';
import { PeopleKB } from '../kb/people.js';
declare const similarPeopleSchema: z.ZodObject<{
    profileUrl: z.ZodString;
    topK: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    topK: number;
    profileUrl: string;
}, {
    profileUrl: string;
    topK?: number | undefined;
}>;
declare const similarPeopleResultSchema: z.ZodObject<{
    targetPerson: z.ZodObject<{
        url: z.ZodString;
        title: z.ZodString;
        bio: z.ZodString;
        genre: z.ZodString;
        genreConfidence: z.ZodNumber;
        genreKeywords: z.ZodArray<z.ZodString, "many">;
        webSearchResults: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            url: z.ZodString;
            snippet: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            title: string;
            snippet: string;
        }, {
            url: string;
            title: string;
            snippet: string;
        }>, "many">;
        links: z.ZodArray<z.ZodString, "many">;
        timestamp: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        url: string;
        title: string;
        bio: string;
        genre: string;
        genreConfidence: number;
        genreKeywords: string[];
        webSearchResults: {
            url: string;
            title: string;
            snippet: string;
        }[];
        links: string[];
        timestamp: Date;
    }, {
        url: string;
        title: string;
        bio: string;
        genre: string;
        genreConfidence: number;
        genreKeywords: string[];
        webSearchResults: {
            url: string;
            title: string;
            snippet: string;
        }[];
        links: string[];
        timestamp: Date;
    }>;
    similarPeople: z.ZodArray<z.ZodObject<{
        person: z.ZodObject<{
            url: z.ZodString;
            title: z.ZodString;
            bio: z.ZodString;
            genre: z.ZodString;
            genreConfidence: z.ZodNumber;
            genreKeywords: z.ZodArray<z.ZodString, "many">;
            webSearchResults: z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                url: z.ZodString;
                snippet: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                title: string;
                snippet: string;
            }, {
                url: string;
                title: string;
                snippet: string;
            }>, "many">;
            links: z.ZodArray<z.ZodString, "many">;
            timestamp: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            url: string;
            title: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            webSearchResults: {
                url: string;
                title: string;
                snippet: string;
            }[];
            links: string[];
            timestamp: Date;
        }, {
            url: string;
            title: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            webSearchResults: {
                url: string;
                title: string;
                snippet: string;
            }[];
            links: string[];
            timestamp: Date;
        }>;
        similarity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        person: {
            url: string;
            title: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            webSearchResults: {
                url: string;
                title: string;
                snippet: string;
            }[];
            links: string[];
            timestamp: Date;
        };
        similarity: number;
    }, {
        person: {
            url: string;
            title: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            webSearchResults: {
                url: string;
                title: string;
                snippet: string;
            }[];
            links: string[];
            timestamp: Date;
        };
        similarity: number;
    }>, "many">;
    kbStats: z.ZodObject<{
        total: z.ZodNumber;
        genres: z.ZodRecord<z.ZodString, z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        total: number;
        genres: Record<string, number>;
    }, {
        total: number;
        genres: Record<string, number>;
    }>;
}, "strip", z.ZodTypeAny, {
    targetPerson: {
        url: string;
        title: string;
        bio: string;
        genre: string;
        genreConfidence: number;
        genreKeywords: string[];
        webSearchResults: {
            url: string;
            title: string;
            snippet: string;
        }[];
        links: string[];
        timestamp: Date;
    };
    similarPeople: {
        person: {
            url: string;
            title: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            webSearchResults: {
                url: string;
                title: string;
                snippet: string;
            }[];
            links: string[];
            timestamp: Date;
        };
        similarity: number;
    }[];
    kbStats: {
        total: number;
        genres: Record<string, number>;
    };
}, {
    targetPerson: {
        url: string;
        title: string;
        bio: string;
        genre: string;
        genreConfidence: number;
        genreKeywords: string[];
        webSearchResults: {
            url: string;
            title: string;
            snippet: string;
        }[];
        links: string[];
        timestamp: Date;
    };
    similarPeople: {
        person: {
            url: string;
            title: string;
            bio: string;
            genre: string;
            genreConfidence: number;
            genreKeywords: string[];
            webSearchResults: {
                url: string;
                title: string;
                snippet: string;
            }[];
            links: string[];
            timestamp: Date;
        };
        similarity: number;
    }[];
    kbStats: {
        total: number;
        genres: Record<string, number>;
    };
}>;
export declare class SimilarPeopleWorkflow {
    name: string;
    description: string;
    schema: z.ZodObject<{
        profileUrl: z.ZodString;
        topK: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        topK: number;
        profileUrl: string;
    }, {
        profileUrl: string;
        topK?: number | undefined;
    }>;
    private kb;
    constructor();
    private fetchProfile;
    private webSearch;
    private classifyGenre;
    execute({ profileUrl, topK }: z.infer<typeof similarPeopleSchema>): Promise<z.infer<typeof similarPeopleResultSchema>>;
    /**
     * Convert workflow to a tool for use in agents
     */
    asTool(): {
        id: string;
        name: string;
        description: string;
        schema: z.ZodObject<{
            profileUrl: z.ZodString;
            topK: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            topK: number;
            profileUrl: string;
        }, {
            profileUrl: string;
            topK?: number | undefined;
        }>;
        execute: ({ profileUrl, topK }: z.infer<typeof similarPeopleSchema>) => Promise<z.infer<typeof similarPeopleResultSchema>>;
    };
    /**
     * Get the knowledge base instance for direct access
     */
    getKnowledgeBase(): PeopleKB;
}
export {};
//# sourceMappingURL=similarPeople.d.ts.map