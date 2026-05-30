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
