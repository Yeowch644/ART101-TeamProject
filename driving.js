let events = 0;
let steeringPrompt = false;
let stickPrompt = false;
let leftPrompt = true;
let rightPrompt = false;
let glovePrompt = false;
let stressState = true;
let stress = 0;
let timer = false;
let timeLeft = 120;
let currentLine = 0;
let changeBackground = false;
let background = 0;
let hitchhikerGameOver = 0;
let scene = 1;

function gameEnd(cause){
    if (cause == "hitchhiker") {
        hitchhikerGameOver = hitchhikerGameOver + 1;
    }
    stressState == false
    $("#gameOver").css("display", "block");
    $("#prompt").css("display", "none");
    $("#dialogue-box").css("display", "none");
}

function restart(){
    // sceneAssets(); changes scene to the next too, so scene should never be 1 or lower once this function runs
    sceneAssets();
    if (scene == 2){
        scene2();
    }
    else if (scene == 3){
        scene3();
    }
    else {
        alert("ERROR IN RESTARTING SCENE");
    }
}

function continueEvents(event){
    events = events + 1;
    if (events == 1) {
        $("#prompt").html("There are no cars behind you on this long, winding road. <br>Adjust your right mirror, just in case.");
        leftPrompt = false;
        rightPrompt = true;
    }
    if (events == 2) {
        $("#prompt").html("There is a turn incoming up ahead. <br>Shift gears with your stick shift as you approach the turn.");
        rightPrompt = false;
        stickPrompt = true;
        toggleTimer(15);
    }
    if (events == 3) {
        $("#prompt").html("You shifted back into gear just as you reach the turn. <br>Turn the wheel.");
        stickPrompt = false;
        steeringPrompt = true;
    }
    if (events == 4) {
        $("#prompt").html("After turning, there is a straight road ahead for what seems like miles. You see the figure of a hitchhiker on your right.");
        stickPrompt = false;
        glovePrompt = true;
        stressState = false;
        toggleTimer();
        $("#driving").css("background-image", "url('images/drivingBackground2.png')");
        $("#dialogue-box").css("display", "block");
    }
}

function nextLine() {
    if (currentLine >= story.length) return;

    const line = story[currentLine];

    document.getElementById("dialogue").textContent =
        `${line.speaker}: "${line.text}"`;

    if (line.stress) {
        updateStress(line.stress);
    }

    if (line.gameOver) {
        gameOver = false
        document.getElementById("nextBtn").style.display = "none";
        gameEnd();
    }

    if (line.changeBackground) {
        // THIS  BACKGROUND INDEX LIST ENCOMPASSES ALL SCENES
        changeBackground = false
        if (background == 0) {
            $("#driving").css("background-image", "url('images/drivingBackground3.png')");
        }
        if (background == 1) {
            $("#driving").css("background-image", "url('images/2drivingBackground3.png')");
        }
        background = background + 1
    }

    if(line.continueEv) {
        continueEv = false;
        if (scene == 1) {
            continueEvents();
        }
        else if (scene ==2) {
            continueEvents2();
        }
    }

    currentLine++;
}


let story = [
    { speaker: "Hitchhiker", text: "Thanks for the ride.", changeBackground: true },
    { speaker: "You", text: "No problem.", stress: +5 },

    { speaker: "Hitchhiker", text: "I know it's not easy to let some stranger in your car." },
    { speaker: "You", text: "Like I said, it's no problem." },

    { speaker: "Hitchhiker", text: "Having no problems can turn into a problem.", stress: +15 },

    { speaker: "You", text: "Where are you headed?" },
    { speaker: "Hitchhiker", text: "Just a couple blocks down the road." },

    { speaker: "You", text: "Well, here we are! Have a good night!" },

    { speaker: "Hitchhiker", text: "I'm not leaving the car!", stress: +20 },

    { speaker: "You", text: "Yes you are!" },

    { speaker: "Hitchhiker", text: "It's my car now! Get out!"},
    { speaker: "Hitchhiker", text: "*Grabs the wheel*", gameOver: true }

];

function updateStress(amount) {
    stress += amount;
    $("#stressFill").css("width", `${stress}%`);
    if (stress >= 100) {
        gameEnd();
    }
}

function toggleTimer(amount) {
    if (timer == false) {
        timer = true;
        timeLeft = amount;
        $("#timer").html(`Alert: ${timeLeft}s`);
    }
    else {
        timer = false;
        timeLeft = 1;
        $("#timer").html("Keep driving");
    }
}


// CHOICE BUTTONS
function pickUp() {
    document.getElementById("choices").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline-block";
    $("#pickUp").css("display", "none");
    $("#driveAway").css("display", "none");
    nextLine();
}

function driveAway() {
    document.getElementById("dialogue").textContent =
        "You speed away into the darkness, leaving the hitchhiker behind... Eventually you get home safely. But that strange sense of dread never really goes away...";
    document.getElementById("choices").style.display = "none";
    $("#pickUp").css("display", "none");
    $("#driveAway").css("display", "none");
    $("#nextBtn").css("display", "none");
}
// END OF CHOICE BUTTONS

const countdown = setInterval(() => {
    if (timer == true) {
        timeLeft = timeLeft - 1;
        $("#timer").html(`Alert: ${timeLeft}s`);
    } else {
        $("#timer").html("Keep driving");
    }

    if (timeLeft <= 0) {
        toggleTimer();
        gameEnd();
    }
    
    if (stressState == true) {
        if (stress < 100) {
            updateStress(1.5);
            $("#stressFill").css("width", `${stress}%`);
            // document.getElementById("stressFill").style.width = stress + "%";
        } 

        if (stress >= 100) {
            gameEnd();
        }
    }
}, 1000);

let timeLeft = 30;

$(document).on("click", "#steeringWheel", function() {
    if (steeringPrompt == true) {
        if (scene == 1) {
            continueEvents(this);
        }
        else if (scene == 2){
            continueEvents2(this);
        }
        else if (scene ==3 ) {
            continueEvents3(this);
        }
        else{
            alert("ERROR WITH CLICKABLE ELEMENT");
        }
    } else {
        updateStress(5);
    }
});

$(document).on("click", "#stickShift", function() {
    if (stickPrompt == true) {
        if (scene == 1) {
            continueEvents(this);
        }
        else if (scene == 2){
            continueEvents2(this);
        }
        else if (scene ==3 ) {
            continueEvents3(this);
        }
        else{
            alert("ERROR WITH CLICKABLE ELEMENT");
        }
    }  else {
        updateStress(5);
    }
});

$(document).on("click", "#leftMirror", function() {
    if (leftPrompt == true) {
        if (scene == 1) {
            continueEvents(this);
        }
        else if (scene == 2){
            continueEvents2(this);
        }
        else if (scene ==3 ) {
            continueEvents3(this);
        }
        else{
            alert("ERROR WITH CLICKABLE ELEMENT");
        }
    }  else {
        updateStress(5);
    }
});

$(document).on("click", "#rightMirror", function() {
    if (rightPrompt == true) {
        if (scene == 1) {
            continueEvents(this);
        }
        else if (scene == 2){
            continueEvents2(this);
        }
        else if (scene ==3 ) {
            continueEvents3(this);
        }
        else{
            alert("ERROR WITH CLICKABLE ELEMENT");
        }
    }  else {
        updateStress(5);
    }
});

$(document).on("click", "#gloveBox", function() {
    if (glovePrompt == true) {
        if (scene == 1) {
            continueEvents(this);
        }
        else if (scene == 2){
            continueEvents2(this);
        }
        else if (scene ==3 ) {
            continueEvents3(this);
        }
        else{
            alert("ERROR WITH CLICKABLE ELEMENT");
        }
    }  else {
        updateStress(10);
    }
});

function sceneAssets(){
    scene = scene + 1;
    let driving = "";
    if (scene == 2) {
        $("#driving").css("background-image", "url(images/2drivingBackground.png)");
        driving = driving + '<img src="images/2steeringWheel.png" id="steeringWheel" class="clickableAsset">';
        driving = driving + '<img src="images/2stickShift.png" id="stickShift" class="clickableAsset">';
        driving = driving + '<img src="images/2leftMirror.png" id="leftMirror" class="clickableAsset">';
        driving = driving + '<img src="images/2rightMirror.png" id="rightMirror" class="clickableAsset">';
        driving = driving + '<img src="images/2gloveBox.png" id="gloveBox" class="clickableAsset">';
        $("#driving").html(driving);
    }
    else if (scene == 3) {
        $("#driving").css("background-image", "url(images/2drivingBackground.png)");
    }
    else {
        alert("ERROR IN SCENE ASSETS");
    }
}


// Scene 2 stuff
// bruh there's probably an easier way to do this but I'll just settle with this yanderedev ahh code
function scene2(){
    events = 0;
    currentLine = 0;
    steeringPrompt = false;
    stickPrompt = false;
    leftPrompt = false;
    rightPrompt = true;
    glovePrompt = false;
    stressState = true;
    stress = 0;
    timer = false;
    timeLeft = 120;
    $("#gameOver").css("display", "none");
    $("#prompt").css("display", "block");
    $("#prompt").html("There might be someone behind you! <br>Adjust your right mirror to your blindspot.");
    $("#nextBtn").css("display", "inline-block");
    $("#dialogue").html(`Hitckhiker: "Can I get a ride? My cellphone broke, I can't really call an Uber."`);
    story = [
        { speaker: "You", text: "Umm not really sure about that. I've got to get home before dinner.", stress: +5 },

        { speaker: "Hitchhiker", text: "Did I hear about some yummy dinner?" },
        { speaker: "You", text: "I've got some fresh pot of stew ready for me when I get home. Well anyways I- *Stomach rumble sound*", continueEv: true},

        { speaker: "Hitchhiker", text: "Stew! I love stew! *The hitchhiker forces himself into your car*", stress: +25, continueEv: true, changeBackground: true},
        { speaker: "You", text: "Where are you headed?" },

        { speaker: "Hitchhiker", text: "Just a couple blocks down the road." },
        { speaker: "You", text: "Well, here we are! Have a good night!" },

        { speaker: "Hitchhiker", text: "Well actually, I wouldn't mind going home with you.", stress: +20},
        { speaker: "You", text: "I'm not up for receiving guests at the moment. My place isn't tidy…" },

        { speaker: "Hitchhiker", text: "HAND OVER THAT WHEEL, I'M DRIVING!"},
        { speaker: "Hitchhiker", text: "'He grabs the wheel*", gameOver: true},
    ];
}

function continueEvents2(event){
    events = events + 1;
    if (events == 1) {
        $("#prompt").html("Ahh shoot! You got distracted! Someone might have been diverting your attention! Could it be a limb? <br> Quick, shift gears!");
        rightPrompt = false;
        stickPrompt = true;
        toggleTimer(13);
    }
    if (events == 2) {
        $("#prompt").html("Umm, what's that in your backseat? You don't have time to check your mirror. <br>Turn the wheel before you crash!");
        stickPrompt = false;
        steeringPrompt = true;
    }
    if (events == 3) {
        $("#prompt").html("Close call. You turned the wheel before disaster struck! Wait, do you see that? It appears someone is standing alone! <br>Let's pull over!");
        toggleTimer();
        steeringPrompt = false;
        stressState = false;
        $("#driving").css("background-image", "url('images/2drivingBackground2.png')");
        $("#dialogue-box").css("display", "block");
    }
    if (events == 4) {
        $("#prompt").html("Your stomach rumbles. When was the last time you ate?");
    }
    if (events == 5) {
        $("#prompt").html("The hitchiker forces himself into your car with ease. Are you sure you even locked the door?");
    }
}
// END OF SCENE 2 STUFF


// Scene 3 stuff
function scene3(){
    events = 0;
    currentLine = 0;
    steeringPrompt = false;
    stickPrompt = false;
    leftPrompt = false;
    rightPrompt = true;
    glovePrompt = false;
    stressState = true;
    stress = 0;
    timer = false;
    timeLeft = 120;
    $("#gameOver").css("display", "none");
    $("#prompt").css("display", "block");
    $("#prompt").html("CAREFULLY SOMEONE IS FOLLOWING YOU… Adjust your right mirror to your blindspot.");
    $("#nextBtn").css("display", "inline-block");
    $("#dialogue").html(`Hitckhiker: "Can I get a ride? My cellphone broke, I can't really call an Uber."`);
    story = [
        { speaker: "You", text: "Umm not really sure about that. I've got to get home before dinner.", stress: +5 },

        { speaker: "Hitchhiker", text: "Did I hear about some yummy dinner?" },
        { speaker: "You", text: "I've got some fresh pot of stew ready for me when I get home. Well anyways I- *Stomach rumble sound*", continueEv: true},

        { speaker: "Hitchhiker", text: "Stew! I love stew! *The hitchhiker forces himself into your car*", stress: +25, continueEv: true, changeBackground: true},
        { speaker: "You", text: "Where are you headed?" },

        { speaker: "Hitchhiker", text: "Just a couple blocks down the road." },
        { speaker: "You", text: "Well, here we are! Have a good night!" },

        { speaker: "Hitchhiker", text: "Well actually, I wouldn't mind going home with you.", stress: +20},
        { speaker: "You", text: "I'm not up for receiving guests at the moment. My place isn't tidy…" },

        { speaker: "Hitchhiker", text: "HAND OVER THAT WHEEL, I'M DRIVING!"},
        { speaker: "Hitchhiker", text: "'He grabs the wheel*", gameOver: true},
    ];
}

function continueEvents3(event){
    events = events + 1;
    if (events == 1) {
        $("#prompt").html("THERE GETTING CLOSER… AND CLOSER… Quick shift gears!");
        rightPrompt = false;
        stickPrompt = true;
        toggleTimer(10);
    }
    if (events == 2) {
        $("#prompt").html("There is a tree in the way! Quick turn the wheel before you crash!");
        stickPrompt = false;
        steeringPrompt = true;
        toggleTimer();
        toggleTimer(7);
    }
    if (events == 3) {
        $("#prompt").html("You barely made it! It seems like you're okay… Wait, did you see that? It appears someone is standing alone! Let's pull over!");
        toggleTimer();
        steeringPrompt = false;
        stressState = false;
        $("#driving").css("background-image", "url('images/2drivingBackground2.png')");
        $("#dialogue-box").css("display", "block");
    }
    if (events == 4) {
        $("#prompt").html("Your stomach rumbles. When was the last time you ate?");
    }
    if (events == 5) {
        $("#prompt").html("The hitchiker forces himself into your car with ease. Are you sure you even locked the door?");
    }
}