const expressionDisplay = document.getElementById('expression');
const suggestedOutputDisplay = document.getElementById('suggestedOutput');
let expression = '';

function appendToDisplay(value) {
    expression += value;
    expressionDisplay.textContent = expression;
    updateSuggestedOutput();
}

function clearDisplay() {
    expression = '';
    expressionDisplay.textContent = '';
    suggestedOutputDisplay.textContent = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    expressionDisplay.textContent = expression;
    updateSuggestedOutput();
}

function calculate() {
    try {
        const result = eval(expression);
        expressionDisplay.textContent = result;
        suggestedOutputDisplay.textContent = "";
        expression = result.toString();
    } catch (error) {
        expressionDisplay.textContent = 'Error';
        suggestedOutputDisplay.textContent = "";
        expression = '';
    }
}

function updateSuggestedOutput() {
    try {
        if (expression) {
            const result = eval(expression);
            suggestedOutputDisplay.textContent = result;
        } else {
            suggestedOutputDisplay.textContent = "";
        }

    } catch (error) {
        // suggestedOutputDisplay.textContent = "";
        suggestedOutputDisplay();


    }
}
