// Event listener for keyboard input
document.addEventListener("keydown", (event) => {
    console.log(`Key pressed: ${event.key}`); // Log the key pressed for debugging

    switch (event.key) {
        case "ArrowUp": // Map "ArrowUp" to "up" movement
            addMoveToQueue("up");
            break;

        case "ArrowDown": // Map "ArrowDown" to "down" movement
            addMoveToQueue("down");
            break;

        case "ArrowLeft": // Map "ArrowLeft" to "left" movement
            addMoveToQueue("left");
            break;

        case "ArrowRight": // Map "ArrowRight" to "right" movement
            addMoveToQueue("right");
            break;

        case "Enter": // Map "Enter" to start execution of moves
            startExecution();
            break;

        case "Backspace": // Map "Backspace" to delete the last move
            deleteLastMove();
            break;

        default:
            console.log(`Key not mapped: ${event.key}`);
    }
});