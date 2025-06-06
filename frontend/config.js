// config.js

export const CONFIG = {
    // !!! IMPORTANT: Replace with YOUR actual Web App URL from Apps Script deployment !!!
    scriptURL: 'https://script.google.com/macros/s/AKfycbwxNgMhlUQkSJqeNAyRB-xrwjO25lH-qMJ3AasuEUJu4gR4cD8QS357BgCZVVadxHPL4Q/exec',
    
    selectors: {
        form: '#waiting-list-form',
        emailInput: '#email',
        emailError: '#email-error',
        successMessage: '#success-message',
        errorMessage: '#error-message',
        errorText: '#error-text',
        formMessages: '#form-messages',
        submitButton: '.submit-btn',
        buttonText: '.btn-text',
        buttonIcon: '.btn-icon',
        allFormInputs: '.form-input, .form-select',
        locationInput: '#location',
        propertiesGrid: '.properties-grid'
    },

    cssClasses: {
        hidden: 'hidden',
        loading: 'opacity-75',
        cursorNotAllowed: 'cursor-not-allowed',
        inputError: 'border-red-500',
        focusError: 'focus:border-red-500',
        ringError: 'focus:ring-red-500',
        inputDefault: 'border-gray-600',
        focusDefault: 'focus:border-blue-500',
        ringDefault: 'focus:ring-blue-500',
        btnSuccess: 'bg-green-600',
        btnHoverSuccess: 'hover:bg-green-700',
        btnGradientDefault: ['bg-gradient-to-r', 'from-blue-600', 'to-blue-700'],
    },

    messages: {
        submitting: 'Submitting...',
        success: 'Successfully Joined!',
        tryAgain: 'Try Again',
        defaultButton: 'Join the Waiting List',
        defaultError: 'Something went wrong with the submission. Please try again.',
        validationError: 'Please enter a valid email address',
    },

    icons: {
        submitting: '⏳',
        success: '🎉',
        tryAgain: '🔄',
        default: '🚀',
    },
    
    timeouts: {
        successReset: 3000,
    }
};