import { Tool } from '@mastra/core';
import { z } from 'zod';
declare const fetchProfileSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
declare const fetchProfileResultSchema: z.ZodObject<{
    url: z.ZodString;
    title: z.ZodString;
    bio: z.ZodString;
    links: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    url: string;
    title: string;
    bio: string;
    links: string[];
}, {
    url: string;
    title: string;
    bio: string;
    links: string[];
}>;
export declare class FetchProfileTool extends Tool<typeof fetchProfileSchema, typeof fetchProfileResultSchema> {
    name: string;
    description: string;
    schema: z.ZodObject<{
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
    }, {
        url: string;
    }>;
    execute(context: {
        url: string;
    }): Promise<z.infer<typeof fetchProfileResultSchema>>;
}
export {};
//# sourceMappingURL=fetchProfile.d.ts.map