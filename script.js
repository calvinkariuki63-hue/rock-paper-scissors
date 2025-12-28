const startBtn = document.getElementById("startBtn");
const playerNameInput = document.getElementById("playerName");
const difficultySelect = document.getElementById("difficulty");
const scoreboard = document.querySelector(".scoreboard");
const arena = document.querySelector(".arena");
const choices = document.querySelector(".choices");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultText = document.getElementById("resultText");
const streakText = document.getElementById("streakText");
const playerPick = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");
const resetBtn = document.getElementById("resetBtn");
const playerLabel = document.getElementById("playerLabel");

const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupBtn = document.getElementById("popupBtn");

const soundWin = document.getElementById("soundWin");
const soundLose = document.getElementById("soundLose");
const soundTie = document.getElementById("soundTie");

const icons = { rock:"rock.png", paper:"paper.png", scissors:"scissors.png" };
const options = ["rock","paper","scissors"];

let playerScore = 0;
let computerScore = 0;
let streak = 0;
let gameOver = false;
let difficulty = "easy";

startBtn.onclick = () => {
  playerLabel.textContent = playerNameInput.value || "Player";
  difficulty = difficultySelect.value;
  document.querySelector(".setup").classList.add("hidden");
  scoreboard.classList.remove("hidden");
  arena.classList.remove("hidden");
  choices.classList.remove("hidden");
  resultText.classList.remove("hidden");
};

document.querySelectorAll(".choice").forEach(btn=>{
  btn.onclick = () => {
    if(gameOver) return;
    playRound(btn.dataset.choice);
  };
});

function playRound(player) {
  let computer = options[Math.floor(Math.random()*3)];
  if(difficulty==="hard") computer = counter(player);

  playerPick.src = icons[player];
  computerPick.src = icons[computer];

  if(player === computer){
    showPopup("🤝 Tie Round", "Try again!");
    soundTie.play();
    return;
  }

  const win =
    (player==="rock" && computer==="scissors") ||
    (player==="paper" && computer==="rock") ||
    (player==="scissors" && computer==="paper");

  if(win){
    playerScore++;
    streak++;
    soundWin.play();
    showPopup("🎉 You Win!", `Streak: ${streak}`);
  } else {
    computerScore++;
    streak = 0;
    soundLose.play();
    showPopup("💥 You Lose!", "Computer got you");
  }

  updateScores();

  if(playerScore >= 5 || computerScore >= 5){
    gameOver = true;
    showPopup(
      playerScore > computerScore ? "🏆 Game Won!" : "🤖 Game Over",
      "Tap Play Again to restart",
      true
    );
  }
}

function updateScores(){
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function showPopup(title, message, end=false){
  overlay.classList.remove("hidden");
  popup.classList.remove("hidden");
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popupBtn.textContent = end ? "Play Again" : "Continue";

  popupBtn.onclick = () => {
    overlay.classList.add("hidden");
    popup.classList.add("hidden");
    if(end) resetGame();
  };
}

function resetGame(){
  playerScore = computerScore = streak = 0;
  gameOver = false;
  updateScores();
  resultText.textContent = "Choose your weapon";
}

function counter(p){
  if(p==="rock") return "paper";
  if(p==="paper") return "scissors";
  return "rock";
}
