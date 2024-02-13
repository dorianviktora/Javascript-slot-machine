
const prompt = require("prompt-sync")();

const machineSize = 3 // 3x3 slot machine, do not change for now
const cards = ["9", "10", "J", "Q", "K", "A"]

const deposit = () => {
    depositNumber = 0;

    while (isNaN(depositNumber) || depositNumber <= 0) {
        const depositAmount = prompt("Enter deposit amount: ");
        depositNumber = parseInt(depositAmount);

        if (isNaN(depositNumber) || depositNumber <= 0){
            console.log("Invalid deposit amount. Try again.")
        } else {
            return depositNumber;
        }
    }
}

const randomNumber = () => {
    return Math.floor(Math.random() * (5 + 1));
}

const printBorderLine = () => {
    for (let j = 0; j < machineSize; j++) {
        process.stdout.write("+---");
    }
    console.log("+");
}

const printMachine = (spinnedNumbers) => {
    for (let i = 0; i < machineSize; i++) {
        printBorderLine();
        
        for (let j = 0; j < machineSize; j++) {
            process.stdout.write("| " + spinnedNumbers[i * machineSize + j] + " ");
        }
        console.log("|");
    }
    printBorderLine();
}

const spinMachine = () => {
    const spinnedNumbers = []
    for (let i = 0; i < Math.pow(machineSize, 2); i++) {
        spinnedNumbers.push(randomNumber());  
    }

    printMachine(spinnedNumbers);
}

spinMachine()


const depositAmount = deposit();
let number = randomNumber();

console.log(number)
