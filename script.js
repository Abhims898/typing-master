let startTime;
let typingStarted = false;
let timerInterval;

const quoteElement = document.getElementById('quote');
const inputArea = document.getElementById('inputArea');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');

inputArea.addEventListener('input', () => {
    if (!typingStarted) {
        typingStarted = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    const typedText = inputArea.value;
    const quoteText = quoteElement.textContent;

    if (typedText === quoteText) {
        clearInterval(timerInterval);
        calculateSpeed();
    }
});

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = elapsedTime;
}

function calculateSpeed() {
    const elapsedTime = (Date.now() - startTime) / 60000; // convert to minutes
    const wordCount = inputArea.value.split(' ').length;
    const speed = Math.round(wordCount / elapsedTime);
    speedElement.textContent = speed;
}
