
const colors = require('./colors');
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

const printMachine = (spinnedNumbers, colorArray) => {
    for (let i = 0; i < machineSize; i++) {
        printBorderLine();
        
        for (let j = 0; j < machineSize; j++) {
            process.stdout.write("| " + colorArray[i][j] + spinnedNumbers[i][j] + colors.white + " ");
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
    let color = colors.white;

    if (sameSymbolsInLine(line)) {

        if (smallSymbols.includes(line[0])) {
            winAmount += 100;
            color = colors.green;
        }
        else if (mediumSymbols.includes(line[0])) {
            winAmount += 200;
            color = colors.blue;
        }
        else if (bigSymbols.includes(line[0])) {
            winAmount += 300;
            color = colors.red;
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

const createPaylines = (spinnedNumbers, colorArray) => {

    let totalWin = 0;

    // row paylines
    for (let i = 0; i < machineSize; i++) {
        const result = checkPaylineWin(spinnedNumbers[i]);
        totalWin += result.winAmount;
        changeRowColor(colorArray[i], result.color);
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
            colorArray[i][i] = mainDiagonalRes.color;
        }
        if (antiDiagonalRes.winAmount != 0) {
            colorArray[machineSize - i - 1][i] = antiDiagonalRes.color;
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
        process.stdout.write(colors.green + "small win");
    } else if (winAmount <= 200) {
        process.stdout.write(colors.blue + "good win");
    } else if (winAmount <= 400) {
        process.stdout.write(colors.red + "Big win!");
    } else if (winAmount <= 600) {
        process.stdout.write(colors.orange + "HUGE win!");
    } else if (winAmount <= 900) {
        process.stdout.write(colors.pink + "ASTRONOMICAL WIN!!!");
    } else {
        process.stdout.write(colors.yellow + "$$$ !!!JACKPOT!!! $$$");
    }
    console.log(" " + winAmount + colors.white);
}

const spinMachine = () => {
    const spinnedNumbers = Array.from({ length: machineSize }, () =>
        Array.from({ length: machineSize }, () => cards[randomNumber()])
    );

    let colorArray = Array.from({ length: machineSize }, () =>
        Array.from({ length: machineSize }, () => colors.white)
    );

    let winAmount = createPaylines(spinnedNumbers, colorArray);
    printMachine(spinnedNumbers, colorArray);
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
