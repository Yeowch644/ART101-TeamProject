let seconds = 0;

// Main timer in seconds
// This setInterval repeatedly runs every second
const myTimer = setInterval(() => {
    seconds + 1;

    // Stop the timer after 10 seconds
    if (seconds === 10) {
        clearInterval(myTimer);
        console.log("Timer stopped.");
    }
}, 1000);

let timeLeft = 30;

const timerDisplay = document.getElementById("timer");

const countdown = setInterval(() => {
    timeLeft--;

    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(countdown);

        alert("Game Over!");

        // You could redirect to your game over page:
        // window.location.href = "gameover.html";
    }
}, 1000);

let stress = 0;

setInterval(() => {
    stress += 2;
    document.getElementById("stressFill").style.width = stress + "%";
}, 1000);

let stress = 0;

const stressFill = document.getElementById("stressFill");

setInterval(() => {

    if (stress < 100) {
        stress += 5;
        stressFill.style.width = stress + "%";
    }

    if (stress >= 100) {
        alert("You are too stressed!");
    }

}, 1000);