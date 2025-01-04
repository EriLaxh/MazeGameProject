// Movement Command Queue
let moveQueue = [];
let isExecuting = false;
let moveCount = 0; // Initialize the move counter

// Adds UI controls for directional input, execution, and queue management
function addUIControls() {
    const existingControls = document.getElementById("controlsDiv");
    if (existingControls) existingControls.remove();

    const controlsDiv = document.createElement("div");
    controlsDiv.id = "controlsDiv";

    // Row 1: Up Button
    const upRow = document.createElement("div");
    upRow.className = "button-row";
    const upButton = document.createElement("button");
    upButton.innerHTML = "↑ Up"; // Up arrow
    upButton.className = "direction-button";
    upButton.onclick = () => addMoveToQueue("up");
    upRow.appendChild(upButton);
    controlsDiv.appendChild(upRow);

    // Row 2: Left and Right Buttons
    const leftRightRow = document.createElement("div");
    leftRightRow.className = "button-row";
    const leftButton = document.createElement("button");
    leftButton.innerHTML = "← Left"; // Left arrow
    leftButton.className = "direction-button";
    leftButton.onclick = () => addMoveToQueue("left");
    leftRightRow.appendChild(leftButton);

    const rightButton = document.createElement("button");
    rightButton.innerHTML = "Right →"; // Right arrow
    rightButton.className = "direction-button";
    rightButton.onclick = () => addMoveToQueue("right");
    leftRightRow.appendChild(rightButton);

    controlsDiv.appendChild(leftRightRow);

    // Row 3: Down Button
    const downRow = document.createElement("div");
    downRow.className = "button-row";
    const downButton = document.createElement("button");
    downButton.innerHTML = "Down ↓"; // Down arrow
    downButton.className = "direction-button";
    downButton.onclick = () => addMoveToQueue("down");
    downRow.appendChild(downButton);
    controlsDiv.appendChild(downRow);

    // Row 4: Delete and Clear Buttons
    const deleteClearRow = document.createElement("div");
    deleteClearRow.className = "button-row";
    ["Delete", "Clear"].forEach((action) => {
        const button = document.createElement("button");
        button.innerText = action;
        button.className = action === "Delete" ? "delete-button" : "clear-button";
        button.onclick = action === "Delete" ? deleteLastMove : () => {
            moveQueue = [];
            updateQueueDisplay();
        };
        deleteClearRow.appendChild(button);
    });
    controlsDiv.appendChild(deleteClearRow);

    // Row 5: Execute Button
    const executeRow = document.createElement("div");
    executeRow.className = "button-row";
    const executeButton = document.createElement("button");
    executeButton.innerText = "Execute";
    executeButton.className = "execute-button";
    executeButton.onclick = startExecution;
    executeRow.appendChild(executeButton);
    controlsDiv.appendChild(executeRow);

    document.body.appendChild(controlsDiv);

    const queueDiv = document.createElement("div");
    queueDiv.id = "moveQueueDisplay";
    document.body.appendChild(queueDiv);

    updateQueueDisplay();
}

// Updates the queue display to show the current sequence of moves
function updateQueueDisplay() {
    const queueDiv = document.getElementById("moveQueueDisplay");

    // Map the directions to their respective arrow symbols
    const arrowMap = {
        up: "↑",
        down: "↓",
        left: "←",
        right: "→"
    };

    // Convert the moveQueue to display arrows instead of words
    const displayQueue = moveQueue
        .map((direction) => arrowMap[direction] || direction) // Map directions to arrows
        .join(" / "); // Join with a separator

    queueDiv.innerText = `Queue: ${displayQueue}`;
}

// Adds a move to the queue when a directional button is clicked
function addMoveToQueue(direction) {
    if (isExecuting) {
        console.log("Execution in progress. Cannot add moves.");
        return;
    }
    moveQueue.push(direction);
    updateQueueDisplay();
}

// Begins executing the move queue in sequence
function startExecution() {
    if (moveQueue.length === 0) {
        console.log("Queue is empty. No moves to execute.");
        return;
    }

    if (!isExecuting) {
        isExecuting = true;
        // Increment the move counter when a queue starts executing
        moveCount++;
        updateMoveCounter();
        executeMove(); // Start executing moves
    }
}

// Executes one move at a time from the queue
function executeMove() {
    if (moveQueue.length === 0) {
        // Check if the goal was reached after all moves
        if (checkForExit()) {
            alert("Congratulations! You've cleared the stage!");
            if (difficultyLevel < maxDifficultyLevel) {
                difficultyLevel++;
            }
            resetMaze();
        } else {
            alert("All moves executed, but the goal was not reached.");
        }

        isExecuting = false; // Mark execution as completed
        return;
    }

    const nextMove = moveQueue.shift(); // Get the next move from the queue
    const success = performMove(nextMove); // Perform the move and check for success
    updateQueueDisplay();

    if (!success) {
        console.log("Hit a wall. Queue cleared.");
        alert("Hit a wall!"); // Notify the player of collision
        moveQueue = []; // Clear the queue if a wall is hit
        updateQueueDisplay();
        isExecuting = false; // Mark execution as stopped
        return;
    }

    // Check if the move leads directly to the goal
    if (checkForExit()) {
        alert("Congratulations! You've cleared the stage!");
        if (difficultyLevel < maxDifficultyLevel) {
            difficultyLevel++;
        }
        resetMaze();
        return; // Stop further execution if the goal is reached
    }

    // Continue to the next move after 500ms
    setTimeout(executeMove, 500);
}

// Handles the movement of the ball in the maze
function performMove(direction) {
    const x = Math.round(ballMesh.position.x);
    const y = Math.round(ballMesh.position.y);

    let newX = x;
    let newY = y;

    switch (direction) {
        case "up":
            newY += 1;
            break;
        case "down":
            newY -= 1;
            break;
        case "left":
            newX -= 1;
            break;
        case "right":
            newX += 1;
            break;
    }

    // Only move if the new position is not a wall
    if (!window.isWall(newX, newY)) {
        animateMove(newX, newY);
        console.log(`Moved ${direction} to (${newX}, ${newY})`);
        return true; // Move successful
    } else {
        console.log(`Blocked by wall at (${newX}, ${newY})`);
        return false; // Move unsuccessful
    }
}

// Animates the ball's movement for smooth transitions
function animateMove(newX, newY) {
    const duration = 500; // Duration in ms
    const startX = ballMesh.position.x;
    const startY = ballMesh.position.y;
    const startTime = Date.now();

    const ballRadius = 0.4; // Ball radius
    const distance = Math.sqrt((newX - startX) ** 2 + (newY - startY) ** 2); // Distance to move
    const totalRotation = distance / ballRadius; // Total rotation in radians

    function step() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Update position
        ballMesh.position.x = startX + (newX - startX) * progress;
        ballMesh.position.y = startY + (newY - startY) * progress;

        // Update rotation
        const currentRotation = totalRotation * progress; // Current rotation based on progress
        if (newX !== startX) {
            ballMesh.rotation.z = newX > startX ? -currentRotation : currentRotation; // Roll along the Z-axis
        } else if (newY !== startY) {
            ballMesh.rotation.x = newY > startY ? -currentRotation : currentRotation; // Roll along the X-axis
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            console.log("Animation complete!");
        }
    }
    step();
}

function deleteLastMove() {
    if (moveQueue.length > 0) {
        moveQueue.pop(); // Remove the last move from the queue
        console.log("Deleted the last move from the queue.");
        updateQueueDisplay(); // Update the queue display to reflect the changes
    } else {
        console.log("Queue is empty. Nothing to delete.");
    }
}

function updateMoveCounter() {
    const moveCounterDisplay = document.getElementById("moveCounter");
    if (moveCounterDisplay) {
        moveCounterDisplay.innerText = `Moves: ${moveCount}`;
    }
}
