 let expression = '';
let display = document.getElementById('inDisplay');
let ansDisplay = document.getElementById('outDisplay');


function numValue(value){
if (value === '.') {
    const parts = expression.split(/[\+\-\*\/]/); 
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes('.')) {
      return; 
    }
  }

  expression += value;
  display.value = expression;
}
function calculate() {
      try {
        const result = eval(expression);
        ansDisplay.value = result;
      } catch (e) {
        alert("Error par")
      }
    }

    function clearDisplay() {
      expression = '';
      display.value = '';
      ansDisplay.value = '';
    }

    function clearTanan(){
        expression = '';
        display.value = '';
        ansDisplay.value = '';
    }