const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelectorAll('[data-equals]');
const deleteBtn = document.querySelectorAll('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const previousNumberElement = document.querySelector('[data-previous]');
const currentNumberElement = document.querySelector('[data-current]');

class Calculator {
    constructor(previousNumberElement, currentNumberElement) {
        this.previousNumberElement = previousNumberElement;
        this.currentNumberElement = currentNumberElement;
        this.clear()
    }

    clear() {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operation = undefined
        this.update();
    }

    delete() {

    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes(".")) {
            return;
        }
        this.currentNumber = this.currentNumber.concat(number);
    }

    update() {
        this.currentNumberElement.innerText = this.currentNumber;
        this.previousNumberElement.innerText = this.previousNumber;
    }
}

const calculator = new Calculator(previousNumberElement, currentNumberElement);

numberBtns.forEach(element => {
    element.addEventListener('click', () => {
        calculator.appendNumber(element.innerText);
        calculator.update();
    });
});

clearBtn.addEventListener('click', button => {
    calculator.clear();
})