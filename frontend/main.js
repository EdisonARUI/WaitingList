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
 * Handles the form submission. It sends the data and assumes success
 * without waiting for a response from the server.
 * @param {Event} event - The form submission event.
 */
function handleFormSubmit(event) {
    event.preventDefault();
    const { form, emailInput } = UI.elements;

    const email = emailInput.value;
    if (!validateEmail(email)) {
        UI.showEmailError(true);
        emailInput.focus();
        return;
    }

    UI.showEmailError(false);
    UI.setLoadingState(true); // 禁用按钮并显示加载状态

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.newsletter = formData.has('newsletter');

    // ======================= HIGHLIGHT START: MODIFICATION =======================

    // “即发即忘”请求。我们发送数据，但不等待响应。
    // 我们为 fetch promise 添加一个 .catch() 以静默记录任何网络错误，
    // 但 UI 将按照请求假定操作成功。
    fetch(CONFIG.scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).catch(error => {
        // 根据指示，我们不向用户显示错误。
        // 我们只为了调试目的在控制台记录它。
        console.error('Background submission error:', error);
    });

    // 立即在 UI 中显示成功反馈。
    // 按钮将显示成功状态，但保持禁用状态。
    UI.displayFeedback({ isSuccess: true });

    // 延迟后，将表单和按钮重置为默认状态。
    setTimeout(() => {
        UI.resetButtonToDefault(); // 重置按钮文本和样式
        UI.setLoadingState(false); // 重新启用按钮
        if (UI.elements.formMessages) {
             UI.elements.formMessages.classList.add(CONFIG.cssClasses.hidden); // 隐藏成功消息
        }
    }, CONFIG.timeouts.successReset);
    
    // ======================== HIGHLIGHT END: MODIFICATION ========================
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