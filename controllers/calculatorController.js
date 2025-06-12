/**
 * Calculator Controller
 * Connects the model and view components and handles user interactions
 */
class CalculatorController {
    /**
     * Initialize the controller with model and view
     * @param {CalculatorModel} model - The calculator model
     * @param {CalculatorView} view - The calculator view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        // Initialize the view with event handlers
        this.view.bindEvents({
            digitHandler: this.handleDigit.bind(this),
            operationHandler: this.handleOperation.bind(this),
            equalsHandler: this.handleEquals.bind(this),
            clearHandler: this.handleClear.bind(this),
            decimalHandler: this.handleDecimal.bind(this),
            deleteHandler: this.handleDelete.bind(this),
            signHandler: this.handleSign.bind(this),
            percentageHandler: this.handlePercentage.bind(this),
            clearHistoryHandler: this.handleClearHistory.bind(this)
        });
        
        // Initialize the display
        this.view.updateDisplay(this.model.currentValue);
        this.view.updateHistory(this.model.getHistory());
    }

    /**
     * Handle digit button press
     * @param {string} digit - The digit that was pressed
     */
    handleDigit(digit) {
        try {
            const result = this.model.appendDigit(digit);
            this.view.updateDisplay(result);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle operation button press
     * @param {string} operation - The operation that was selected
     */
    handleOperation(operation) {
        try {
            const result = this.model.setOperation(operation);
            this.view.updateDisplay(result.currentValue);
            this.view.updateOperationDisplay(this.model.previousValue, this.model.operation);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle equals button press
     */
    handleEquals() {
        try {
            const result = this.model.calculate();
            this.view.updateDisplay(result);
            this.view.updateOperationDisplay(null, null);
            this.view.updateHistory(this.model.getHistory());
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle clear button press
     */
    handleClear() {
        const result = this.model.clear();
        this.view.updateDisplay(result);
        this.view.updateOperationDisplay(null, null);
        this.view.hideError();
    }

    /**
     * Handle decimal button press
     */
    handleDecimal() {
        try {
            const result = this.model.appendDecimal();
            this.view.updateDisplay(result);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle delete button press
     */
    handleDelete() {
        try {
            const result = this.model.deleteDigit();
            this.view.updateDisplay(result);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle sign change button press
     */
    handleSign() {
        try {
            const result = this.model.changeSign();
            this.view.updateDisplay(result);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle percentage button press
     */
    handlePercentage() {
        try {
            const result = this.model.percentage();
            this.view.updateDisplay(result);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    /**
     * Handle clear history button press
     */
    handleClearHistory() {
        this.model.clearHistory();
        this.view.updateHistory([]);
    }
}

export default CalculatorController;