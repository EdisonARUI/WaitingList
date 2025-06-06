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

    // Create FormData to capture all fields from the form.
    const formData = new FormData(form);
    
    // As per the app.html example, encode the form data as URLSearchParams.
    // This is the correct format for a simple Google Apps Script POST request.
    const params = new URLSearchParams(formData);

    try {
        const response = await fetch(CONFIG.scriptURL, {
            method: 'POST',
            body: params, // Send the URL-encoded data
        });

        const result = await response.json();

        if (result.status === 'ok') {
            UI.showSuccessMessage(true);
            form.reset(); // Clear the form on successful submission
        } else {
            // Handle potential errors returned from the script.
            UI.showErrorMessage(true, result.message || CONFIG.messages.defaultError);
        }
    } catch (error) {
        // Handle network errors or issues with the fetch call itself.
        console.error('Submission Error:', error);
        UI.showErrorMessage(true, CONFIG.messages.defaultError);
    } finally {
        // Always reset the loading state of the button.
        UI.setLoadingState(false, true); // `true` indicates a final state (success or error)
        
        // Hide the success message after a delay so the user can see it.
        setTimeout(() => {
            UI.showSuccessMessage(false);
        }, CONFIG.timeouts.successReset);
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