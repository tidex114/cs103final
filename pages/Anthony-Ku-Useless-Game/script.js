function play(choice){
    let imgSrc;

    if (choice === "rock") imgSrc = "../src/rockemoji.png";
    if (choice === "paper") imgSrc = "../src/paperemoji.png";
    if (choice === "scissors") imgSrc = "../src/scissorsemoji.png";

    // Outputs user’s answer as image
    document.getElementById("human-output").src = imgSrc;

    // Robot copies the same image
    document.getElementById("robot-output").src = imgSrc;
    document.getElementById("message").innerHTML = "It's a tie...try again.";
    // Disable buttons after one click
    document.getElementById("rock-button").disabled = true;
    document.getElementById("paper-button").disabled = true;
    document.getElementById("scissors-button").disabled = true;
}

function resetGame() {
    // Re-enable all buttons
    document.getElementById("rock-button").disabled = false;
    document.getElementById("paper-button").disabled = false;
    document.getElementById("scissors-button").disabled = false;

    // Clear images after reset
    document.getElementById("human-output").src = "";
    document.getElementById("robot-output").src = "";
    document.getElementById("message").innerHTML = "";
}

