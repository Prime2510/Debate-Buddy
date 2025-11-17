// ========================================
// 🎯 DEBATE BUDDY - MAIN APP
// ========================================

import { analyzeArgument } from './api.js';

// DOM Elements
const topicInput = document.getElementById('topic');
const argumentInput = document.getElementById('argument');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const charCount = document.getElementById('charCount');

// Tab elements
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

// Content elements
const counterContent = document.getElementById('counterContent');
const fallaciesContent = document.getElementById('fallaciesContent');
const strengthenContent = document.getElementById('strengthenContent');
const scoreContent = document.getElementById('scoreContent');

// ========================================
// EVENT LISTENERS
// ========================================

// Character counter
argumentInput.addEventListener('input', () => {
    charCount.textContent = argumentInput.value.length;
});

// Analyze button
analyzeBtn.addEventListener('click', handleAnalyze);

// Try again button
tryAgainBtn.addEventListener('click', resetApp);

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        switchTab(tabName);
    });
});

// Enter key in topic field
topicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        argumentInput.focus();
    }
});

// ========================================
// MAIN FUNCTIONS
// ========================================

async function handleAnalyze() {
    const topic = topicInput.value.trim();
    const argument = argumentInput.value.trim();

    // Validation
    if (!topic) {
        alert('Please enter a debate topic!');
        topicInput.focus();
        return;
    }

    if (!argument) {
        alert('Please enter your argument!');
        argumentInput.focus();
        return;
    }

    if (argument.length < 50) {
        alert('Your argument is too short. Please write at least 50 characters for meaningful analysis.');
        argumentInput.focus();
        return;
    }

    // Show loading state
    analyzeBtn.disabled = true;
    loadingState.classList.remove('hidden');
    resultsSection.classList.add('hidden');

    try {
        // Call API
        const result = await analyzeArgument(topic, argument);
        
        // Display results
        displayResults(result);
        
        // Show results section
        loadingState.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong! Please try again.\n\n' + error.message);
        loadingState.classList.add('hidden');
    } finally {
        analyzeBtn.disabled = false;
    }
}

function displayResults(result) {
    // Counter-argument
    counterContent.innerHTML = `<p class="argument-text">${formatText(result.counterArgument)}</p>`;

    // Fallacies
    if (result.fallacies && result.fallacies.length > 0) {
        fallaciesContent.innerHTML = result.fallacies.map(fallacy => `
            <div class="fallacy-card">
                <h4 class="fallacy-title">${fallacy.type}</h4>
                <p class="fallacy-desc"><strong>Where:</strong> ${fallacy.description}</p>
                <p class="fallacy-impact"><strong>Impact:</strong> ${fallacy.impact}</p>
            </div>
        `).join('');
    } else {
        fallaciesContent.innerHTML = '<p class="no-fallacies">No major logical fallacies detected! Your reasoning is solid.</p>';
    }

    // Strengthening tips
    strengthenContent.innerHTML = `
        <ul class="tips-list">
            ${result.strengtheningTips.map(tip => `<li class="tip-item">${tip}</li>`).join('')}
        </ul>
    `;

    // Scores
    displayScores(result.scores, result.overallScore);
}

function displayScores(scores, overallScore) {
    const scoreCategories = [
        { key: 'clarity', label: 'Clarity', icon: '' },
        { key: 'logic', label: 'Logic', icon: '' },
        { key: 'evidence', label: 'Evidence', icon: '' },
        { key: 'persuasiveness', label: 'Persuasiveness', icon: '' }
    ];

    const scoreHTML = `
        <div class="overall-score">
            <div class="score-circle">
                <span class="score-number">${overallScore}</span>
                <span class="score-max">/100</span>
            </div>
            <p class="score-label">Overall Strength</p>
            <p class="score-message">${getScoreMessage(overallScore)}</p>
        </div>

        <div class="score-breakdown">
            ${scoreCategories.map(cat => `
                <div class="score-item">
                    <div class="score-header">
                        <span class="score-icon">${cat.icon}</span>
                        <span class="score-category">${cat.label}</span>
                        <span class="score-value">${scores[cat.key]}</span>
                    </div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${scores[cat.key]}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    scoreContent.innerHTML = scoreHTML;
}

function getScoreMessage(score) {
    if (score >= 90) return 'Excellent! Your argument is very strong.';
    if (score >= 80) return 'Great job! Minor improvements possible.';
    if (score >= 70) return 'Good argument with room for strengthening.';
    if (score >= 60) return 'Decent start, but needs more work.';
    return 'Keep practicing! Focus on the tips above.';
}

function switchTab(tabName) {
    // Update tab buttons
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update tab panels
    const panelMap = {
        'counter': 'counterTab',
        'fallacies': 'fallaciesTab',
        'strengthen': 'strengthenTab',
        'score': 'scoreTab'
    };

    tabPanels.forEach(panel => {
        if (panel.id === panelMap[tabName]) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

function resetApp() {
    topicInput.value = '';
    argumentInput.value = '';
    charCount.textContent = '0';
    resultsSection.classList.add('hidden');
    topicInput.focus();
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatText(text) {
    // Convert newlines to paragraphs
    return text.split('\n\n').map(para => 
        para.trim() ? `<p>${para.trim()}</p>` : ''
    ).join('');
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Debate Buddy initialized!');
    topicInput.focus();
});