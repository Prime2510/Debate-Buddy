// ========================================
// 🌐 API SERVICE (MOCK MODE)
// ========================================

import { CONFIG, validateConfig } from './config.js';

validateConfig();

// Main function to analyze argument
export async function analyzeArgument(topic, argument) {
    return getMockResponse(topic, argument);
}

// ========================================
// MOCK RESPONSE - Intelligent & Realistic
// ========================================
function getMockResponse(topic, argument) {
    return new Promise((resolve) => {
        // Simulate API delay for realism
        setTimeout(() => {
            // Generate contextual response based on argument length and complexity
            const wordCount = argument.split(' ').length;
            const hasExamples = argument.toLowerCase().includes('for example') || 
                               argument.toLowerCase().includes('such as');
            const hasStatistics = /\d+%|\d+ percent|statistics|study|research/.test(argument.toLowerCase());
            
            // Calculate scores based on argument quality
            const clarityScore = Math.min(95, 65 + (hasExamples ? 15 : 0) + (wordCount > 100 ? 10 : 0));
            const logicScore = Math.min(90, 60 + (hasStatistics ? 20 : 0) + (wordCount > 150 ? 10 : 0));
            const evidenceScore = hasStatistics ? Math.min(85, 70 + (wordCount > 100 ? 15 : 0)) : Math.min(70, 45 + (wordCount > 80 ? 10 : 0));
            const persuasivenessScore = Math.min(88, 65 + (hasExamples ? 12 : 0) + (hasStatistics ? 11 : 0));
            const overallScore = Math.round((clarityScore + logicScore + evidenceScore + persuasivenessScore) / 4);
            
            resolve({
                counterArgument: `Let me challenge your argument about "${topic}".\n\nFirst, while your point has merit, you've overlooked several critical considerations. The evidence you present, while interesting, doesn't necessarily support your conclusion as strongly as you suggest. There are alternative interpretations of the same data that lead to different conclusions. For instance, correlation doesn't always imply causation, and the factors you've identified may be influenced by other variables you haven't considered.\n\nSecond, your argument assumes certain conditions that may not hold universally. The real-world implementation of your proposal faces practical challenges you haven't addressed. Historical examples show that similar approaches have encountered significant obstacles, including unintended consequences and resistance from stakeholders. The complexity of the issue requires a more nuanced understanding of the trade-offs involved.\n\nFinally, there's a fundamental question about the values underlying your position. While you prioritize certain outcomes, others might reasonably prioritize different values, leading to different conclusions. Your argument would be stronger if it acknowledged these competing priorities and explained why your proposed approach represents the best balance among them.`,
                
                fallacies: generateFallacies(argument),
                
                strengtheningTips: [
                    "Add specific statistics, peer-reviewed studies, or expert opinions to back up your claims. Quantitative evidence from credible sources is harder to dispute and strengthens your credibility.",
                    "Address potential counter-arguments directly in your argument. Acknowledge the strongest points against your position and explain why your position still holds. This shows critical thinking and intellectual honesty.",
                    "Clarify your causal claims with more precision. Don't just assert that X causes Y—explain the mechanism or process by which X leads to Y. Include intermediate steps in your reasoning.",
                    "Replace vague or absolute language with more precise terms. Instead of 'many people' or 'always,' use specific data or qualified statements that are more defensible.",
                    "Consider and discuss the limitations of your argument. Acknowledging edge cases or situations where your position might not apply actually strengthens your overall credibility and shows mature thinking.",
                    "Provide concrete, real-world examples that illustrate your abstract points. Case studies and specific scenarios make your argument more relatable and convincing."
                ],
                
                scores: {
                    clarity: clarityScore,
                    logic: logicScore,
                    evidence: evidenceScore,
                    persuasiveness: persuasivenessScore
                },
                
                overallScore: overallScore
            });
        }, 1500); // 1.5 second delay for realism
    });
}

function generateFallacies(argument) {
    const fallacies = [];
    const lowerArg = argument.toLowerCase();
    
    // Detect common fallacies based on argument content
    if (lowerArg.includes('everyone') || lowerArg.includes('nobody') || lowerArg.includes('always') || lowerArg.includes('never')) {
        fallacies.push({
            type: "Hasty Generalization / Absolute Language",
            description: "You're using absolute terms like 'everyone,' 'always,' or 'never' that make sweeping claims without sufficient evidence.",
            impact: "This weakens your argument because readers can easily identify exceptions that contradict your universal claims. Qualified statements are more defensible."
        });
    }
    
    if (!(/\d+%|\d+ percent|study|research|according to|data|statistics/.test(lowerArg))) {
        fallacies.push({
            type: "Lack of Empirical Evidence",
            description: "Your argument relies primarily on assertions and reasoning without concrete data, statistics, or references to studies.",
            impact: "Without empirical backing, your claims are easier to dismiss as opinion rather than fact. Adding quantitative evidence would significantly strengthen your position."
        });
    }
    
    if (lowerArg.includes('obviously') || lowerArg.includes('clearly') || lowerArg.includes('certainly')) {
        fallacies.push({
            type: "Assertion Without Justification",
            description: "You use words like 'obviously' or 'clearly' to present claims as self-evident without actually proving them.",
            impact: "What's obvious to you may not be obvious to others. These terms can come across as dismissive of legitimate questions or alternative viewpoints."
        });
    }
    
    if (argument.split(' ').length < 100) {
        fallacies.push({
            type: "Underdeveloped Argument",
            description: "Your argument is relatively brief and doesn't fully explore the complexity of the issue or address potential objections.",
            impact: "More detailed arguments that anticipate counter-arguments and provide thorough reasoning are more persuasive and harder to refute."
        });
    }
    
    // If no specific fallacies detected, provide general feedback
    if (fallacies.length === 0) {
        fallacies.push({
            type: "Minor Logical Gaps",
            description: "While your overall reasoning is sound, there are some implicit assumptions that could be made more explicit.",
            impact: "Making your underlying assumptions clear helps readers follow your logic and makes your argument more transparent and trustworthy."
        });
    }
    
    return fallacies.slice(0, 3); // Return max 3 fallacies
}