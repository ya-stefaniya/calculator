
class Calculator {
constructor(previousOperandElement, currentOperandElement){
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clearAll();
    this.readyToReset = false;
}
//методы класса
clearAll(){
    this.currentOperand= '';
    this.previousOperand = '';
    this.operation = undefined;
    this.previousOperandElement.innerText = '';
    this.readyToReset = false;
}

delete(){
if(this.currentOperand.toString()[0] ==='-' && this.currentOperand.toString().length === 2){
    this.currentOperand = this.currentOperand.toString().slice(0,-2);
} else this.currentOperand = this.currentOperand.toString().slice(0,-1);
}

addDot() {
    let before = 0;
    if (this.currentOperand.includes('.')) return;
    if (this.currentOperand === '') {
        this.currentOperand = before + '.';
    } else this.currentOperand = this.currentOperand + '.'
  }

appendNumber(number){
        this.currentOperand = String(this.currentOperand) + number.toString();
    }
   
formateNumber(number){
    if (number === '-' || number === '.') return;

    let floatNumber = parseFloat(number);
    if(isNaN(floatNumber)) return '';
    return floatNumber.toLocaleString('en',
        {maximumFractionDigits: 6
        });
}
updateDisplay(){
    console.log('приходит на печать ' + this.currentOperand);
    
        if (this.currentOperand === 'You broke me:(' || this.currentOperand.includes('.')) {
            this.currentOperandElement.innerText = this.currentOperand;
        } else 
        this.currentOperandElement.innerText = this.formateNumber(this.currentOperand);
    
    if (this.operation === 'xn') {
    this.previousOperandElement.innerText = `${this.formateNumber(this.previousOperand)} ^ `;
    } else if (this.operation) {
    this.previousOperandElement.innerText = `${this.formateNumber(this.previousOperand)} ${this.operation}`;
    }
}
updateDisplayEqual(){
if (this.currentOperand === 'no'){
this.currentOperandElement.innerText = "Do NOT do this!";
this.previousOperandElement.innerText = ``;
}
else {
this.currentOperandElement.innerText = this.formateNumber(this.currentOperand);
this.previousOperandElement.innerText = ``;
}
//this.previousOperand = '';
    
}
        
chooseOperation(operation){

    if (operation === '-' && this.currentOperand === '') {
        this.currentOperand = `-`;
        this.currentOperandElement.innerText = '-';
        this.appendNumber();
    }
    if (operation === '-' && this.currentOperandElement.innerText === '-') {
        this.currentOperand = ``;
        this.operation = '-';
        this.appendNumber();
    }
    if(!this.currentOperandElement.innerText) return; 
   
    this.compute();
    this.previousOperandElement.innerText = `${this.formateNumber(this.currentOperand)} ${this.operation}`;
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';    
    }

compute() {
(this.operation === '√' || this.operation === '1/x' || this.operation === 'ln') ? this.computeHard(): this.computeSimple();

}

computeSimple(){
let computation; //result
let prev = parseFloat(this.previousOperand);
let current = parseFloat(this.currentOperand);
if (isNaN(prev) || isNaN(current)) return;

switch(this.operation){
    case '+' :
        computation = prev + current
        break
    case '-' :
        computation = prev - current
        break
    case '*' :
        computation = prev * current
        break
    case '÷' :
        computation = (current===0)? 'no' : (prev/current) ;
        break
    case '=' :
        computation = current + current
        break
    case 'xn':
        computation = Math.pow(prev, current);
        break
    default:
        return
    }
    this.readyToReset = true; 
    this.currentOperand = computation ;
    this.operation = undefined;
    this.previousOperand = '';
    console.log(this.currentOperand);
    //this.previousOperandElement.innerText= '';
    
}
computeHard() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    switch (this.operation) {
        case 'ln':     
        computation = Math.log(prev);    
        break
        case '√':
        computation = isNaN(Math.sqrt(prev)) ? 'You broke me:(' : Math.sqrt(prev);
        break
        case '1/x':
        computation = 1/prev;
        break
        default:
        return
    }
    this.readyToReset = true; 
    this.previousOperand = prev;
    this.currentOperand = computation;
    this.operation = undefined;
    }
}
const numbersBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const clearAllBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');
const dotBtn= document.querySelector('[data-dot]');


const calculator = new Calculator(previousOperandElement, currentOperandElement);

dotBtn.addEventListener('click', btn => {
    calculator.addDot();
    calculator.updateDisplay();
  })

numbersBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        
    if (calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset) {
        console.log('зашла сюда, нужно обнулить')
      calculator.currentOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
    })
})


operationBtns.forEach(Btn => {
Btn.addEventListener('click',() => {
    calculator.chooseOperation(Btn.innerText);
    calculator.compute();
    calculator.updateDisplayEqual();
    calculator.updateDisplay();
    
})
})

equalBtn.addEventListener('click', Btn => {
    calculator.compute();
    calculator.updateDisplayEqual();
    
})
clearAllBtn.addEventListener('click', Btn => {
    calculator.clearAll();
    calculator.updateDisplay();
})
deleteBtn.addEventListener('click', Btn => {
    calculator.delete();
    calculator.updateDisplay();
})

