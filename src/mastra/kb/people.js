import { z } from 'zod';
export class PeopleKB {
    people = [];
    /**
     * Simple token-overlap similarity calculation
     */
    calculateSimilarity(text1, text2) {
        const tokens1 = new Set(text1.toLowerCase().split(/\s+/).filter(token => token.length > 2));
        const tokens2 = new Set(text2.toLowerCase().split(/\s+/).filter(token => token.length > 2));
        if (tokens1.size === 0 || tokens2.size === 0) {
            return 0;
        }
        const intersection = new Set([...tokens1].filter(token => tokens2.has(token)));
        const union = new Set([...tokens1, ...tokens2]);
        return intersection.size / union.size;
    }
    /**
     * Store a person in the knowledge base
     */
    async embed(docs) {
        for (const person of docs) {
            // Check if person already exists (by URL)
            const existingIndex = this.people.findIndex(p => p.url === person.url);
            if (existingIndex >= 0) {
                // Update existing person
                this.people[existingIndex] = {
                    ...person,
                    timestamp: new Date(),
                };
            }
            else {
                // Add new person
                this.people.push({
                    ...person,
                    timestamp: new Date(),
                });
            }
        }
    }
    /**
     * Query the knowledge base for similar people
     */
    async query({ query, topK = 5 }) {
        if (this.people.length === 0) {
            return [];
        }
        const results = [];
        for (const person of this.people) {
            // Calculate similarity based on multiple fields
            const titleSimilarity = this.calculateSimilarity(query, person.title);
            const bioSimilarity = this.calculateSimilarity(query, person.bio);
            const genreSimilarity = this.calculateSimilarity(query, person.genre);
            // Weight the similarities (title and bio are more important)
            const weightedSimilarity = (titleSimilarity * 0.4 +
                bioSimilarity * 0.4 +
                genreSimilarity * 0.2);
            if (weightedSimilarity > 0) {
                results.push({
                    person,
                    similarity: weightedSimilarity,
                });
            }
        }
        // Sort by similarity (descending) and return top K results
        return results
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK);
    }
    /**
     * Get all people in the knowledge base
     */
    getAll() {
        return [...this.people];
    }
    /**
     * Get person by URL
     */
    getByUrl(url) {
        return this.people.find(p => p.url === url);
    }
    /**
     * Get people by genre
     */
    getByGenre(genre) {
        return this.people.filter(p => p.genre.toLowerCase() === genre.toLowerCase());
    }
    /**
     * Clear all data
     */
    clear() {
        this.people = [];
    }
    /**
     * Get statistics about the knowledge base
     */
    getStats() {
        const genres = {};
        for (const person of this.people) {
            genres[person.genre] = (genres[person.genre] || 0) + 1;
        }
        return {
            total: this.people.length,
            genres,
        };
    }
}
//# sourceMappingURL=people.js.map