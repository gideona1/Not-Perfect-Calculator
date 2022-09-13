/**
 * TODO: Write code comments
 * DONE: Limit to 8 or 16 point rounding
 * DONE: Precise decimal arithmetic
 * DONE: Clear entry button
 *  */

let firstNumber = undefined; // Entry Number
let secondNumber = undefined;
let answer = undefined;

let operator = undefined; // 0 = add, 1 = subtract, 2 = multi, 3 = divide
let replaceOnInput = false;
let resetHistoryOnInput = false;

const input = document.getElementById("calc-input"); // stores input element in variable
const historyDisplay = document.getElementById("calc-history");

Number.prototype.fixed = function () {
  return parseFloat(this.toPrecision(14));
};

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
    if (input.value.replace(".", "").length < 9) input.value += value;
  } else {
    input.value = value;
  }
};

/**
 *
 * @param {Number} operator
 * @returns
 */
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
      secondNumber = parseFloat(input.value).fixed();
      firstNumber = calculate();
      secondNumber = undefined;
    }

    if (firstNumber === undefined && secondNumber === undefined) {
      firstNumber = parseFloat(input.value).fixed();
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
      return (firstNumber + secondNumber).fixed();
    case 1:
      return (firstNumber - secondNumber).fixed();
    case 2:
      return (firstNumber * secondNumber).fixed();
    case 3:
      return (firstNumber / secondNumber).fixed();
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

const getPercentage = () => {
  updateInput((parseFloat(input.value) / 100).fixed(), false);
};

const equal = () => {
  if (firstNumber !== undefined) {
    if (secondNumber === undefined) {
      secondNumber = parseFloat(input.value).fixed();
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

/**
 * Clear All Entries from history and clear input.
 */
const clearAllEntry = () => {
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;

  updateHistory();
  updateInput(0, false);
};
