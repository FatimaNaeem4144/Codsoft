const display = document.getElementById("display");
let currentInput = "";
let currentOperation = "";
let previousInput = "";
let shouldResetCurrentInput = false;
let memory = 0;

// append values to current input
function appendToCurrentInput(val) {
    if(shouldResetCurrentInput){
        currentInput = "";
        shouldResetCurrentInput = false;
    }
    currentInput += val;
    display.value = currentInput;    
}

// set mathematical operation
function setOperation(op){
    if(previousInput && currentInput && currentOperation){
        previousInput = evaluate();
        display.value = previousInput;
        currentInput = "";
    }
    else if(currentInput && !previousInput){
        previousInput = currentInput;
        currentInput = "";
    }
    currentOperation = op;
    shouldResetCurrentInput = true;
}

//advance functions sin cos tan
function applyAdvancedFunction(func){
    if(currentInput){
        let result = advancedFunctions(func, parseFloat(currentInput));
        if(result !== undefined){
            currentInput = result.toString();
            display.value = currentInput;
        }
    }
}

// evaluation of mathematical op
function evaluate(){
    let result = 0;
    const pInput = parseFloat(previousInput);
    const cInput = parseFloat(currentInput);

    switch(currentOperation){
        case '+':
            result = pInput + cInput;
            break;
        case '-':
            result = pInput - cInput;
            break;
        case '*':
            result = pInput * cInput;
            break;
        case '/':
            if(cInput !== 0){
            result = pInput / cInput;
            } else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Division by zero',
                    showConfirmButton: false,
                    timer: 1500
                });
                clearAll();
                return;
            }
            break;
            case '^':
                result = Math.pow(pInput,cInput);
                break;
                default:
                    return;
    }
    return result.toString();
}

function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}

function advancedFunctions(func, value){
    switch(func){
        case 'sin':
            return Math.sin(degreesToRadians(value));
        case 'cos':
            return Math.cos(degreesToRadians(value));
        case 'tan':
            return Math.tan(degreesToRadians(value));
        case 'log':
            if (value <= 0){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Log of a non positive number',
                    showConfirmButton: false,
                    timer: 1500
                });
                clearAll();
                return;
            }
            return Math.log10(value);
            default:
                return;
    }
}

function clearAll(){
    currentInput = "";
    currentOperation = "";
    previousInput = "";
    display.value = "";
}

function calculateResult(){
    if( previousInput && currentInput && currentOperation){
        currentInput = evaluate();
        display.value = currentInput;
        previousInput = "";
        currentOperation = "";
    }
}

// Bind logic to buttons
document.querySelectorAll(".buttons button").forEach(button => {
    const value = button.textContent;

    if(['+','-','*','/','^'].includes(value)){
        button.addEventListener('click', function(){
            setOperation(value);
        });
    }
    else if(['sin','cos','tan','log'].includes(value)){
        button.addEventListener('click', function(){
            applyAdvancedFunction(value);
        });
    }
    else if(value == "="){
        button.addEventListener('click', function(){
            calculateResult();
        });
    }
    else{
        button.addEventListener('click', function(){
            if(!button.getAttribute("data-functional")){
                appendToCurrentInput(value);
            }
        });
    }
    
});

// memory operations
document.getElementById("memoryClear").addEventListener('click', function(){
    memory = 0;
});
document.getElementById("memoryRecall").addEventListener('click', function(){
    display.value = memory.toString();
    currentInput = memory.toString();
    shouldResetCurrentInput = true;
});
document.getElementById("memoryPlus").addEventListener('click',function(){
    if(currentInput){
        memory += parseFloat(currentInput);
    }
});
document.getElementById("memoryMinus").addEventListener('click',function(){
    if(currentInput){
        memory -= parseFloat(currentInput);
    }
});

document.getElementById("clear").addEventListener('click', clearAll);

document.getElementById("percentage").addEventListener('click',function(){
    if(currentInput){
        currentInput = (parseFloat(currentInput)/ 100).toString();
        display.value = currentInput;
    }
});

document.getElementById("squareRoot").addEventListener('click',function(){
    if(currentInput){
        if(parseFloat(currentInput)<0){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Negative number for square root',
                showConfirmButton: false,
                timer: 1500
            });
            clearAll();
            return;
        }
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        display.value = currentInput;
    }
});

document.getElementById("toggleSign").addEventListener('click',function(){
    if(currentInput){
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.value = currentInput;
    }
});

const backgroundToggle = document.getElementById('check-5');
const calculators = document.querySelectorAll(".calculator");
const displays = document.querySelectorAll(".display");
const buttons = document.getElementsByTagName("button");
const body = document.body;
    
// Function to apply button styles
function applyButtonStyles(isPinkTheme) {
    for (let i = 0; i < buttons.length; i++) {
        if (isPinkTheme) {
            body.style.backgroundColor = 'pink';
            buttons[i].style.background = 'pink';
            buttons[i].style.color = '#581010';
            buttons[i].style.border = '1px solid rgb(131, 28, 45)';
            calculators.forEach(calculator => {
                calculator.style.backgroundColor = 'pink';
                calculator.style.border = '1px solid rgb(217, 115, 132)';
            });
        } else {
            body.style.backgroundColor = 'white';
            buttons[i].style.background = 'white';
            buttons[i].style.color = 'rgb(6, 62, 63)';
            buttons[i].style.border = '1px solid gray';
            calculators.forEach(calculator => {
                calculator.style.backgroundColor = 'white';
                calculator.style.border = '1px solid white';
            });
        }
    }
    // Also apply background color to displays
    for (let i = 0; i < displays.length; i++) {
        if (isPinkTheme) {
            displays[i].style.background = '';
        } else {
            displays[i].style.background = '#ecf0f3';
        }
    }
}

// Apply initial theme based on the toggle state
applyButtonStyles(backgroundToggle.checked);

// Toggle theme and button styles when the background toggle changes
backgroundToggle.addEventListener('change', () => {
    const isPinkTheme = backgroundToggle.checked;
    applyButtonStyles(isPinkTheme);
});

// Add hover and active effects for buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', () => {
        if (!backgroundToggle.checked) {
            buttons[i].style.background = 'rgba(128, 128, 128, 0.759)';
        } else {
            buttons[i].style.background = 'rgb(158, 60, 76)';
        }
    });

    buttons[i].addEventListener('mouseleave', () => {
        if (!backgroundToggle.checked) {
            buttons[i].style.background = 'white';
        } else {
            buttons[i].style.background = 'pink';
        }
    });

    buttons[i].addEventListener('mousedown', () => {
        if (!backgroundToggle.checked) {
            buttons[i].style.background = 'rgb(131, 28, 45)';
        } else {
            buttons[i].style.background = 'rgb(109, 39, 51)';
        }
    });

    buttons[i].addEventListener('mouseup', () => {
        if (!backgroundToggle.checked) {
            buttons[i].style.background = 'rgba(128, 128, 128, 0.759)';
        } else {
            buttons[i].style.background = 'rgb(158, 60, 76)';
        }
    });
}
