
const colors = require('./colors');

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

module.exports = printWinningQuote;
