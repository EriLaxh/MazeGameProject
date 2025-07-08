# Local Setup Guide for Maze Game

This guide provides instructions on how to set up and run the Maze Game project locally on your machine.

## How to Run Locally

### Option 1: Using Visual Studio Code and Live Server

1.  **Download and Install:** Clone the repository or download the project files as a .zip.
2.  **Install VS Code:** If not already installed, download and install Visual Studio Code. ([https://code.visualstudio.com/](https://code.visualstudio.com/))
3.  **Setup Live Server:** Install the Live Server extension in VS Code:
    * Open VS Code.
    * Go to Extensions (Ctrl + Shift + X).
    * Search for "Live Server" and click Install.
    * Extract the downloaded files and open the folder in VS Code.
4.  **Launch Live Server:** Right-click on `index.html` in VS Code. Select `Open with Live Server`.
5.  **Play the Game:** The game will open in your default browser.
    * **Note:** Please enable audio permissions if the background music is not audible.

### Option 2: Using XAMPP Localhost

1.  **Install XAMPP:** Download and install XAMPP.
2.  **Set Up Project in XAMPP:**
    * Extract the downloaded project files.
    * Move the project folder to the `htdocs` directory in the XAMPP installation folder (e.g., `C:/xampp/htdocs/MazeGameProject`).
3.  **Start XAMPP:** Open the XAMPP Control Panel. Start the Apache server.
4.  **Access the Game:** Open a browser and go to `http://localhost/MazeGameProject/index.html`.
5.  **Play the Game:** The game will load in your browser.
    * **Note:** Please enable audio permissions if the background music is not audible.

## Directory Structure
``` 
MazeGameProject/
│
├── assets/
│   ├── audio/               # Audio files (background music and sound effects)
│   ├── bg/                  # Background images
│   ├── textures/            # Textures for the ball, walls, and floors
│
├── css/
│   └── styles.css           # Game styles
│
├── js/
│   ├── audio.js             # Handles background music and sound effects
│   ├── gameplay.js          # Core gameplay mechanics
│   ├── keyboard.js          # Keyboard input handling
│   ├── maze.js              # Maze generation and rendering logic
│   └── username.js          # Handles username input and display
│
├── libs/
│   ├── Box2dWeb.min.js      # Physics engine for additional effects
│   └── jquery.js            # jQuery library for UI interactions
│
└── index.html               # Main entry point of the game 
```
