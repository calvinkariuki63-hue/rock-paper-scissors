// Elements
const startBtn = document.getElementById("startBtn");
const playerNameInput = document.getElementById("playerName");
const difficultySelect = document.getElementById("difficulty");
const scoreboard = document.querySelector(".scoreboard");
const arena = document.querySelector(".arena");
const choicesContainer = document.querySelector(".choices");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const resultText = document.getElementById("resultText");
const streakText = document.getElementById("streakText");
const playerPickEl = document.getElementById("playerPick");
const computerPickEl = document.getElementById("computerPick");
const resetBtn = document.getElementById("resetBtn");
const playerLabel = document.getElementById("playerLabel");

// Sounds
const soundWin = document.getElementById("soundWin");
const soundLose = document.getElementById("soundLose");
const soundTie = document.getElementById("soundTie");
const soundClick = document.getElementById("soundClick");

const options = ["rock", "paper", "scissors"];
const iconMap = { rock:"rock.png", paper:"paper.png", scissors:"scissors.png" };

let playerScore = 0, computerScore = 0, streak = 0, gameOver=false, difficulty="easy";

// Start game
startBtn.addEventListener("click", () => {
  let name = playerNameInput.value.trim() || "Player";
  playerLabel.textContent = name;
  difficulty = difficultySelect.value;
  scoreboard.classList.remove("hidden");
  arena.classList.remove("hidden");
  choicesContainer.classList.remove("hidden");
  resultText.classList.remove("hidden");
  startBtn.parentElement.classList.add("hidden");
});

// Choices
document.querySelectorAll(".choice").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    if(gameOver) return;
    playRound(btn.dataset.choice);
    soundClick.play();
    if(navigator.vibrate) navigator.vibrate(100);
  });
});

// Game logic
function playRound(playerChoice){
  let computerChoice = randomChoice();
  // Difficulty cheat
  if(difficulty==="medium" && Math.random()<0.3) computerChoice = cheatChoice(playerChoice);
  if(difficulty==="hard" && Math.random()<0.6) computerChoice = cheatChoice(playerChoice);

  playerPickEl.src = iconMap[playerChoice];
  computerPickEl.src = iconMap[computerChoice];
  playerPickEl.style.transform = "scale(1.2)";
  computerPickEl.style.transform = "scale(1.2)";
  setTimeout(()=>{playerPickEl.style.transform="scale(1)"; computerPickEl.style.transform="scale(1)";},200);

  if(playerChoice===computerChoice){
    resultText.textContent="Tie round";
    streak=0;
    streakText.classList.add("hidden");
    soundTie.play();
    return;
  }

  const win = (playerChoice==="rock" && computerChoice==="scissors") ||
              (playerChoice==="paper" && computerChoice==="rock") ||
              (playerChoice==="scissors" && computerChoice==="paper");

  if(win){
    playerScore++; streak++;
    resultText.textContent="You win this round";
    streakText.textContent = streak>1? `🔥 Streak: ${streak}`:""; streakText.classList.toggle("hidden", streak<2);
    soundWin.play();
  }else{
    computerScore++; streak=0;
    resultText.textContent="Bot wins this round";
    streakText.classList.add("hidden");
    soundLose.play();
  }

  updateScores();
  checkWinner();
}

function updateScores(){
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function checkWinner(){
  if(playerScore>=5 || computerScore>=5){
    gameOver=true; resetBtn.classList.remove("hidden");
    resultText.textContent = playerScore>=5 ? "🏆 You won the match!" : "🤖 Computer wins the match";
  }
}

function randomChoice(){ return options[Math.floor(Math.random()*3)]; }
function cheatChoice(player){ 
  if(player==="rock") return "paper";
  if(player==="paper") return "scissors";
  return "rock";
}

// Reset
resetBtn.addEventListener("click", ()=>{
  playerScore=0; computerScore=0; streak=0; gameOver=false;
  updateScores();
  playerPickEl.src = iconMap.rock; computerPickEl.src = iconMap.rock;
  resultText.textContent="Choose your weapon";
  streakText.classList.add("hidden");
  resetBtn.classList.add("hidden");
});
