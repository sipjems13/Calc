function addNumbers() {
    const num1 = parseFloat(document.getElementById('number1').value);
    const num2 = parseFloat(document.getElementById('number2').value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers.");
        return;
    }

    const sum = num1 + num2;
    alert("The sum is: " + sum);
}

function clearNumbers(){
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
}


function subtractNumbers(){
    const num1 = parseFloat(document.getElementById('number1').value);
    const num2 = parseFloat(document.getElementById('number2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers.");
        return;
    }

    const sub = num1 - num2;
    if (sub < 0) {
        alert("Niggative.");
        return;
    }
    alert("The subtracted value is: " + sub);
}
