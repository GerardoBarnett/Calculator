# Calculator App

A modern, user-friendly calculator application built with JavaScript, HTML, and CSS using the MVC (Model-View-Controller) architecture.

![Calculator App Screenshot](https://via.placeholder.com/400x600?text=Calculator+App)

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculations
- Sign change (+/-)
- Decimal point support
- Clear and delete functionality
- Calculation history tracking
- Responsive design for all screen sizes
- Dark/light theme toggle
- Keyboard support for enhanced usability
- Error handling for invalid operations

## Project Structure

The application follows the MVC (Model-View-Controller) architecture:

```
/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Styling for the calculator
├── js/
│   └── app.js              # Main application entry point
├── models/
│   └── calculator.js       # Calculator logic and state management
├── views/
│   └── calculatorView.js   # UI rendering and display updates
├── controllers/
│   └── calculatorController.js  # Connects model and view
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## How to Use

1. **Open the Calculator**: Open `index.html` in any modern web browser.

2. **Basic Operations**:
   - Click on digit buttons (0-9) to input numbers
   - Click on operation buttons (+, -, ×, ÷) to select an operation
   - Click "=" to calculate the result
   - Click "C" to clear the calculator
   - Click "⌫" to delete the last digit

3. **Additional Features**:
   - Click "+/-" to change the sign of the current number
   - Click "%" to convert the current number to a percentage
   - Click "." to add a decimal point
   - Click "📋 History" to view calculation history
   - Click "🌙 Dark" or "☀️ Light" to toggle between dark and light themes

4. **Keyboard Support**:
   - Use number keys (0-9) to input numbers
   - Use operation keys (+, -, *, /) for operations
   - Press Enter or = for calculation
   - Press Escape for clear
   - Press Backspace or Delete to delete the last digit
   - Press . (period) for decimal point
   - Press % for percentage

## Development

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript

### Setup for Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/calculator-app.git
   cd calculator-app
   ```

2. Open the project in your favorite code editor.

3. Make changes to the code as needed.

4. Test your changes by opening `index.html` in a web browser.

### Architecture Overview

- **Model** (`models/calculator.js`): Handles the core calculation logic and state management.
- **View** (`views/calculatorView.js`): Manages the UI rendering and display updates.
- **Controller** (`controllers/calculatorController.js`): Connects the model and view, handling user interactions.

## Error Handling

The calculator includes comprehensive error handling:

- Division by zero shows an error message
- Invalid operations are prevented
- Input validation ensures proper number formats
- Visual feedback for errors with timed dismissal

## Browser Compatibility

The calculator is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern calculator applications
- Built with vanilla JavaScript, HTML, and CSS (no external libraries)
