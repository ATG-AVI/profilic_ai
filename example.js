#!/usr/bin/env node

import { SocialAgent } from './src/mastra/agents/social.js';

async function runExample() {
  console.log('🚀 Social Agent Example\n');
  
  const agent = new SocialAgent();
  
  // Example 1: Analyze a tech company profile
  console.log('📊 Example 1: Analyzing GitHub profile...');
  const result1 = await agent.analyzeProfile('https://github.com', 3);
  console.log(JSON.stringify(result1, null, 2));
  console.log('\n' + '='.repeat(80) + '\n');
  
  // Example 2: Analyze another tech profile
  console.log('📊 Example 2: Analyzing Stack Overflow profile...');
  const result2 = await agent.analyzeProfile('https://stackoverflow.com', 3);
  console.log(JSON.stringify(result2, null, 2));
  console.log('\n' + '='.repeat(80) + '\n');
  
  // Example 3: Show how similar people are found
  console.log('📊 Example 3: Analyzing a third profile to see similarity...');
  const result3 = await agent.analyzeProfile('https://example.com', 5);
  console.log(JSON.stringify(result3, null, 2));
  
  console.log('\n✅ Example completed!');
}

runExample().catch(console.error);
