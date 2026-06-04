let seconds = 0;
let events = 0;
let steeringPrompt = false;
let stickPrompt = false;
let leftPrompt = true;
let rightPrompt = false;
let glovePrompt = false;

function continueEvents(event){
    events = events + 1;
    if (events == 1) {
        $("#prompt").html("There are no cars behind you on this long, winding road. <br>Adjust your right mirror, just in case.");
        rightPrompt = true;
    }
    if (events == 2) {
        $("#prompt").html("There is a turn incoming up ahead. <br>Shift gears with your stick shift as you approach the turn.");
        stickPrompt = true;
    }
    if (events == 3) {
        $("#prompt").html("You shifted back into gear just as you reach the turn. <br>Turn the wheel.");
        steeringPrompt = true;
    }
    if (events == 4) {
        $("#prompt").html("You smoothly make the turn. There is nothing ahead the straight road for what seems like miles. <br>END OF PROTOTYPE.");
        glovePrompt = true;
    }
}


// Main timer in seconds
// This setInterval repeatedly runs every second
const myTimer = setInterval(() => {
    seconds ++;

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
// ADD THIS LINE RIGHT HERE:
    console.log("Current time left is:", timeLeft);
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(countdown);

        alert("Game Over!");

        // You could redirect to your game over page:
        // window.location.href = "gameover.html";
    }
}, 1000);

let stress = 0;

const stressInterval = setInterval(() => {
    if (stress < 100) {
        stress += 5;
        document.getElementById("stressFill").style.width = stress + "%";
    } else {
        clearInterval(stressInterval);
        alert("You are too stressed!");
    }
}, 1000);

$("#steeringWheel").click(function() {
    if (steeringPrompt == true) {
        continueEvents(this);
    } 
});

$("#stickShift").click(function() {
    if (stickPrompt == true) {
        continueEvents(this);
    } 
});

$("#leftMirror").click(function() {
    if (leftPrompt == true) {
        continueEvents(this);
    } 
});

$("#rightMirror").click(function() {
    if (rightPrompt == true) {
        continueEvents(this);
    } 
});

$("#gloveBox").click(function() {
    if (glovePrompt == true) {
        continueEvents(this);
    } 
});
