const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameInterval;
let dropInterval;
let gameRunning = false;

// Messages
const winMessages = [
    "Amazing job! You saved so much water! 💧",
    "You're a hydration hero!",
    "Incredible! Clean water champion!",
    "You crushed it! পানি for everyone!"
];

const loseMessages = [
    "Good try! Give it another shot!",
    "Almost there! Keep going!",
    "You can do better next time!",
    "Don't give up! Try again!"
];

// Start Game
startBtn.addEventListener("click", startGame);

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    gameContainer.innerHTML = "";

    // Spawn drops
    dropInterval = setInterval(createDrop, 800);

    // Timer countdown
    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}
const resetBtn = document.getElementById("reset-btn");
function resetGame() {
    // Stop game loops
    clearInterval(gameInterval);
    clearInterval(dropInterval);

    // Reset values
    score = 0;
    timeLeft = 30;
    gameRunning = false;

    // Update UI
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    // Clear drops + messages
    gameContainer.innerHTML = "";
}
resetBtn.addEventListener("click", resetGame);

// Create Drops
function createDrop() {
    const drop = document.createElement("div");
    drop.classList.add("water-drop");

    // Random position
    drop.style.left = Math.random() * (gameContainer.clientWidth - 60) + "px";

    // Random size
    const size = Math.random() * 30 + 40;
    drop.style.width = size + "px";
    drop.style.height = size + "px";

    // Random fall duration
    const duration = Math.random() * 2 + 2;
    drop.style.animationDuration = duration + "s";

    // Random chance of bad drop
    const isBad = Math.random() < 0.2;
    if (isBad) {
        drop.classList.add("bad-drop");
    }

    // Click event
    drop.addEventListener("click", () => {
        if (!gameRunning) return;

        if (isBad) {
            score -= 1;
        } else {
            score += 1;
        }

        scoreDisplay.textContent = score;
        drop.remove();
        drop.addEventListener("click", () => {
  score++;
  document.getElementById("score").textContent = score;

  checkMilestones(); 

  drop.remove();
});
    });

    // Remove after falling
    setTimeout(() => {
        drop.remove();
    }, duration * 1000);

    gameContainer.appendChild(drop);
}

// End Game
function endGame() {
    gameRunning = false;

    clearInterval(gameInterval);
    clearInterval(dropInterval);

    // Remove remaining drops
    gameContainer.innerHTML = "";

    let message;
    if (score >= 20) {
        message = winMessages[Math.floor(Math.random() * winMessages.length)];
    } else {
        message = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    }

    const endMessage = document.createElement("div");
    endMessage.style.position = "absolute";
    endMessage.style.top = "50%";
    endMessage.style.left = "50%";
    endMessage.style.transform = "translate(-50%, -50%)";
    endMessage.style.fontSize = "28px";
    endMessage.style.fontWeight = "bold";
    endMessage.style.textAlign = "center";
    endMessage.textContent = message;

    gameContainer.appendChild(endMessage);
let goal = 10;
let dropSpeed = 2000;

function setDifficulty(level) {
  if (level === "easy") {
    goal = 10;
    dropSpeed = 2000;
  } 
  else if (level === "normal") {
    goal = 20;
    dropSpeed = 1200;
  } 
  else if (level === "hard") {
    goal = 30;
    dropSpeed = 700;
  }

  document.getElementById("goal").textContent = "Goal: " + goal + " drops";
}
const milestones = [
  { score: 5, message: "Great start!" },
  { score: 10, message: "Halfway there!" },
  { score: 15, message: "You're doing amazing!" },
  { score: 20, message: "Almost there!" },
  { score: 25, message: "Water hero!" }
];
function checkMilestones() {
  milestones.forEach(milestone => {
    if (score === milestone.score) {
      document.getElementById("milestone-message").textContent = milestone.message;
    }
  });
}

}