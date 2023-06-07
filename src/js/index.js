const soil = document.querySelectorAll(".soil");
const mole = document.querySelectorAll(".mole");
const board = document.querySelector(".score");
const container = document.querySelector(".container");
const gameOverBoard = document.querySelector(".gameOver");

const audio = new Audio("./src/audio/Banana-Cat-Crying-Meme.MP3");
const audio2 = new Audio("./src/audio/Happy Happy - Cat Meme Song.mp3");

let showBefore;
let gameOver;
let score;

let minLvl = 1000;
let maxLvl = 1500;
let gameTimer = 10000;

function randomMole(soil) {
  let i = Math.floor(Math.random() * soil.length);
  const nSoil = soil[i];
  if (nSoil == showBefore) {
    randomMole(soil);
  }
  showBefore = nSoil;
  return nSoil;
}

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function showMole() {
  const sRandom = randomMole(soil);
  const nRandom = randomNumber(minLvl, maxLvl);
  sRandom.classList.add("show");

  setTimeout(() => {
    sRandom.classList.remove("show");
    // audio.pause();
    // audio.currentTime = 1;
    if (!gameOver) {
      showMole();
    }
  }, nRandom);
}

function start() {
  gameOver = false;
  score = 0;
  board.textContent = 0;
  container.style.display = "flex";
  gameOverBoard.style.display = "none";
  audio2.pause();

  showMole();
  setTimeout(() => {
    gameOver = true;
    container.style.display = "none";
    gameOverBoard.style.display = "block";
    audio2.play();
    audio2.volume = 0.4;
  }, gameTimer);
}

function whack() {
  const moleImg = this.style.backgroundImage;
  if (!moleImg.includes("banana_cat_cry")) {
    score++;
    board.textContent = score;
    audio.play();
  }
  this.style.backgroundImage = "url(./src/img/banana_cat_cry.png)";
  setTimeout(() => {
    this.style.backgroundImage = "url(./src/img/banana_cat.png)";
    this.parentNode.classList.remove("show");
  }, minLvl);
}

mole.forEach((m) => {
  m.addEventListener("click", whack);
});
