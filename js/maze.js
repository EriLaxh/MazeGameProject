// Global Variables for Textures and Spotlight
let scene, camera, renderer, ballMesh, mazeMesh;
const maxDifficultyLevel = 3; // Maximum difficulty level
let difficultyLevel = 1; // Start at level 1
let maze; // Declare maze variable globally
let startPosition = { x: 1, y: 1 }; // Default starting position
let exitPosition = { x: 9, y: 9 }; // Default exit position

// Load Textures
const textureLoader = new THREE.TextureLoader();
let ballTexture = textureLoader.load("assets/textures/ballcheckerboard.png");
let wallTexture = textureLoader.load("assets/textures/carnivalballs.png");
let floorTexture = textureLoader.load("assets/textures/carnival.png");

// Adjust Camera and Renderer on Resize
window.addEventListener("resize", () => {
    document.getElementById("mazeContainer").style.height = `${window.innerHeight}px`;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize the Scene
function init() {
    console.log("Game initialized");

    // Prompt the user for their username
    promptForUsername();

    // Update the username display
    updateUsernameDisplay();

    setupScene();
    generateAndRenderMaze();

    // Create and add the player ball
    ballMesh = createPlayerBall();
    scene.add(ballMesh);

    addUIControls(); // Add UI controls for gameplay

    // Start animation loop
    animate();
}

// Setup the Scene and Camera
function setupScene() {
    scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(37, aspectRatio, 0.1, 1000);
    camera.position.set(5, -5, 12); // Adjusted for 3D view
    camera.lookAt(new THREE.Vector3(5, 5, 0)); // Center on the maze
    renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set background to transparent
    document.getElementById("mazeContainer").appendChild(renderer.domElement);

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
}

// Generate and Render the Maze
function generateAndRenderMaze() {
    maze = generateSquareMaze(difficultyLevel);
    mazeMesh = generateMazeMesh(maze);
    scene.add(mazeMesh);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    checkForExit(); // Check if the ball has reached the exit
}

// Check if a position is a wall
function isWall(x, y) {
    if (x < 0 || x >= maze.dimension || y < 0 || y >= maze.dimension) return true;
    return maze[x][y];
}

// Generate a maze with DFS algorithm and difficulty scaling
function generateSquareMaze(difficulty) {
    const dimension = 5 + difficulty * 2; // Increase maze size with difficulty
    const field = new Array(dimension).fill().map(() => new Array(dimension).fill(true));
    field.dimension = dimension;

    function iterate(field, x, y) {
        field[x][y] = false;
        while (true) {
            const directions = [];
            if (x > 1 && field[x - 2][y]) directions.push([-1, 0]);
            if (x < field.dimension - 2 && field[x + 2][y]) directions.push([1, 0]);
            if (y > 1 && field[x][y - 2]) directions.push([0, -1]);
            if (y < field.dimension - 2 && field[x][y + 2]) directions.push([0, 1]);
            if (directions.length === 0) return field;
            const dir = directions[Math.floor(Math.random() * directions.length)];
            field[x + dir[0]][y + dir[1]] = false;
            field = iterate(field, x + dir[0] * 2, y + dir[1] * 2);
        }
    }

    iterate(field, 1, 1);

    // Randomize starting and exit points
    startPosition = { x: 1, y: 1 };
    const distances = calculateDistances(field, startPosition);
    exitPosition = findFarthestOpenCell(field, distances, difficulty);

    return field;
}

// Calculate distances from a starting point using BFS
function calculateDistances(field, start) {
    const distances = Array.from({ length: field.dimension }, () => Array(field.dimension).fill(Infinity));
    const queue = [{ x: start.x, y: start.y }];
    distances[start.x][start.y] = 0;

    while (queue.length > 0) {
        const { x, y } = queue.shift();
        const steps = distances[x][y];

        for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < field.dimension && ny < field.dimension && !field[nx][ny] && distances[nx][ny] === Infinity) {
                distances[nx][ny] = steps + 1;
                queue.push({ x: nx, y: ny });
            }
        }
    }

    return distances;
}

// Find a suitable exit point based on difficulty
function findFarthestOpenCell(field, distances, difficulty) {
    let farthestCell = null;
    let maxDistance = -1;

    for (let x = 0; x < field.dimension; x++) {
        for (let y = 0; y < field.dimension; y++) {
            if (!field[x][y] && distances[x][y] > maxDistance && distances[x][y] >= difficulty * 3) {
                maxDistance = distances[x][y];
                farthestCell = { x, y };
            }
        }
    }

    return farthestCell || { x: field.dimension - 2, y: field.dimension - 2 };
}


// Generate maze mesh
function generateMazeMesh(field) {
    const mazeGroup = new THREE.Group();

    for (let i = 0; i < field.dimension; i++) {
        for (let j = 0; j < field.dimension; j++) {
            if (field[i][j]) {
                const wallGeometry = new THREE.BoxGeometry(1, 1, 0.5);
                const wallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture });
                const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
                wallMesh.position.set(i, j, 0.25);
                wallMesh.castShadow = true;
                wallMesh.receiveShadow = true;
                mazeGroup.add(wallMesh);
            }

            const floorGeometry = new THREE.BoxGeometry(1, 1, 0.1);
            const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
            const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
            floorMesh.position.set(i, j, -0.05);
            floorMesh.receiveShadow = true;
            mazeGroup.add(floorMesh);
        }
    }

    // Add exit indicator
    const exitGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const exitMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const exitMesh = new THREE.Mesh(exitGeometry, exitMaterial);
    exitMesh.position.set(exitPosition.x, exitPosition.y, -0.05);
    mazeGroup.add(exitMesh);

    return mazeGroup;
}

// Check for exit and reset maze
function checkForExit() {
    const ballX = Math.round(ballMesh.position.x);
    const ballY = Math.round(ballMesh.position.y);

    if (ballX === exitPosition.x && ballY === exitPosition.y) {
        console.log("Ball reached the exit!");
        
        // Launch confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ff5733', '#ffc300', '#900c3f', '#c70039'],
        });

        // Play the cheer sound effect
        playCheerSound();

        return true; // Indicate goal was reached
    }

    return false; // Goal not reached
}

function resetMaze() {
    transitionToNextMaze(() => {
        scene.remove(mazeMesh);
        scene.remove(ballMesh);

        // Generate a new maze and its mesh
        maze = generateSquareMaze(difficultyLevel);
        mazeMesh = generateMazeMesh(maze);
        scene.add(mazeMesh);

        // Reset ball to the starting position
        ballMesh = createPlayerBall();
        scene.add(ballMesh);

        // Reset the move counter
        moveCount = 0; // Reset the global counter
        updateMoveCounter(); // Update the move counter display

        console.log(`New Level: ${difficultyLevel}`);
    });
}

function createPlayerBall() {
    const ballGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ map: ballTexture });
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.position.set(startPosition.x, startPosition.y, 0.5);
    ballMesh.castShadow = true;
    return ballMesh;
}

function transitionToNextMaze(callback) {
    const overlay = document.getElementById("transition-overlay");
    if (!overlay) {
        console.error("Transition overlay not found.");
        return;
    }

    overlay.classList.add("active"); // Enable blocking
    overlay.style.opacity = 1; // Fade in

    setTimeout(() => {
        if (callback) callback(); // Execute the callback (e.g., reset maze)
        overlay.style.opacity = 0; // Fade out

        setTimeout(() => {
            overlay.classList.remove("active"); // Disable blocking
        }, 1000); // Wait for fade-out to complete
    }, 1000); // Wait for fade-in to complete
}