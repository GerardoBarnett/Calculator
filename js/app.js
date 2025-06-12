/**
 * Main Application Entry Point
 * Initializes the calculator components and sets up the application
 */
import CalculatorModel from '../models/calculator.js';
import CalculatorView from '../views/calculatorView.js';
import CalculatorController from '../controllers/calculatorController.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize the calculator components
        const model = new CalculatorModel();
        const view = new CalculatorView();
        const controller = new CalculatorController(model, view);
        
        console.log('Calculator application initialized successfully');
        
        // Add theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                
                // Save theme preference
                const isDarkTheme = document.body.classList.contains('dark-theme');
                localStorage.setItem('calculator-dark-theme', isDarkTheme);
                
                // Update toggle button text
                themeToggle.textContent = isDarkTheme ? '☀️ Light' : '🌙 Dark';
            });
            
            // Apply saved theme preference
            const savedTheme = localStorage.getItem('calculator-dark-theme');
            if (savedTheme === 'true') {
                document.body.classList.add('dark-theme');
                themeToggle.textContent = '☀️ Light';
            }
        }
    } catch (error) {
        console.error('Error initializing calculator:', error);
        
        // Display error message to user
        const errorContainer = document.createElement('div');
        errorContainer.className = 'initialization-error';
        errorContainer.innerHTML = `
            <h2>Error Initializing Calculator</h2>
            <p>Sorry, something went wrong while loading the calculator.</p>
            <p>Please try refreshing the page.</p>
            <p class="error-details">Details: ${error.message}</p>
        `;
        document.body.appendChild(errorContainer);
    }
});