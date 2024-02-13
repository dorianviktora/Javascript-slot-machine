
const prompt = require("prompt-sync")();

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
};

deposit();
