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

    // ======================= HIGHLIGHT START: MODIFICATION =======================

    // 1. 将 FormData 转换为一个普通的 JavaScript 对象
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // 2. 手动处理复选框（checkbox），确保其值为布尔类型
    // 因为未勾选的复选框不会出现在 FormData 中
    data.newsletter = formData.has('newsletter');

    try {
        const response = await fetch(CONFIG.scriptURL, {
            method: 'POST',
            headers: {
                // 3. 将 Content-Type 修改为 'application/json'
                'Content-Type': 'application/json',
            },
            // 4. 将 JavaScript 对象转换为 JSON 字符串作为请求体
            body: JSON.stringify(data),
        });

    // ======================== HIGHLIGHT END: MODIFICATION ========================

        // 假设服务器端的 CORS 问题已经解决，我们可以处理响应了
        const result = await response.json();

        // 优化了成功判断的逻辑，使其与我们推荐的 App Script 脚本返回的 { status: 'success' } 格式完全匹配
        if (result.status === 'success') {
            UI.displayFeedback({ isSuccess: true });
            
            setTimeout(() => {
                UI.resetButtonToDefault();
                UI.elements.formMessages.classList.add(CONFIG.cssClasses.hidden);
            }, CONFIG.timeouts.successReset);
        } else {
            // 处理脚本返回的错误（例如，服务器端验证失败）
            UI.displayFeedback({ isSuccess: false, message: result.message || CONFIG.messages.defaultError });
        }
    } catch (error) {
        // 处理网络错误或 fetch 调用本身的问题（例如，CORS仍然失败）
        console.error('Submission Error:', error);
        UI.displayFeedback({ isSuccess: false, message: CONFIG.messages.defaultError });
    } finally {
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