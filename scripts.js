const words = [
  { word: "javascript", clue: "A programming language for the web" },
  { word: "developer", clue: "A person who writes software" },
  { word: "hangman", clue: "A word-guessing game" },
  { word: "satvik", clue: "Who is the developer of this game" },
];

let selectedWord,
  clue,
  guessedWord,
  wrongGuesses,
  timer,
  timeLeft,
  highScore = 0;

function newGame() {
  let data = words[Math.floor(Math.random() * words.length)];
  selectedWord = data.word;
  clue = data.clue;
  guessedWord = Array(selectedWord.length).fill("_");
  wrongGuesses = 0;
  document.getElementById("clue").innerHTML =
    "Clue: <button onclick='showClue()'>Reveal Clue</button>";
  document.getElementById("wordDisplay").textContent = guessedWord.join(" ");
  document.getElementById("wrongGuesses").textContent = wrongGuesses;
  document.getElementById("popup").style.display = "none";
  createKeyboard();
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = document.getElementById("timeSelect").value;
  document.getElementById("timer").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) endGame("Game Over! Time ran out.");
  }, 1000);
}

function createKeyboard() {
  let keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  for (let char of "abcdefghijklmnopqrstuvwxyz") {
    let button = document.createElement("button");
    button.textContent = char;
    button.onclick = () => guessLetter(char);
    keyboard.appendChild(button);
  }
}

function guessLetter(letter) {
  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) guessedWord[i] = letter;
    }
  } else {
    wrongGuesses++;
  }
  document.getElementById("wordDisplay").textContent = guessedWord.join(" ");
  document.getElementById("wrongGuesses").textContent = wrongGuesses;
  checkGameStatus();
}

function checkGameStatus() {
  if (!guessedWord.includes("_")) {
    highScore += 10;
    document.getElementById("highScore").textContent = highScore;
    endGame("You Win!", true);
  } else if (wrongGuesses >= 6) {
    endGame("You Lose! The word was " + selectedWord);
  }
}

function endGame(message, won = false) {
  clearInterval(timer);
  let popup = document.getElementById("popup");
  popup.innerHTML = `<p>${message}</p><button onclick='newGame()'>${
    won ? "Next" : "New Game"
  }</button>`;
  popup.style.display = "block";
}

function revealAnswer() {
  clearInterval(timer);
  document.getElementById("wordDisplay").textContent = selectedWord
    .split(" ")
    .join(" ");
}

function showClue() {
  document.getElementById("clue").textContent = "Clue: " + clue;
}

function changeTimer() {
  clearInterval(timer);
  startTimer();
}

function resetGame() {
  highScore = 0;
  document.getElementById("highScore").textContent = highScore;
  newGame();
}

newGame();

// toggle slider dark-light
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

//side menu bar 
function toggleMenu() {
  const navbar = document.getElementById("sidemenu");

  if (navbar.classList.contains("active")) {
    navbar.style.width = "0";
    setTimeout(() => {
      navbar.classList.remove("active");
    }, 400);
  } else {
    navbar.classList.add("active");
    navbar.style.width = "30%";
  }
}

//menu bar  
function toggleSettings() {
  document.getElementById("settingsPanel").classList.toggle("active");
}