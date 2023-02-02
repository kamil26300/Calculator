class Calculator {
	constructor(previousOperandText, currentOperandText) {
		this.currentOperandText = currentOperandText;
		this.previousOperandText = previousOperandText;
		this.clear();
	}

	clear() {
		this.previousOperand = "";
		this.currentOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand =
			this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(curr)) return;

		switch (this.operation) {
			case "+":
				computation = prev + curr;
				break;
			case "-":
				computation = prev - curr;
				break;
			case "x":
				computation = prev * curr;
				break;
			case "÷":
				computation = prev / curr;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplay(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandText.innerText = this.getDisplay(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
		} else {
			this.previousOperandText.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const ACButton = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand");
const currentOperandText = document.querySelector("[data-current-operand]");
const body = document.querySelector("body");
const toggle = document.querySelector("input");
const output = document.querySelector("[data-output]");
const made = document.querySelector("[data-made]");
const pi = document.querySelector("[data-pi]");

// Dark Mode
toggle.onclick = function () {
	body.classList.toggle("active");
	numberButtons.forEach((button) => {
		button.classList.toggle("active");
	});
	operationButtons.forEach((button) => {
		button.classList.toggle("active");
	});
	// previousOperandText.classList.toggle("active");
	// currentOperandText.classList.toggle("active");
	ACButton.classList.toggle("active");
	deleteButton.classList.toggle("active");
	equalsButton.classList.toggle("active");
	output.classList.toggle("active");
	made.classList.toggle("active");
	pi.classList.toggle("active");
};

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

ACButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});
