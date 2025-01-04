let username = null; // Global variable to store the username

// Prompt the user for their username
function promptForUsername() {
    if (!username) { // Only prompt if username is not already set
        username = prompt("Enter your username to start the game:");
        if (!username) {
            alert("Username is required to play the game!");
            promptForUsername(); // Retry if the user cancels or leaves it empty
        } else {
            console.log(`Username set: ${username}`);
        }
    }
}

// Update the username display in the game
function updateUsernameDisplay() {
    const usernameDisplay = document.getElementById("usernameDisplay");
    if (usernameDisplay) {
        usernameDisplay.innerText = `Welcome, ${username}!`;
    }
}
