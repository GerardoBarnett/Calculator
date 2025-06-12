/**
 * Calculator View
 * Handles the UI rendering and display updates
 */
class CalculatorView {
    constructor() {
        this.display = document.getElementById('display');
        this.operationDisplay = document.getElementById('operation-display');
        this.historyList = document.getElementById('history-list');
        this.errorMessage = document.getElementById('error-message');
    }

    /**
     * Update the main display with the current value
     * @param {string} value - The value to display
     */
    updateDisplay(value) {
        this.display.textContent = value;
    }

    /**
     * Update the operation display
     * @param {string} value - The previous value
     * @param {string} operation - The current operation
     */
    updateOperationDisplay(value, operation) {
        if (value && operation) {
            this.operationDisplay.textContent = `${value} ${operation}`;
        } else {
            this.operationDisplay.textContent = '';
        }
    }

    /**
     * Show error message
     * @param {string} message - The error message to display
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        
        // Hide the error message after 3 seconds
        setTimeout(() => {
            this.hideError();
        }, 3000);
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    /**
     * Add visual feedback when a button is pressed
     * @param {HTMLElement} button - The button element
     */
    addButtonAnimation(button) {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 100);
    }

    /**
     * Update the calculation history display
     * @param {Array} history - Array of calculation history items
     */
    updateHistory(history) {
        this.historyList.innerHTML = '';
        
        if (history.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = 'No calculations yet';
            emptyItem.classList.add('history-empty');
            this.historyList.appendChild(emptyItem);
            return;
        }
        
        // Display the last 5 calculations (most recent first)
        const recentHistory = history.slice(-5).reverse();
        
        recentHistory.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span class="history-expression">${item.expression}</span> = <span class="history-result">${item.result}</span>`;
            this.historyList.appendChild(listItem);
        });
    }

    /**
     * Set up event listeners for calculator buttons
     * @param {Object} handlers - Object containing event handler functions
     */
    bindEvents(handlers) {
        // Digit buttons (0-9)
        document.querySelectorAll('.digit').forEach(button => {
            button.addEventListener('click', () => {
                this.addButtonAnimation(button);
                handlers.digitHandler(button.textContent);
            });
        });

        // Operation buttons (+, -, *, /)
        document.querySelectorAll('.operation').forEach(button => {
            button.addEventListener('click', () => {
                this.addButtonAnimation(button);
                handlers.operationHandler(button.dataset.operation);
            });
        });

        // Equals button
        document.getElementById('equals').addEventListener('click', () => {
            this.addButtonAnimation(document.getElementById('equals'));
            handlers.equalsHandler();
        });

        // Clear button
        document.getElementById('clear').addEventListener('click', () => {
            this.addButtonAnimation(document.getElementById('clear'));
            handlers.clearHandler();
        });

        // Decimal button
        document.getElementById('decimal').addEventListener('click', () => {
            this.addButtonAnimation(document.getElementById('decimal'));
            handlers.decimalHandler();
        });

        // Delete button
        document.getElementById('delete').addEventListener('click', () => {
            this.addButtonAnimation(document.getElementById('delete'));
            handlers.deleteHandler();
        });

        // Sign button (+/-)
        document.getElementById('sign').addEventListener('click', () => {
            this.addButtonAnimation(document.getElementById('sign'));
            handlers.signHandler();
        });

        // Percentage button
        document.getElementById('percentage').addEventListener('click', () => {
            this.addButtonAnimation(document.getElementById('percentage'));
            handlers.percentageHandler();
        });

        // History toggle button
        document.getElementById('history-toggle').addEventListener('click', () => {
            document.getElementById('history-panel').classList.toggle('show');
        });

        // Clear history button
        document.getElementById('clear-history').addEventListener('click', () => {
            handlers.clearHistoryHandler();
        });

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            // Prevent default behavior for calculator keys to avoid page scrolling
            if (['+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Delete', 'Escape'].includes(event.key) ||
                (event.key >= '0' && event.key <= '9') || 
                event.key === '.') {
                event.preventDefault();
            }

            // Map keyboard keys to calculator functions
            if (event.key >= '0' && event.key <= '9') {
                handlers.digitHandler(event.key);
                this.highlightButton(event.key);
            } else if (event.key === '.') {
                handlers.decimalHandler();
                this.highlightButton('decimal');
            } else if (['+', '-', '*', '/'].includes(event.key)) {
                handlers.operationHandler(event.key);
                this.highlightButton(event.key, 'operation');
            } else if (event.key === '=' || event.key === 'Enter') {
                handlers.equalsHandler();
                this.highlightButton('equals');
            } else if (event.key === 'Backspace' || event.key === 'Delete') {
                handlers.deleteHandler();
                this.highlightButton('delete');
            } else if (event.key === 'Escape') {
                handlers.clearHandler();
                this.highlightButton('clear');
            } else if (event.key === '%') {
                handlers.percentageHandler();
                this.highlightButton('percentage');
            }
        });
    }

    /**
     * Highlight a button when its corresponding key is pressed
     * @param {string} key - The key that was pressed
     * @param {string} type - The type of button (optional)
     */
    highlightButton(key, type = '') {
        let selector;
        
        if (type === 'operation') {
            selector = `.operation[data-operation="${key}"]`;
        } else if (key >= '0' && key <= '9') {
            selector = `.digit[data-digit="${key}"]`;
        } else {
            selector = `#${key}`;
        }
        
        const button = document.querySelector(selector);
        if (button) {
            this.addButtonAnimation(button);
        }
    }
}

export default CalculatorView;