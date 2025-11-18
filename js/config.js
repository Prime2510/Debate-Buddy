// ========================================
// 🔑 CONFIGURATION FILE
// ========================================

export const CONFIG = {
    // Using MOCK mode - perfect for demos!
    apiProvider: 'mock',
    
    // App Settings
    settings: {
        minArgumentLength: 50 // Minimum characters for argument
    }
};

// Validation
export function validateConfig() {
    console.log(`🤖 Using API Provider: ${CONFIG.apiProvider}`);
    console.log('✅ Mock mode enabled - perfect for demos!');
}