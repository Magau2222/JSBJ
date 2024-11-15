const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout});
const JsBj = () => {
    const deck = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    const playerHand = [];
    const dealerHand = [];
    const dealCard = (hand) => {
        const cardIndex = Math.floor(Math.random() * deck.length);
        hand.push(deck[cardIndex]);
    };
    const calculateScore = (hand) => {
        let sum = hand.reduce((a, b) => a + b, 0);
        let acesCount = hand.filter(card => card === 11).length;

        while (sum > 21 && acesCount) {
            sum -= 10;
            acesCount--;
        }
        return sum;
    };
    dealCard(playerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(dealerHand);
    console.log(`Your hand: ${playerHand} (Score: ${calculateScore(playerHand)})`);
    console.log(`Dealer shows: ${dealerHand[0]} and a hidden card`);
    const playerTurn = () => {
        rl.question("Do you want to hit (h) or stand (s)? ", (action) => {
            if (action.toLowerCase() === 'h') {
                dealCard(playerHand);
                console.log(`Your hand: ${playerHand} (Score: ${calculateScore(playerHand)})`);
                if (calculateScore(playerHand) > 21) {
                    console.log("You bust! Dealer wins.");
                    rl.close();
                } else {
                    playerTurn();
                }
            } else if (action.toLowerCase() === 's') {
                dealerTurn();
            } else {
                console.log("Invalid input. Please enter 'h' or 's'.");
                playerTurn();
            }});};
    const dealerTurn = () => {
        while (calculateScore(dealerHand) < 17) {
            dealCard(dealerHand);
        }
        console.log(`Dealer's hand: ${dealerHand} (Score: ${calculateScore(dealerHand)})`);
        const playerScore = calculateScore(playerHand);
        const dealerScore = calculateScore(dealerHand);
        if (dealerScore > 21 || playerScore > dealerScore) {
            console.log("You win!");
        } else if (playerScore < dealerScore) {
            console.log("Dealer wins!");
        } else {
            console.log("It's a tie!");
        }
        rl.close();
    };
    playerTurn();
};
JsBj();