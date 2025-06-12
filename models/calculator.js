/**
 * Calculator Model
 * Handles the core calculation logic and state management
 */
class CalculatorModel {
    constructor() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.resetInput = false;
        this.history = [];
    }

    /**
     * Append a digit to the current input
     * @param {string} digit - The digit to append
     */
    appendDigit(digit) {
        if (this.currentValue === '0' || this.resetInput) {
            this.currentValue = digit;
            this.resetInput = false;
        } else {
            this.currentValue += digit;
        }
        return this.currentValue;
    }

    /**
     * Add decimal point to the current input
     */
    appendDecimal() {
        if (this.resetInput) {
            this.currentValue = '0.';
            this.resetInput = false;
        } else if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        return this.currentValue;
    }

    /**
     * Set the operation to perform
     * @param {string} operation - The operation to perform
     */
    setOperation(operation) {
        if (this.previousValue !== null) {
            this.calculate();
        }
        
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.resetInput = true;
        
        return {
            currentValue: this.currentValue,
            operation: this.operation
        };
    }

    /**
     * Perform the calculation based on the current operation
     */
    calculate() {
        if (this.previousValue === null || this.operation === null) {
            return this.currentValue;
        }

        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        try {
            switch (this.operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        throw new Error('Division by zero');
                    }
                    result = prev / current;
                    break;
                default:
                    return this.currentValue;
            }

            // Add to history
            this.history.push({
                expression: `${this.previousValue} ${this.operation} ${this.currentValue}`,
                result: result.toString()
            });

            // Format the result to avoid excessive decimal places
            result = this.formatResult(result);
            
            this.currentValue = result;
            this.operation = null;
            this.previousValue = null;
            this.resetInput = true;
            
            return result;
        } catch (error) {
            this.clear();
            return error.message;
        }
    }

    /**
     * Format the result to avoid excessive decimal places
     * @param {number} number - The number to format
     */
    formatResult(number) {
        // Convert to string and check if it has a decimal part
        const stringNum = number.toString();
        if (stringNum.includes('.')) {
            // If decimal part is too long, limit to 8 decimal places
            const parts = stringNum.split('.');
            if (parts[1].length > 8) {
                return number.toFixed(8).replace(/\.?0+$/, '');
            }
        }
        return stringNum;
    }

    /**
     * Clear the calculator state
     */
    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.resetInput = false;
        return this.currentValue;
    }

    /**
     * Delete the last digit from the current input
     */
    deleteDigit() {
        if (this.currentValue.length === 1) {
            this.currentValue = '0';
        } else {
            this.currentValue = this.currentValue.slice(0, -1);
        }
        return this.currentValue;
    }

    /**
     * Change the sign of the current value
     */
    changeSign() {
        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
        return this.currentValue;
    }

    /**
     * Calculate percentage
     */
    percentage() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        return this.currentValue;
    }

    /**
     * Get calculation history
     */
    getHistory() {
        return this.history;
    }

    /**
     * Clear history
     */
    clearHistory() {
        this.history = [];
    }
}

export default CalculatorModel;