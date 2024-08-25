const readline = require('readline');

let humanScore = 0;
let computerScore = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      console.log('Tie!');
    } else if ((humanChoice === 1 && computerChoice === 2) || (humanChoice === 2 && computerChoice === 3) || (humanChoice === 3 && computerChoice === 1)) {
      console.log('You Win!');
      humanScore++;
    } else {
      console.log('You Lose!');
      computerScore++;
    }
    console.log(`Scores are: You) ${humanScore}, Computer) ${computerScore}`);
  }
  async function playGame() {
    for (let i = 0; i < 5; i++) {
      let attempts = 0;
      let humanChoice;
      while (true) {
        try {
          await new Promise(resolve => {
            rl.question('1) Rock. 2) Paper. 3) Scissors: ', choice => {
              humanChoice = parseInt(choice);
              if (isNaN(humanChoice) || humanChoice < 1 || humanChoice > 3) {
                console.log('Invalid choice, please select 1, 2, or 3.');
                attempts++;
                if (attempts > 2) {
                  console.log('Too many invalid attempts. Exiting game.');
                  rl.close();
                  process.exit();
                }
              } else {
                resolve();
              }
            });
          });
          break;
        } catch (error) {
            console.log('An error occurred:', error);
          }
        }
        const computerChoice = Math.floor(Math.random() * 3) + 1;
        playRound(humanChoice, computerChoice);
      }
      rl.close();
      console.log('--------------------------------------------------')
      if (humanScore > computerScore) {
        console.log(`You beat the computer! :D`);
      } else if (humanScore < computerScore) {
        console.log(`The computer beat you. :(`);
      } else {
        console.log(`It's a tie!`);
      }
      console.log(`Final Scores: You - ${humanScore}, Computer - ${computerScore}`);
    }
    
    playGame();
        