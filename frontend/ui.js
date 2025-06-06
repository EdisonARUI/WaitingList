// ui.js
import { CONFIG } from './config.js';

const { selectors, cssClasses, messages, icons } = CONFIG;

// The elements object will hold our DOM nodes.
// It is populated by the init function.
const elements = {};

/**
 * Initializes the UI module by selecting all necessary DOM elements.
 */
function init() {
    console.log('[UI] Initializing...'); // 诊断日志
    
    // Populate the elements object
    elements.form = document.querySelector(selectors.form);
    elements.emailInput = document.querySelector(selectors.emailInput);
    elements.emailError = document.querySelector(selectors.emailError);
    elements.successMessage = document.querySelector(selectors.successMessage);
    elements.errorMessage = document.querySelector(selectors.errorMessage);
    elements.errorText = document.querySelector(selectors.errorText);
    elements.formMessages = document.querySelector(selectors.formMessages);
    elements.submitButton = document.querySelector(selectors.submitButton);
    elements.buttonText = document.querySelector(selectors.buttonText);
    elements.buttonIcon = document.querySelector(selectors.buttonIcon);
    elements.allFormInputs = document.querySelectorAll(selectors.allFormInputs);
    elements.locationInput = document.querySelector(selectors.locationInput);
    elements.propertiesGrid = document.querySelector(selectors.propertiesGrid);

    // 诊断日志：验证关键元素是否找到
    if (elements.propertiesGrid) {
        console.log('[UI] "propertiesGrid" element found successfully.');
    } else {
        console.error('[UI] CRITICAL: "propertiesGrid" element NOT FOUND. Check selector in config.js and class name in index.html.');
    }
}

/**
 * Manages the loading state of the submit button.
 * @param {boolean} isLoading - True to show loading state, false to hide.
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        elements.submitButton.disabled = true;
        elements.buttonText.textContent = messages.submitting;
        elements.buttonIcon.textContent = icons.submitting;
        elements.submitButton.classList.add(cssClasses.loading, cssClasses.cursorNotAllowed);
    } else {
        elements.submitButton.disabled = false;
        elements.submitButton.classList.remove(cssClasses.loading, cssClasses.cursorNotAllowed);
    }
}

/**
 * Displays feedback messages after form submission.
 * @param {object} options
 * @param {boolean} options.isSuccess - Whether the submission was successful.
 * @param {string} [options.message] - Optional custom error message.
 */
function displayFeedback({ isSuccess, message = messages.defaultError }) {
    elements.formMessages.classList.add(cssClasses.hidden);
    elements.successMessage.classList.add(cssClasses.hidden);
    elements.errorMessage.classList.add(cssClasses.hidden);

    if (isSuccess) {
        elements.formMessages.classList.remove(cssClasses.hidden);
        elements.successMessage.classList.remove(cssClasses.hidden);
        if (elements.form) elements.form.reset();
        const newsletterCheckbox = document.getElementById('newsletter');
        if(newsletterCheckbox) {
            newsletterCheckbox.checked = true;
        }
        
        elements.buttonText.textContent = messages.success;
        elements.buttonIcon.textContent = icons.success;
        elements.submitButton.classList.add(cssClasses.btnSuccess, cssClasses.btnHoverSuccess);
        elements.submitButton.classList.remove(...cssClasses.btnGradientDefault);
    } else {
        elements.formMessages.classList.remove(cssClasses.hidden);
        elements.errorMessage.classList.remove(cssClasses.hidden);
        elements.errorText.textContent = message;
        elements.buttonText.textContent = messages.tryAgain;
        elements.buttonIcon.textContent = icons.tryAgain;
    }
}

/**
 * Resets the submit button to its default visual state.
 */
function resetButtonToDefault() {
    elements.buttonText.textContent = messages.defaultButton;
    elements.buttonIcon.textContent = icons.default;
    elements.submitButton.classList.remove(cssClasses.btnSuccess, cssClasses.btnHoverSuccess);
    elements.submitButton.classList.add(...cssClasses.btnGradientDefault);
}

/**
 * Shows or hides the email validation error message and styles.
 * @param {boolean} show - True to show the error, false to hide it.
 */
function showEmailError(show) {
    if (!elements.emailInput || !elements.emailError) return;
    if (show) {
        elements.emailError.textContent = messages.validationError;
        elements.emailError.classList.remove(cssClasses.hidden);
        elements.emailInput.classList.add(cssClasses.inputError, cssClasses.focusError, cssClasses.ringError);
        elements.emailInput.classList.remove(cssClasses.inputDefault, cssClasses.focusDefault, cssClasses.ringDefault);
    } else {
        elements.emailError.classList.add(cssClasses.hidden);
        elements.emailInput.classList.remove(cssClasses.inputError, cssClasses.focusError, cssClasses.ringError);
        elements.emailInput.classList.add(cssClasses.inputDefault, cssClasses.focusDefault, cssClasses.ringDefault);
    }
}

export const UI = {
    init,
    elements,
    setLoadingState,
    displayFeedback,
    resetButtonToDefault,
    showEmailError,
};