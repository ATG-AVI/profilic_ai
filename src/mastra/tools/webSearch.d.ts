import { Tool } from '@mastra/core';
import { z } from 'zod';
declare const webSearchSchema: z.ZodObject<{
    query: z.ZodString;
    maxResults: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    maxResults: number;
}, {
    query: string;
    maxResults?: number | undefined;
}>;
declare const webSearchResultSchema: z.ZodObject<{
    results: z.ZodArray<z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    results: {
        url: string;
        title: string;
        snippet: string;
    }[];
}, {
    results: {
        url: string;
        title: string;
        snippet: string;
    }[];
}>;
export declare class WebSearchTool extends Tool<typeof webSearchSchema, typeof webSearchResultSchema> {
    name: string;
    description: string;
    schema: z.ZodObject<{
        query: z.ZodString;
        maxResults: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        maxResults: number;
    }, {
        query: string;
        maxResults?: number | undefined;
    }>;
    execute(context: {
        query: string;
        maxResults: number;
    }): Promise<z.infer<typeof webSearchResultSchema>>;
}
export {};
//# sourceMappingURL=webSearch.d.ts.map