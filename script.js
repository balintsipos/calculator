const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const previousNumberElement = document.querySelector('[data-previous]');
const currentNumberElement = document.querySelector('[data-current]');

class Calculator {
    constructor(previousNumberElement, currentNumberElement) {
        this.previousNumberElement = previousNumberElement;
        this.currentNumberElement = currentNumberElement;
        this.clear()
        this.currentNumber = "0";
    }

    clear() {
        this.currentNumber = "0";
        this.previousNumber = "";
        this.currentOperation = "";
        this.update();
    }

    delete() {
        if (this.currentNumber.length == 1) {
            this.currentNumber = "0";
        } else {
            this.currentNumber = this.currentNumber.toString().slice(0, -1);
        }
        this.update();
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes(".")) {
            return;
        } else if (this.currentNumber == 0) {
            this.currentNumber = number;
        } else {
            this.currentNumber = this.currentNumber.toString().concat(number);
        }
    }

    update() {
        this.currentNumberElement.innerText = this.currentNumber;
        console.log(this.previousNumber);
        console.log(this.currentOperation);
        this.previousNumberElement.innerText = this.previousNumber.toString().concat(" ", this.currentOperation);
    }

    operation(operation) {
        if (this.currentNumber === "0") {
            return;
        } else if (this.previousNumber == "") {
            this.previousNumber = this.currentNumber;
            this.currentOperation = operation;
            calculator.update();
            this.currentNumber = "0";
        } else if (this.previousNumber !== "") {
            this.currentOperation = operation;
            this.evaluate();
        }

    }

    evaluate() {
        let result = 0
        const previous = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch (this.currentOperation) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "X":
                result = previous * current;
                break;
            case "÷":
                result = previous / current;
                break;
            default:
                this.currentNumber = "ERROR";
        }
        this.currentNumber = result;
        this.previousNumber = result;
        this.update();
    }
}

const calculator = new Calculator(previousNumberElement, currentNumberElement);

numberBtns.forEach(element => {
    element.addEventListener('click', () => {
        calculator.appendNumber(element.innerText);
        calculator.update();
    });
});

clearBtn.addEventListener('click', () => {
    calculator.clear();
})

operationBtns.forEach(element => {
    element.addEventListener('click', () => {
        calculator.operation(element.innerText);
    });
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
});

equalsBtn.addEventListener('click', (button) => {
    calculator.evaluate();
});