let seconds = 0;

// Runs every 1 second (1000ms)
const myTimer = setInterval(() => {
    seconds++;
    console.log(`Timer: ${seconds} seconds`);

    // Stop the timer after 10 seconds
    if (seconds === 10) {
        clearInterval(myTimer);
        console.log("Timer stopped.");
    }
}, 1000);
