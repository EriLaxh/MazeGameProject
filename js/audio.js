// Initialize background music
let backgroundMusic;

function playBackgroundMusic() {
    // Create an audio object
    backgroundMusic = new Audio('assets/audio/carnivalBGM.mp3'); // Path to your audio file
    backgroundMusic.loop = true; // Enable looping
    backgroundMusic.volume = 0.5; // Set initial volume (adjust as needed)
    backgroundMusic.play();
}

// Call this function when the game starts
playBackgroundMusic();

// Play the cheer sound effect when the player reaches the goal
function playCheerSound() {
    const cheerSound = new Audio('assets/audio/cheer.mp3'); // Path to your cheer sound file
    cheerSound.volume = 0.7; // Adjust the volume of the cheer
    cheerSound.play(); // Play the sound
}

