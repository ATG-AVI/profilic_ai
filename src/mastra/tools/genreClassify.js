import { Tool } from '@mastra/core';
import { z } from 'zod';
const genreClassifySchema = z.object({
    text: z.string(),
});
const genreClassifyResultSchema = z.object({
    genre: z.string(),
    confidence: z.number(),
    keywords: z.array(z.string()),
});
// Simple keyword-based genre classification
const genreKeywords = {
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
export class GenreClassifyTool extends Tool {
    name = 'genreClassify';
    description = 'Classify text content into predefined genres using keyword matching';
    schema = genreClassifySchema;
    async execute(context) {
        const { text } = context;
        const lowerText = text.toLowerCase();
        const scores = {};
        // Initialize scores
        Object.keys(genreKeywords).forEach(genre => {
            scores[genre] = { score: 0, keywords: [] };
        });
        // Calculate scores for each genre
        Object.entries(genreKeywords).forEach(([genre, keywords]) => {
            const matchedKeywords = [];
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
        let bestKeywords = [];
        Object.entries(scores).forEach(([genre, { score, keywords }]) => {
            if (score > bestScore) {
                bestScore = score;
                bestGenre = genre;
                bestKeywords = keywords;
            }
        });
        // Calculate confidence (normalize by text length and keyword count)
        const confidence = bestScore > 0
            ? Math.min(0.9, bestScore / Math.max(1, text.split(' ').length * 0.1))
            : 0.1;
        return {
            genre: bestGenre,
            confidence,
            keywords: bestKeywords,
        };
    }
}
//# sourceMappingURL=genreClassify.js.map