
const prompt = require("prompt-sync")();
const readlineSync = require('readline-sync');

/* Feel free to change slot machine size and
 * cards. If you change machine cards, remember you
 * need to adjust symbols too.  */

const machineSize = 3; // 3 -> 3x3 machine, 5 -> 5x5 machine. Minimum size 2.

const cards = ["A", "K", "Q", "7"];
const smallSymbols = ["K", "Q"];
const mediumSymbols = ["A"];
const bigSymbols = ["7"];

const white = "\x1b[0m";
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
    return Math.floor(Math.random() * (cards.length));
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
            process.stdout.write("| " + colors[i][j] + spinnedNumbers[i][j] + white + " ");
        }
        console.log("|");
    }
    printBorderLine();
}

const sameSymbolsInLine = (line) => {
    return line.every(element => element == line[0]);
}

const checkPaylineWin = (line) => {
    let winAmount = 0;
    let color = white;

    if (sameSymbolsInLine(line)) {

        if (smallSymbols.includes(line[0])) {
            winAmount += 100;
            color = green;
        }
        else if (mediumSymbols.includes(line[0])) {
            winAmount += 200;
            color = blue;
        }
        else if (bigSymbols.includes(line[0])) {
            winAmount += 300;
            color = red;
        }
    }
    return {
        winAmount: winAmount,
        color: color
    };
}

const changeRowColor = (row, color) => {
    for (let i = 0; i < machineSize; i++) {
        row[i] = color;
    }
}

const createPaylines = (spinnedNumbers, colors) => {

    let totalWin = 0;

    // row paylines
    for (let i = 0; i < machineSize; i++) {
        const result = checkPaylineWin(spinnedNumbers[i]);
        totalWin += result.winAmount;
        changeRowColor(colors[i], result.color);
    }

    // diagonal paylines
    const mainDiagonal = [];
    const antiDiagonal = [];

    for (let i = 0; i < machineSize; i++) {
        mainDiagonal.push(spinnedNumbers[i][i]);
        antiDiagonal.push(spinnedNumbers[machineSize - i - 1][i]);
    }

    const mainDiagonalRes = checkPaylineWin(mainDiagonal);
    const antiDiagonalRes = checkPaylineWin(antiDiagonal);

    for (let i = 0; i < machineSize; i++) {
        if (mainDiagonalRes.winAmount != 0) {
            colors[i][i] = mainDiagonalRes.color;
        }
        if (antiDiagonalRes.winAmount != 0) {
            colors[machineSize - i - 1][i] = antiDiagonalRes.color;
        }
    }

    totalWin += mainDiagonalRes.winAmount + antiDiagonalRes.winAmount;

    return totalWin;
}

const printWinningQuote = (winAmount) => {
    if (winAmount == 0) {
        return;
    }
    if (winAmount <= 100) {
        process.stdout.write(green + "small win");
    } else if (winAmount <= 200) {
        process.stdout.write(blue + "good win");
    } else if (winAmount <= 400) {
        process.stdout.write(red + "Big win!");
    } else if (winAmount <= 600) {
        process.stdout.write(orange + "HUGE win!");
    } else if (winAmount <= 900) {
        process.stdout.write(pink + "ASTRONOMICAL WIN!!!");
    } else {
        process.stdout.write(yellow + "$$$ !!!JACKPOT!!! $$$");
    }
    console.log(" " + winAmount + white);
}

const spinMachine = () => {
    const spinnedNumbers = Array.from({ length: machineSize }, () =>
        Array.from({ length: machineSize }, () => cards[randomNumber()])
    );

    let colors = Array.from({ length: machineSize }, () =>
        Array.from({ length: machineSize }, () => white)
    );

    let winAmount = createPaylines(spinnedNumbers, colors);
    printMachine(spinnedNumbers, colors);
    printWinningQuote(winAmount);

    cashAmount += winAmount - betAmount
    console.log("Remaining cash: " + cashAmount);
}

let cashAmount = deposit();
let betAmount = 50;

while (true) {
    const space = readlineSync.keyIn("Press 'space' to spin the machine!");
    if (space == ' ') {
        spinMachine();
    }
    if (space != ' ') {
        return;
    }
}
