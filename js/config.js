// ========================================
// CONFIGURATION FILE
// ========================================

export const CONFIG = {
    // API provider: 'proxy' (uses local server) or 'mock' (for testing)
    apiProvider: 'proxy',
    
    // Proxy Server Configuration
    proxy: {
        endpoint: 'http://localhost:3000/api/analyze'
    },
    
    // App Settings
    settings: {
        maxTokens: 2000,
        temperature: 0.7,
        minArgumentLength: 50 // Minimum characters for argument
    }
};

// Validation
export function validateConfig() {
    if (CONFIG.apiProvider === 'proxy') {
        console.log('Using proxy server for API calls');
    } else if (CONFIG.apiProvider === 'mock') {
        console.log('Using mock mode for testing');
    }
}