const quotes = {
  easy: [
    "The sun is bright.",
    "I love typing fast.",
    "Hello world."
  ],
  medium: [
    "Typing is a valuable skill for everyone.",
    "Coding challenges can improve your logical thinking.",
    "Practice makes perfect in almost everything."
  ],
  hard: [
    "JavaScript asynchronous behavior can confuse beginners at first glance.",
    "Typing tests with live metrics help you improve focus and consistency.",
    "In cryptography, entropy measures the randomness of data used in algorithms."
  ]
};

let currentQuote = '';
let difficulty = 'easy';
let timeLimit = 60;
let startTime;
let timerInterval;
let scoreHistory = [];
let totalTypedWords = 0;
let totalTypedChars = 0;
let totalCorrectChars = 0;

const quoteElement = document.getElementById('quote');
const inputArea = document.getElementById('inputArea');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const accuracyElement = document.getElementById('accuracy');
const historyList = document.getElementById('historyList');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const difficultySelect = document.getElementById('difficulty');
const timeSelect = document.getElementById('timeLimit');

startButton.addEventListener('click', startTest);
restartButton.addEventListener('click', startTest);

function startTest() {
  quoteElement.innerHTML = '';
  inputArea.disabled = false;
  inputArea.value = '';
  inputArea.focus();
  scoreHistory = [];
  totalTypedWords = 0;
  totalTypedChars = 0;
  totalCorrectChars = 0;

  difficulty = difficultySelect.value;
  timeLimit = parseInt(timeSelect.value) * 60;
  startTime = Date.now();
  loadNewQuote();
  updateQuoteHighlight();
  restartButton.style.display = 'none';

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerElement.textContent = elapsed;

  if (elapsed >= timeLimit) {
    clearInterval(timerInterval);
    inputArea.disabled = true;
    calculateResult();
    restartButton.style.display = 'inline';
  } else {
    calculateLiveStats();
  }
}

function loadNewQuote() {
  const list = quotes[difficulty];
  currentQuote = list[Math.floor(Math.random() * list.length)];
  quoteElement.textContent = currentQuote;
  updateQuoteHighlight();
}

inputArea.addEventListener('input', () => {
  updateQuoteHighlight();

  const typed = inputArea.value.trim();
  const target = currentQuote.trim();

  if (typed === target) {
    totalTypedWords += typed.split(/\s+/).length;
    totalTypedChars += typed.length;
    totalCorrectChars += [...typed].filter((ch, i) => ch === target[i]).length;

    inputArea.value = '';
    loadNewQuote();
  }
});

function calculateLiveStats() {
  const elapsedMin = (Date.now() - startTime) / 60000;
  const wpm = Math.round(totalTypedWords / elapsedMin);
  const accuracy = totalTypedChars > 0
    ? Math.round((totalCorrectChars / totalTypedChars) * 100)
    : 100;

  speedElement.textContent = isFinite(wpm) ? wpm : 0;
  accuracyElement.textContent = accuracy;
}

function calculateResult() {
  calculateLiveStats();
  const entry = `Speed: ${speedElement.textContent} WPM | Accuracy: ${accuracyElement.textContent}% | Level: ${difficulty}`;
  scoreHistory.unshift(entry);
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = '';
  scoreHistory.slice(0, 5).forEach(score => {
    const li = document.createElement('li');
    li.textContent = score;
    historyList.appendChild(li);
  });
}

function updateQuoteHighlight() {
  const typed = inputArea.value;
  let result = '';
  for (let i = 0; i < currentQuote.length; i++) {
    if (i < typed.length) {
      result += `<span class="${typed[i] === currentQuote[i] ? 'correct' : 'incorrect'}">${currentQuote[i]}</span>`;
    } else {
      result += currentQuote[i];
    }
  }
  quoteElement.innerHTML = result;
}
