#!/usr/bin/env node
import { SocialAgent } from './mastra/agents/social.js';
async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Usage: npm start <profile-url> [top-k]');
        console.error('Example: npm start https://twitter.com/username 5');
        process.exit(1);
    }
    const profileUrl = args[0];
    const topK = args[1] ? parseInt(args[1], 10) : 5;
    if (isNaN(topK) || topK < 1) {
        console.error('top-k must be a positive number');
        process.exit(1);
    }
    try {
        console.log(`🔍 Analyzing profile: ${profileUrl}`);
        console.log(`📊 Looking for ${topK} similar people...\n`);
        const agent = new SocialAgent();
        const result = await agent.analyzeProfile(profileUrl, topK);
        // Print the result as formatted JSON
        console.log(JSON.stringify(result, null, 2));
    }
    catch (error) {
        console.error('❌ Error:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
// Run the main function
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map