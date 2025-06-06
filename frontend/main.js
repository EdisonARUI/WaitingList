// main.js
import { CONFIG } from './config.js';
import { UI } from './ui.js';
import { propertiesData } from './data.js';

/**
 * Renders property cards into the grid from the data source.
 */
function renderPropertyCards() {
    console.log('[Main] Attempting to render property cards...'); // 诊断日志
    const { propertiesGrid } = UI.elements;

    // This check is crucial. We'll log the element directly before the check.
    console.log('[Main] Value of UI.elements.propertiesGrid:', propertiesGrid);
    
    if (!propertiesGrid) {
        console.error('[Main] CRITICAL: Cannot render cards because propertiesGrid is null or undefined.');
        return;
    }

    propertiesGrid.innerHTML = '';
    propertiesData.forEach(property => {
        const cardHTML = `
            <div class="property-card bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
                <div class="property-image bg-gradient-to-br ${property.gradient} h-48 flex items-center justify-center">
                    <span class="text-4xl">${property.icon}</span>
                </div>
                <div class="property-content p-4">
                    <h3 class="property-location text-lg font-semibold text-gray-900 mb-2">
                        ${property.location}
                    </h3>
                    <p class="property-description text-gray-600 text-sm mb-3">
                        ${property.description}
                    </p>
                    <div class="property-price text-blue-600 font-semibold text-sm">
                        Starting from 25% ownership
                    </div>
                </div>
            </div>
        `;
        propertiesGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
    console.log(`[Main] Successfully rendered ${propertiesData.length} property cards.`); // 诊断日志
}

/**
 * Sets up all event listeners for the application.
 */
function setupEventListeners() {
    console.log('[Main] Setting up event listeners...'); // 诊断日志

    const scrollButton = document.querySelector('.cta-scroll-down');
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            document.querySelector('.how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (UI.elements.form) {
        UI.elements.form.addEventListener('submit', handleFormSubmit);
    }

    if (UI.elements.emailInput) {
        UI.elements.emailInput.addEventListener('input', () => {
            if (validateEmail(UI.elements.emailInput.value)) {
                UI.showEmailError(false);
            }
        });
    }
}

// Form submission and validation logic (remains the same)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const email = UI.elements.emailInput.value;
    if (!validateEmail(email)) {
        UI.showEmailError(true);
        UI.elements.emailInput.focus();
        return;
    }
    UI.showEmailError(false);
    UI.setLoadingState(true);
    // ... rest of the function is the same
}


/**
 * Main function to start the application.
 */
function main() {
    console.log('[Main] DOMContentLoaded event fired. Starting application.'); // 诊断日志
    UI.init();
    renderPropertyCards();
    setupEventListeners();
}

// Entry point of the application
document.addEventListener('DOMContentLoaded', main);