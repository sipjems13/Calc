const display = document.getElementById("display");
const memoryIndicator = document.getElementById("memoryIndicator");
const processDisplay = document.getElementById("processDisplay");

let currentInput = "0", previousInput = null, operator = null, waitingForNewInput = false, memory = 0, expression = "";

function updateDisplay() {
  const value = parseFloat(currentInput);
  if (value > 999999999 || value < -999999999) {
    display.value = value.toExponential(6);
  } else if (value % 1 !== 0) {
    display.value = value.toFixed(8).replace(/\.?0+$/, "");
  } else {
    display.value = value.toLocaleString();
  }
}

function updateProcess() {
  processDisplay.textContent = expression;
}

function updateMemoryIndicator() {
  if (memory !== 0) {
    memoryIndicator.classList.add("active");
    memoryIndicator.textContent = `M: ${memory}`;
  } else {
    memoryIndicator.classList.remove("active");
    memoryIndicator.textContent = "";
  }
}

function inputNumber(num) {
  currentInput = waitingForNewInput ? num : (currentInput === "0" ? num : currentInput + num);
  waitingForNewInput = false;
  updateDisplay();
}

function inputDecimal() {
  if (waitingForNewInput) {
    currentInput = "0.";
    waitingForNewInput = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function setOperation(nextOperator) {
  const value = parseFloat(currentInput);
  if (previousInput === null) {
    previousInput = value;
    expression = `${currentInput} ${nextOperator}`;
  } else if (operator) {
    currentInput = String(performCalculation());
    previousInput = parseFloat(currentInput);
    expression += ` ${currentInput} ${nextOperator}`;
    updateDisplay();
  }
  operator = nextOperator;
  waitingForNewInput = true;
  updateProcess();
}

function calculate() {
  if (previousInput !== null && operator) {
    currentInput = String(performCalculation());
    expression += ` ${currentInput} =`;
    previousInput = operator = null;
    waitingForNewInput = true;
    updateDisplay();
    updateProcess();
  }
}

function performCalculation() {
  const prev = previousInput, current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return current;
  switch (operator) {
    case "+": return prev + current;
    case "-": return prev - current;
    case "×": return prev * current;
    case "÷": return current !== 0 ? prev / current : 0;
    default: return current;
  }
}

function clearAll() {
  currentInput = "0"; previousInput = operator = null; expression = "";
  waitingForNewInput = false;
  updateDisplay();
  updateProcess();
}

function toggleSign() {
  currentInput = String(-parseFloat(currentInput));
  updateDisplay();
}

function percentage() {
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay();
}

// Memory Functions
function memoryAdd() {
  memory += parseFloat(currentInput);
  updateMemoryIndicator();
}

function memorySubtract() {
  memory -= parseFloat(currentInput);
  updateMemoryIndicator();
}

function memoryRecall() {
  currentInput = String(memory);
  waitingForNewInput = false;
  updateDisplay();
}

function memoryClear() {
  memory = 0;
  updateMemoryIndicator();
}

function clearCurrentInput() {
  currentInput = "0";
  updateDisplay();
}

// Initialize
updateDisplay();
updateProcess();
updateMemoryIndicator();
