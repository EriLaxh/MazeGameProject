Maze Game

Introduction
Maze Game is designed to help preschool children learn directions while enjoying the challenge of navigating colourful mazes. Inspired by the Pathfinder puzzles from Honkai: Star Rail and built on the Astray library (Astray on GitHub), this project provides an interactive and engaging learning experience.

Features
Interactive Gameplay: Navigate through a series of mazes using predefined moves and logical planning.
Colourful Themes: Vibrant textures and child-friendly designs.
Audio Integration: Background music and sound effects enhance engagement.
Dynamic Scoring: Tracks player progress through a move counter.
Customisation: Enter your username for a personalised experience.

How to Run

Option 1: Using Visual Studio Code and Live Server

Download and Install:
Clone the repository or download the project files as a .zip.

Install VS Code:
If not already installed, download and install Visual Studio Code. (https://code.visualstudio.com/)

Setup Live Server:
Install the Live Server extension in VS Code:
Open VS Code.
Go to Extensions (Ctrl + Shift + X).
Search for "Live Server" and click Install.
Extract the downloaded files and open the folder in VS Code.

Launch Live Server:
Right-click on index.html in VS Code.
Select Open with Live Server.

Play the Game:
The game will open in your default browser.
Note: Please enable audio permissions if the background music is not audible.

Option 2: Using XAMPP Localhost

Install XAMPP:
Download and install XAMPP.

Set Up Project in XAMPP:
Extract the downloaded project files.
Move the project folder to the htdocs directory in the XAMPP installation folder (e.g., C:/xampp/htdocs/MazeGameProject).

Start XAMPP:
Open the XAMPP Control Panel.
Start the Apache server.

Access the Game:
Open a browser and go to http://localhost/MazeGameProject/index.html.

Play the Game:
The game will load in your browser.
Note: Please enable audio permissions if the background music is not audible.

Directory Structure
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

Audio Credits
Background Music: Lucky Wheel · Aideen Park (Extended) - Honkai: Star Rail 2.0 OST.

License
This project is licensed under the MIT License. You are free to use, modify, and distribute the project as needed:
- The Three.js library is used under the MIT License.
- Textures and sound effects are sourced from royalty-free platforms or appropriately licensed.

## Disclaimer
The Maze Game is a project developed for educational purposes as part of a final-year academic submission.



Acknowledgements
Astray Library: For maze-generation inspiration (Astray on GitHub).
Three.js: For 3D rendering capabilities.
Canvas Confetti Library: For celebratory animations.
Open-Source Communities: For sharing resources like textures and sound effects.