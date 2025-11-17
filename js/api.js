// ========================================
// 🌐 API SERVICE
// ========================================
// Handles all API calls to AI services

import { CONFIG, validateConfig } from './config.js';

validateConfig();

// Main function to analyze argument
export async function analyzeArgument(topic, argument) {
    switch (CONFIG.apiProvider) {
        case 'proxy':
            return await callProxyAPI(topic, argument);
        case 'mock':
        default:
            return getMockResponse(topic, argument);
    }
}

// ========================================
// PROXY SERVER API
// ========================================
async function callProxyAPI(topic, argument) {
    try {
        const response = await fetch(CONFIG.proxy.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic,
                argument
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Proxy API Error:', error);
        throw new Error('Failed to analyze argument. Make sure the server is running on http://localhost:3000');
    }
}



// ========================================
// MOCK RESPONSE (for testing without API)
// ========================================
function getMockResponse(topic, argument) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                counterArgument: `Let me challenge your argument about "${topic}".\n\nFirst, while your point has merit, you've overlooked several critical considerations. The evidence you present, while interesting, doesn't necessarily support your conclusion as strongly as you suggest. There are alternative interpretations of the same data that lead to different conclusions.\n\nSecond, your argument assumes certain conditions that may not hold in real-world scenarios. For example, you haven't addressed the practical implementation challenges or the unintended consequences that might arise. Historical examples show that similar proposals have faced significant obstacles that your argument doesn't account for.\n\nFinally, there's a fundamental logical issue with your reasoning. You're drawing a causal connection that might be merely correlational. The relationship between your premise and conclusion needs more rigorous support to be truly convincing.`,
                
                fallacies: [
                    {
                        type: "Hasty Generalization",
                        description: "You're making broad claims based on limited examples or evidence.",
                        impact: "This weakens your argument because readers can easily find counter-examples that contradict your general claim."
                    },
                    {
                        type: "Appeal to Emotion",
                        description: "Some parts of your argument rely on emotional language rather than logical reasoning.",
                        impact: "While emotions can be persuasive, they don't constitute logical proof. Critical readers will notice this gap."
                    },
                    {
                        type: "False Dichotomy",
                        description: "You're presenting the issue as having only two options when there may be other alternatives.",
                        impact: "This oversimplification makes your argument vulnerable to criticism about nuance and complexity."
                    }
                ],
                
                strengtheningTips: [
                    "Add specific statistics, studies, or expert opinions to back up your claims. Quantitative evidence is harder to dispute.",
                    "Address potential counter-arguments directly in your essay. This shows critical thinking and makes your position stronger.",
                    "Clarify your causal claims. Explain the mechanism by which X leads to Y, don't just assert that it does.",
                    "Use more precise language. Replace vague terms like 'many people' or 'often' with specific data.",
                    "Consider edge cases and limitations of your argument. Acknowledging these actually strengthens your credibility."
                ],
                
                scores: {
                    clarity: 78,
                    logic: 65,
                    evidence: 58,
                    persuasiveness: 72
                },
                
                overallScore: 68
            });
        }, 2000); // Simulate API delay
    });
}