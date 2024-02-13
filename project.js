
const prompt = require("prompt-sync")();

const machineSize = 2 // 3 -> 3x3 machine, 5 -> 5x5 machine.

const cards = ["9", "T", "J", "Q", "K", "A"]
const smallWin = ["9", "T", "J"]
const mediumWin = ["Q", "K"]
//const bigWin = ["A"]

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const blue = "\x1b[34m";


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

const calculateWinnings = (spinnedNumbers) => {
    for (let i = 0; i < machineSize; i++) {

        let lineWin = true;
        for (let j = 0; j < machineSize - 1; j++) {

            const index = i * machineSize + j;
            if (spinnedNumbers[index] != spinnedNumbers[index + 1]) {
                lineWin = false;
                break;
            }
        }

        if (lineWin) {
            if (smallWin.includes(spinnedNumbers[i * machineSize])) {
                // small win
                console.log(green + "small win" + reset);
                depositAmount += 100;
            } else if (mediumWin.includes(spinnedNumbers[i * machineSize])) {
                // medium win
                console.log(blue + "medium win" + reset);
                depositAmount += 200;
            } else {
                // big win
                console.log(red + "big win" + reset);
                depositAmount += 500;
            }
        }
    }
}

const spinMachine = () => {
    const spinnedNumbers = []
    for (let i = 0; i < Math.pow(machineSize, 2); i++) {
        spinnedNumbers.push(cards[randomNumber()]);  
    }

    printMachine(spinnedNumbers);
    calculateWinnings(spinnedNumbers);
}

let depositAmount = 100;
//const depositAmount = deposit();

spinMachine()
