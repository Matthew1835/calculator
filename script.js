// let display = document.getElementById('display');
// let firstNumber = localStorage.getItem("firstNumber") ?? '';
// let operator = localStorage.getItem("operator") ?? '';
// let secondNumber = localStorage.getItem("secondNumber") ?? '';

// function updateDisplay(value) {
//     display.textContent = value;
// }

// function clear() {
//     firstNumber = '';
//     operator = '';
//     secondNumber = '';

//     localStorage.removeItem("firstNumber");
//     localStorage.removeItem("operator");
//     localStorage.removeItem("secondNumber");

//     updateDisplay('0');
// }

// function appendNumber(number) {
//     if (operator === '') {
//         if (firstNumber === '0') {
//             firstNumber = number;
//         } else {
//             firstNumber += number;
//         }
//         localStorage.setItem('firstNumber', firstNumber);
//         updateDisplay(firstNumber);
//     } else {
//         if (secondNumber === '0') {
//             secondNumber = number;
//         } else {
//             secondNumber += number;
//         }
//         localStorage.setItem('secondNumber', secondNumber);
//         updateDisplay(secondNumber);
//     }
// }

// function chooseOperator(op) {
//     if (firstNumber !== '' && secondNumber !== '') {
//         operate();
//     }
//     if (firstNumber !== '') {
//         operator = op;
//         localStorage.setItem('operator', operator);
//     }
// }

// function operate() {
//     if (firstNumber === '' || operator === '' || secondNumber === '') return;
//     let result;
//     const num1 = parseFloat(firstNumber);
//     const num2 = parseFloat(secondNumber);
//     switch (operator) {
//         case 'add':
//             result = num1 + num2;
//             break;
//         case 'subtract':
//             result = num1 - num2;
//             break;
//         case 'multiply':
//             result = num1 * num2;
//             break;
//         case 'divide':
//             if (num2 === 0) {
//                 clear();
//                 display.textContent = 'Error: Divide by 0';
//                 return;
//             }
//             result = num1 / num2;
//             break;
//         default:
//             return;
//     }
//     result = Math.round(result * 1000000) / 1000000; // Round to 6 decimal places
//     clear();
//     localStorage.setItem('firstNumber', result);
//     firstNumber = localStorage.getItem("firstNumber");
//     updateDisplay(firstNumber);
// }

// document.getElementById('clear').addEventListener('click', clear);
// document.getElementById('equal').addEventListener('click', operate);

// document.querySelectorAll('.number').forEach(button => {
//     button.addEventListener('click', () => appendNumber(button.id));
// });

// document.querySelectorAll('.operator').forEach(button => {
//     button.addEventListener('click', () => chooseOperation(button.id));
// });

const display = document.getElementById('display');

const state = {
    first: null,
    operator: null,
    second: null,
    resultDisplayed: false
}

const updateDisplay = (value) => {
    display.textContent = value;
}

const clear = () => {
    state.first = null;
    state.operator = null;
    state.second = null;
    state.resultDisplayed = false;
    updateDisplay('0');
}

const appendNumber = (number) => {
    if (state.resultDisplayed) {
        state.first = number;
        state.resultDisplayed = false;
        updateDisplay(state.first);
        return;
    }

    if (state.operator === null) {
        state.first = state.first ? state.first + number : number;
        updateDisplay(state.first);
    } else {
        state.second = state.second ? state.second + number : number;
        updateDisplay(state.second);
    }
}

const chooseOperator = (op) => {
    if (state.first === null) return;

    if (state.second !== null) {
        operate();
    }

    state.operator = op;
    state.resultDisplayed = false;
}

const operate = () => {
    if (state.first === null || state.operator === null || state.second === null) return;

    const num1 = parseFloat(state.first);
    const num2 = parseFloat(state.second);
    let result;

    switch (state.operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) return updateDisplay('Error: Divide by 0');
            result = num1 / num2;
            break;
    }

    result = Math.round(result * 1e6) / 1e6; // Round to 6 decimal places

    state.first = result.toString();
    state.operator = null;
    state.second = null;
    state.resultDisplayed = true;

    updateDisplay(state.first);
}

document.getElementById('clear').addEventListener('click', clear);
document.getElementById('equal').addEventListener('click', operate);

document.querySelectorAll('[data-number]').forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => chooseOperator(btn.id));
});
