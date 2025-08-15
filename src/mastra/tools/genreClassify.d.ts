import { Tool } from '@mastra/core';
import { z } from 'zod';
declare const genreClassifySchema: z.ZodObject<{
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
}, {
    text: string;
}>;
declare const genreClassifyResultSchema: z.ZodObject<{
    genre: z.ZodString;
    confidence: z.ZodNumber;
    keywords: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    genre: string;
    keywords: string[];
    confidence: number;
}, {
    genre: string;
    keywords: string[];
    confidence: number;
}>;
export declare class GenreClassifyTool extends Tool<typeof genreClassifySchema, typeof genreClassifyResultSchema> {
    name: string;
    description: string;
    schema: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
    execute(context: {
        text: string;
    }): Promise<z.infer<typeof genreClassifyResultSchema>>;
}
export {};
//# sourceMappingURL=genreClassify.d.ts.map