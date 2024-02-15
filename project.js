
const prompt = require("prompt-sync")();

const machineSize = 3; // 3 -> 3x3 machine, 5 -> 5x5 machine. Min possible size 2 but for fun use at least 3x3.

const cards = ["A", "K", "Q", "7"];
const smallSymbols = ["K", "Q"];
const mediumSymbols = ["A"];
//const bigSymbols = ["7"];

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

const changeLineColor = (line, color) => {
    for (let i = 0; i < line.length; i++) {
        line[i] = color;
    }
}

const sameSymbolsInLine = (line) => {
    return line.every(element => element == line[0]);
}

const checkLineWin = (spinnedNumbers, colors) => {
    let winnings = 0;

    for (let i = 0; i < machineSize; i++) {
        if (sameSymbolsInLine(spinnedNumbers[i])) {
            
            if (smallSymbols.includes(spinnedNumbers[i][0])) {
                changeLineColor(colors[i], green);
                winnings += 100;
            }
            else if (mediumSymbols.includes(spinnedNumbers[i][0])) {
                changeLineColor(colors[i], blue);
                winnings += 200;
            }
            else {
                changeLineColor(colors[i], red);
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
        console.log(green + "small win" + white);
    } else if (winAmount <= 200) {
        console.log(blue + "good win" + white);
    } else if (winAmount <= 400) {
        console.log(red + "Big win!" + white);
    } else if (winAmount <= 600) {
        console.log(orange + "HUGE win!" + white);
    } else if (winAmount <= 900) {
        console.log(pink + "ENORMOUS WIN!!!" + white);
    } else {
        console.log(yellow + "$$$ !JACKPOT! $$$" + white);
    }
}

const spinMachine = () => {
    const spinnedNumbers = Array.from({ length: machineSize }, () =>
        Array.from({ length: machineSize }, () => cards[randomNumber()])
    );

    let colors = Array.from({ length: machineSize }, () =>
        Array.from({ length: machineSize }, () => white)
    );

    let winAmount = calculateWinnings(spinnedNumbers, colors);
    printMachine(spinnedNumbers, colors);
    printWinningQuote(winAmount);

    //checkDiagonalWin(spinnedNumbers);
}

let depositAmount = 100;
//const depositAmount = deposit();

spinMachine();
