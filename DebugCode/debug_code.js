function performOperation() {
    // Get user input
    let num1 = parseInt(document.getElementById('input1').value);
    let num2 = parseInt(document.getElementById('input2').value);

    if (!isNaN(num1) && !isNaN(num2)) {

        let result = calculate(num1, num2, "multiply");

        displayResult(result);

    } else {
        displayResult('Please enter valid numbers');
    }
}

function calculate(a, b, operation) {
    debugger;

    if (operation === "add") {
        return a + b;
    }
    else if (operation === "multiply") {
        return a * b;
    }
    else if (operation === "divide") {
        return b !== 0 ? a / b : "Cannot divide by zero";
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `The result is: ${result}`;
}