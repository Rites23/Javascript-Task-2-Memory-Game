const cardsArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cardValues = [...cardsArray, ...cardsArray]; 
let flippedCards = [];
let matchedCards = 0;
let time = 0;
let gameTimer;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const board = document.querySelector(".game-board");
  shuffledCards = shuffle(cardValues);
  board.innerHTML = "";

  shuffledCards.forEach((value, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", index);

    const front = document.createElement("div");
    front.classList.add("front");
    card.appendChild(front);

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = value;
    card.appendChild(back);

    card.addEventListener("click", () => flipCard(card, value, index));
    board.appendChild(card);
  });
}

function flipCard(card, value, index) {
  if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCards.push({ card, value, index });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.value === secondCard.value) {
    matchedCards += 2;
    if (matchedCards === 16) {
      clearInterval(gameTimer);
      document.getElementById("endMessage").style.display = "block";
    }
    flippedCards = [];
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove("flipped");
      secondCard.card.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  gameTimer = setInterval(() => {
    time++;
    document.getElementById("time").textContent = time;
  }, 1000);
}

function restartGame() {
  matchedCards = 0;
  flippedCards = [];
  time = 0;
  document.getElementById("time").textContent = time;
  document.getElementById("endMessage").style.display = "none";
  createBoard();
  startTimer();
}

createBoard();
startTimer();
