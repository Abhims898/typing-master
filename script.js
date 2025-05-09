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

let quoteIndex = 0;
let difficulty = 'easy';
let currentQuote = '';
let timeLimit = 60;
let startTime;
let timerInterval;
let scoreHistory = [];

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
  // Reset state
  quoteIndex = 0;
  difficulty = difficultySelect.value;
  timeLimit = parseInt(timeSelect.value) * 60;
  inputArea.disabled = false;
  inputArea.value = '';
  inputArea.focus();
  startTime = Date.now();
  currentQuote = getRandomQuote();
  quoteElement.textContent = currentQuote;
  updateQuoteHighlight();
  timerElement.textContent = '0';
  speedElement.textContent = '0';
  accuracyElement.textContent = '100';
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

function getRandomQuote() {
  const list = quotes[difficulty];
  return list[Math.floor(Math.random() * list.length)];
}

inputArea.addEventListener('input', () => {
  updateQuoteHighlight();
  if (inputArea.value.trim() === currentQuote.trim()) {
    inputArea.value = '';
    currentQuote = getRandomQuote();
    quoteElement.textContent = currentQuote;
    updateQuoteHighlight();
  }
});

function calculateLiveStats() {
  const text = inputArea.value.trim();
  const wordCount = text.length > 0 ? text.split(/\s+/).length : 0;
  const elapsedMin = (Date.now() - startTime) / 60000;
  const wpm = Math.round(wordCount / elapsedMin);
  speedElement.textContent = isFinite(wpm) ? wpm : 0;

  const correctChars = [...text].filter((char, idx) => char === currentQuote[idx]).length;
  const accuracy = text.length > 0 ? Math.round((correctChars / text.length) * 100) : 100;
  accuracyElement.textContent = accuracy;
}

function calculateResult() {
  const finalSpeed = speedElement.textContent;
  const finalAccuracy = accuracyElement.textContent;
  const entry = `Speed: ${finalSpeed} WPM | Accuracy: ${finalAccuracy}% | Level: ${difficulty}`;
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
