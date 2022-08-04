/**
 * TODO: Write code comments
 * TODO: Limit to 8 or 16 point rounding
 *  */

let firstNumber = undefined; // Entry Number
let secondNumber = undefined;
let answer = undefined;

let operator = undefined; // 0 = add, 1 = subtract, 2 = multi, 3 = divide
let replaceOnInput = false;
let resetHistoryOnInput = false;

const input = document.getElementById("calc-input"); // stores input element in variable
const historyDisplay = document.getElementById("calc-history");

/**
 *
 * @param {Number} value
 * @param {Boolean} append
 * @param {Boolean} ignoreReset
 */
const updateInput = (value, append, ignoreReset) => {
  if ((input.value.charAt(0) === "0" && value != "." && !input.value.includes("0.")) || replaceOnInput) {
    if (resetHistoryOnInput && !ignoreReset) {
      firstNumber = undefined;
      secondNumber = undefined;
      updateHistory();
      resetHistoryOnInput = false;
    }

    input.value = value;
    replaceOnInput = false;

    return;
  }

  if (append) {
    input.value += value;
  } else {
    input.value = value;
  }
};

const operatorToSymbol = (operator) => {
  console.log(operator);
  switch (operator) {
    case 0:
      return "+";
    case 1:
      return "-";
    case 2:
      return "×";
    case 3:
      return "÷";
  }
};

const changeOperation = (button, requestOperator) => {
  if (!replaceOnInput || resetHistoryOnInput) {
    if (firstNumber !== undefined && secondNumber === undefined) {
      secondNumber = parseFloat(input.value);
      firstNumber = calculate();
      secondNumber = undefined;
    }

    if (firstNumber === undefined && secondNumber === undefined) {
      firstNumber = parseFloat(input.value);
    }
  }

  operator = requestOperator;
  resetOperatorButton();
  button.classList.add("hold");

  replaceOnInput = true;
  updateHistory();
};

const resetOperatorButton = () => {
  const operatorButtons = document.querySelectorAll(".accent-f");

  operatorButtons.forEach((button) => {
    button.classList.remove("hold");
  });
};

const calculate = () => {
  switch (operator) {
    case 0:
      return firstNumber + secondNumber;
    case 1:
      return firstNumber - secondNumber;
    case 2:
      return firstNumber * secondNumber;
    case 3:
      return firstNumber / secondNumber;
  }
};

const updateHistory = () => {
  if (firstNumber === undefined && secondNumber === undefined) {
    historyDisplay.textContent = "Start inputing numbers.";
  }

  if (firstNumber !== undefined && secondNumber === undefined) {
    historyDisplay.textContent = firstNumber + operatorToSymbol(operator) + "?";
  }

  if (firstNumber !== undefined && secondNumber !== undefined) {
    console.log("second number");
    historyDisplay.textContent = firstNumber + operatorToSymbol(operator) + secondNumber + "=";
  }
};

const addZero = () => {
  if (input.value !== "0") {
    updateInput(0, true);
  }
};

const addDecimal = () => {
  if (!input.value.includes(".")) {
    updateInput(".", true);
  }
};

const includeNegative = () => {
  if (input.value !== "0") {
    if (!input.value.includes("-")) {
      updateInput("-" + input.value, false);
    } else {
      updateInput(input.value.replace("-", ""), false);
    }
  }
};

// Not perfect
const getPercentage = () => {
  updateInput(parseFloat(input.value) / 100, false);
};

const equal = () => {
  if (firstNumber !== undefined) {
    if (secondNumber === undefined) {
      secondNumber = parseFloat(input.value);
    }
    updateInput(calculate(), false, true);
    updateHistory();
    resetOperatorButton();

    replaceOnInput = true;
    resetHistoryOnInput = true;
    firstNumber = calculate();
    // secondNumber = undefined;
  }
};
