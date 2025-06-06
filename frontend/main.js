// main.js
import { CONFIG } from './config.js';
import { UI } from './ui.js';
import { propertiesData } from './data.js';

/**
 * Renders property cards into the grid from the data source.
 */
function renderPropertyCards() {
    console.log('[Main] Attempting to render property cards...');
    const { propertiesGrid } = UI.elements;

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
    console.log(`[Main] Successfully rendered ${propertiesData.length} property cards.`);
}

/**
 * Sets up all event listeners for the application.
 */
function setupEventListeners() {
    console.log('[Main] Setting up event listeners...');

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

/**
 * Validates an email address format.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid.
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handles the form submission to the Google Apps Script endpoint.
 * @param {Event} event - The form submission event.
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    const { form, emailInput } = UI.elements;

    const email = emailInput.value;
    if (!validateEmail(email)) {
        UI.showEmailError(true);
        emailInput.focus();
        return;
    }

    UI.showEmailError(false);
    UI.setLoadingState(true);

    const formData = new FormData(form);
    const params = new URLSearchParams(formData);
    params.set('newsletter', formData.has('newsletter'));
    
    try {
        const response = await fetch(CONFIG.scriptURL, {
            method: 'POST',
            body: params,
        });

        // Assuming the CORS issue is fixed on the server, we can now process the response.
        // Note: A failed fetch due to CORS will still throw an error and go to the catch block.
        const result = await response.json();

        // Use the 'result' property from the recommended Apps Script function, but keep 'status' for backward compatibility.
        if (result.result === 'success' || result.status === 'ok') {
            UI.displayFeedback({ isSuccess: true });
            
            // After showing success, wait for a period, then reset the form UI.
            setTimeout(() => {
                UI.resetButtonToDefault();
                UI.elements.formMessages.classList.add(CONFIG.cssClasses.hidden);
            }, CONFIG.timeouts.successReset);
        } else {
            // Handle errors returned by the script (e.g., validation failed on the server).
            UI.displayFeedback({ isSuccess: false, message: result.message || CONFIG.messages.defaultError });
        }
    } catch (error) {
        // Handle network errors or issues with the fetch call itself (like CORS).
        console.error('Submission Error:', error);
        UI.displayFeedback({ isSuccess: false, message: CONFIG.messages.defaultError });
    } finally {
        // Always reset the loading state of the button. The feedback functions handle the text/color.
        UI.setLoadingState(false);
    }
}


/**
 * Main function to start the application.
 */
function main() {
    console.log('[Main] DOMContentLoaded event fired. Starting application.');
    UI.init();
    renderPropertyCards();
    setupEventListeners();
}

// Entry point of the application
document.addEventListener('DOMContentLoaded', main);