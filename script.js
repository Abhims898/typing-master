let startTime;
let typingStarted = false;
let timerInterval;
let timeLimit;
let sampleText = '';
let quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "In the middle of difficulty lies opportunity.",
    "Success is not the key to happiness. Happiness is the key to success."
];

const quoteElement = document.getElementById('quote');
const inputArea = document.getElementById('inputArea');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const startButton = document.getElementById('startButton');
const timeLimitSelect = document.getElementById('timeLimit');

startButton.addEventListener('click', startTest);

function startTest() {
    // Get the selected time limit in minutes and convert to seconds
    timeLimit = parseInt(timeLimitSelect.value) * 60; // Convert minutes to seconds
    typingStarted = false;
    
    // Get a random quote from the array
    sampleText = getRandomQuote();
    quoteElement.textContent = sampleText;
    
    // Enable the input area and start the timer
    inputArea.disabled = false;
    inputArea.value = '';
    inputArea.focus();
    
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    
    // Reset result display
    timerElement.textContent = '0';
    speedElement.textContent = '0';
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    if (elapsedTime >= timeLimit) {
        clearInterval(timerInterval);
        calculateSpeed();
        inputArea.disabled = true;
        alert("Time's up!");
    }
    timerElement.textContent = elapsedTime;
}

function calculateSpeed() {
    const elapsedTimeInMinutes = (Date.now() - startTime) / 60000; // Convert to minutes
    const typedText = inputArea.value.trim();
    const wordCount = typedText.split(' ').length;
    const speed = Math.round(wordCount / elapsedTimeInMinutes);
    speedElement.textContent = speed;
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
