const choices = document.querySelectorAll(".choice");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultText = document.getElementById("resultText");
const playerPickEl = document.getElementById("playerPick");
const computerPickEl = document.getElementById("computerPick");
const resetBtn = document.getElementById("resetBtn");

const options = ["rock", "paper", "scissors"];
const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

choices.forEach(btn => {
  btn.addEventListener("click", () => {
    if (gameOver) return;

    const playerChoice = btn.dataset.choice;
    const computerChoice = options[Math.floor(Math.random() * options.length)];

    animatePicks(playerChoice, computerChoice);
    evaluateRound(playerChoice, computerChoice);
  });
});

function animatePicks(player, computer) {
  playerPickEl.textContent = emojiMap[player];
  computerPickEl.textContent = emojiMap[computer];

  playerPickEl.style.transform = "scale(1.2)";
  computerPickEl.style.transform = "scale(1.2)";

  setTimeout(() => {
    playerPickEl.style.transform = "scale(1)";
    computerPickEl.style.transform = "scale(1)";
  }, 200);
}

function evaluateRound(player, computer) {
  if (player === computer) {
    resultText.textContent = "Tie round";
    return;
  }

  const win =
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper");

  if (win) {
    playerScore++;
    resultText.textContent = "You win this round";
  } else {
    computerScore++;
    resultText.textContent = "Bot wins this round";
  }

  updateScores();
  checkWinner();
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    gameOver = true;
    resetBtn.classList.remove("hidden");

    resultText.textContent =
      playerScore === 5 ? "🏆 You won the match!" : "🤖 Bot wins the match";
  }
}

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;

  playerPickEl.textContent = "❔";
  computerPickEl.textContent = "❔";
  resultText.textContent = "Choose your weapon";

  updateScores();
  resetBtn.classList.add("hidden");
});
