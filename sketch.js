var canvasSize = 500;
var gridSize = 50
var blockSize = canvasSize / gridSize
var newPathFinder = new PathManager(gridSize);
//newPathFinder.setStartPoint(9, 9);
//newPathFinder.setEndPoint(40, 40);
//newPathFinder.deactivatePoint(40, 9)
//newPathFinder.findPath();

var gameState = 1;

function setup() {
  createCanvas(canvasSize, canvasSize + 50);
  
  
}

function draw() {
    background(10, 10, 10);
    drawGrid(newPathFinder, blockSize);
    findButton();
    addBarriers();
    getMouseCoords();
}

function findButton() {
    if(gameState < 3){ return; }
    let buttonText = ""
    switch (gameState) {
        case 3:
            buttonText = "Find Path"
            break;
        case 4:
            buttonText = "Reset Grid"
            break;
        default:
            break;
    }
    textSize(20);

    fill(255,255,255);
    rect(350, 510, 140, 30, 10);

    fill(0, 200, 255);
    text(buttonText, 375, 530);
}

function addBarriers() {
    if (mouseIsPressed && gameState == 3) {
        mouseCoords = getMouseCoords();
        newPathFinder.deactivatePoint(mouseCoords[0], mouseCoords[1]);
    }
}

function mousePressed() {
    mouseCoords = getMouseCoords();
    switch (gameState) {
        case 1:
            if (newPathFinder.setStartPoint(mouseCoords[0], mouseCoords[1])) {
                gameState++;
            }
            break;
        case 2:
            if (newPathFinder.setEndPoint(mouseCoords[0], mouseCoords[1])) {
                gameState++;
            }
            break;
        case 3:
            if (350 <= mouseX && mouseX <= 490 && 510 <= mouseY && mouseY <= 540) {
                newPathFinder.findPath();
                gameState++;
            }
            break;
        case 4:
            if (350 <= mouseX && mouseX <= 490 && 510 <= mouseY && mouseY <= 540) {
                newPathFinder = new PathManager(gridSize);
                gameState = 1;
            }
            break;

        default:
            break;
    }
}

function getMouseCoords() {
    textSize(24);
    fill(255, 255, 255);
    let x = Math.floor(mouseX / blockSize);
    let y = Math.floor(mouseY / blockSize);
    mouseText = x + " " + y;
    //text(mouseText, 10, 525);

    return [x, y];
}

function drawGrid(pathFinder, size) {
    for (let x = 0; x < pathFinder.size; x++) {
        for (let y = 0; y < pathFinder.size; y++) {

            let c = color(255, 255, 255);

            let newPoint = pathFinder.grid[x][y];
            if (newPoint.active == false) {
                c = color(0, 0, 0);
            }
            else if (newPoint == pathFinder.startPoint || newPoint == pathFinder.endPoint) {
                c = color(255, 0, 255);
            }
            else if (pointInPath(newPoint, pathFinder.path)) {
                c = color(0, 250, 255);
            }

            fill(c);
            drawPoint(pathFinder.grid[x][y], size);
        }     
    }
}

function drawPoint(Point, size) {
    square(Point.coords.x*size, Point.coords.y*size, size)
}

function pointInPath(point, path) {
    for (let i = 0; i < path.length; i++) {
        if (point == path[i]) {
            return true;
        }
    }
    return false;
}