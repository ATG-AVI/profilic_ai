import { Tool } from '@mastra/core';
import * as cheerio from 'cheerio';
import { z } from 'zod';
import fetch from 'node-fetch';
const fetchProfileSchema = z.object({
    url: z.string().url(),
});
const fetchProfileResultSchema = z.object({
    url: z.string(),
    title: z.string(),
    bio: z.string(),
    links: z.array(z.string()),
});
export class FetchProfileTool extends Tool {
    name = 'fetchProfile';
    description = 'Fetch and parse a social profile URL to extract basic information';
    schema = fetchProfileSchema;
    async execute(context) {
        const { url } = context;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
            }
            const html = await response.text();
            const $ = cheerio.load(html);
            // Extract title
            const title = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled';
            // Extract bio/description
            const bio = $('meta[name="description"]').attr('content') ||
                $('meta[property="og:description"]').attr('content') ||
                $('.bio, .description, .about, [class*="bio"], [class*="description"]').first().text().trim() ||
                '';
            // Extract links
            const links = [];
            $('a[href]').each((_, element) => {
                const href = $(element).attr('href');
                if (href && href.startsWith('http')) {
                    links.push(href);
                }
            });
            // Remove duplicates and limit to first 10
            const uniqueLinks = [...new Set(links)].slice(0, 10);
            return {
                url,
                title,
                bio,
                links: uniqueLinks,
            };
        }
        catch (error) {
            throw new Error(`Error fetching profile from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
//# sourceMappingURL=fetchProfile.js.map