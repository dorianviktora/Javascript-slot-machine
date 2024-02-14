
const prompt = require("prompt-sync")();

const machineSize = 3; // 3 -> 3x3 machine, 5 -> 5x5 machine. Min possible size 2 but for fun use at least 3x3.

const cards = ["9", "T", "J", "Q", "K", "A"];
const smallWin = ["9", "T", "J"];
const mediumWin = ["Q", "K"];
//const bigWin = ["A"];

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const blue = "\x1b[34m";
const yellow = "\x1b[33m";
const pink = "\x1b[35m";
const orange = "\x1b[38;5;208m";


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

const printMachine = (spinnedNumbers, colors) => {
    for (let i = 0; i < machineSize; i++) {
        printBorderLine();
        
        for (let j = 0; j < machineSize; j++) {
            let index = i * machineSize + j;
            process.stdout.write("| " + colors[index] + spinnedNumbers[index] + reset + " ");
        }
        console.log("|");
    }
    printBorderLine();
}

const changeLineColor = (index, colors, color) => {
    for (let i = 0; i < machineSize; i++) {
        colors[index + i] = color;
    }
}

const checkLineWin = (spinnedNumbers, colors) => {
    let winnings = 0;
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
                // small symbol
                changeLineColor(i * machineSize, colors, green);
                winnings += 100;
            } else if (mediumWin.includes(spinnedNumbers[i * machineSize])) {
                // medium symbol
                changeLineColor(i * machineSize, colors, blue);
                winnings += 200;
            } else {
                // big symbol
                changeLineColor(i * machineSize, colors, red);
                winnings += 300;
            }
        }
    }
    return winnings;
}

const checkDiagonalWin = (spinnedNumbers) => {

    let diagonalWin = true;

    for (let i = 0; i < machineSize - 1; i++) {

        const index = i * machineSize + i;
        const j = i + 1;
        const next_index = j * machineSize + j;

        if (spinnedNumbers[index] != spinnedNumbers[next_index]) {
            diagonalWin = false;
            break;
        }
    }

    if (diagonalWin) {
        console.log("DIAGONAL WIN");
    }
}

const calculateWinnings = (spinnedNumbers, colors) => {

    let totalWin = 0;
    totalWin += checkLineWin(spinnedNumbers, colors);

    
    return totalWin;
}

const printWinningQuote = (winAmount) => {
    if (winAmount == 0) {
        return;
    }
    if (winAmount <= 100) {
        console.log(green + "small win" + reset);
    } else if (winAmount <= 200) {
        console.log(blue + "good win" + reset);
    } else if (winAmount <= 400) {
        console.log(red + "Big win!" + reset);
    } else if (winAmount <= 600) {
        console.log(orange + "HUGE win!" + reset);
    } else if (winAmount <= 900) {
        console.log(pink + "ENORMOUS WIN!!!" + reset);
    } else {
        console.log(yellow + "$$$ !JACKPOT! $$$" + reset);
    }
}

const spinMachine = () => {
    const spinnedNumbers = []
    for (let i = 0; i < Math.pow(machineSize, 2); i++) {
        spinnedNumbers.push(cards[randomNumber()]);  
    }

    let colors = Array.from({length: Math.pow(machineSize, 2)}, () => reset);

    let winAmount = calculateWinnings(spinnedNumbers, colors);
    printMachine(spinnedNumbers, colors);
    printWinningQuote(winAmount);

    checkDiagonalWin(spinnedNumbers);
}

let depositAmount = 100;
//const depositAmount = deposit();

spinMachine();
