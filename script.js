const display = document.getElementById('display');
const decimalBtn = document.getElementById('decimal');
const backspaceBtn = document.getElementById('backspace');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');

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

const backspace = () => {
    if (state.operator === null) {
        if (!state.first) return;
        state.first = state.first.slice(0, -1) || null;
        updateDisplay(state.first || '0');
    } else {
        if (!state.second) return;
        state.second = state.second.slice(0, -1) || null;
        updateDisplay(state.second || '0');
    }
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

const appendDecimal = () => {
    if (state.operator === null) {
        if (!state.first.includes('.')) {
            state.first = state.first ? state.first + '.' : '0.';
            updateDisplay(state.first);
        } 
    } else {
        if (!state.second.includes('.')) {
            state.second = state.second ? state.second + '.' : '0.';
            updateDisplay(state.second);
        }
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

clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', operate);
backspaceBtn.addEventListener('click', backspace);
decimalBtn.addEventListener("click", appendDecimal);

document.querySelectorAll('[data-number]').forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => chooseOperator(btn.id));
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) appendNumber(e.key);

  if (e.key === ".") appendDecimal();
  if (e.key === "Backspace") backspace();
  if (e.key === "Enter" || e.key === "=") operate();
  if (e.key === "Escape") clear();

  if (e.key === "+") chooseOperator("add");
  if (e.key === "-") chooseOperator("subtract");
  if (e.key === "*") chooseOperator("multiply");
  if (e.key === "/") chooseOperator("divide");
});

