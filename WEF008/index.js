let fr = 30; //starting FPS
const unitLength = 15;
const boxColor = (255, 255, 255);
const strokeColor = (255, 255, 255);
// const strokeColor = (0, 0, 0); //black
let rectX = 0;
let clr;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let gameRows;
let panel = 20;
let spaceshipAngle;
let currentBoard;
let nextBoard;
let playPause = document.querySelector('.play-pause')
let bullets1 = [];
let bullets2 = [];


function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 200);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
    gameRows = rows - panel;

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = {};
            nextBoard[i][j] = {};
        }
    }
    angleMode(DEGREES);
    frameRate(fr);
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

/**
* Initialize/reset the board state
*/
function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < gameRows; j++) {
            currentBoard[i][j] = random() > 0.8 ? { key: 1, anotherKey: 0 } : { key: 0, anotherKey: 0 };
            nextBoard[i][j] = { key: 0, anotherKey: 0 };
        }
    }

    for (let i = 0; i < columns; i++) {
        for (let j = gameRows; j < rows; j++) {
            currentBoard[i][j] = { key: 0, anotherKey: 0 };
            nextBoard[i][j] = { key: 0, anotherKey: 0 };
        }
    }
    bullets1 = []
    bullets2 = []
}

function draw() {
    background(255);
    generate();  //上邊

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < gameRows; j++) {
            if (j < 5) {
                fill(boxColor)
            } else if (currentBoard[i][j]["key"] == 1) {
                fill(boxColor);
            } else if (currentBoard[i][j]["key"] == 0) {
                fill(0, 0, 0);
            } else {
                fill(); //(CHANGEABLE COLOR for box background)
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
    for (let i = 0; i < columns; i++) { //正下邊
        for (let j = gameRows; j < rows; j++) {

            if (currentBoard[i][j]["anotherKey"] == 1) {
                fill(247, 255, 163);
            } else if (currentBoard[i][j]["anotherKey"] == 0) {
                fill(255, 255, 255);
            } else {
                fill(0, 0, 255);

            }
            // fill(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)); //(CHANGEABLE COLOR for box background)
            // fill(random() > 0.01? (255,255,255) : (0,0,0)); //(CHANGEABLE COLOR for box background)

            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);

        }
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 6; j < gameRows; j++) {
            for (let a of [-1, 0, 1]) {
                for (let b of [-1, 0, 1]) {
            if (currentBoard[i][j]["anotherKey"] == 1 && currentBoard[a+i][b+j]["key"] == 1) {
                fill(255, 0, 0);
                stroke(strokeColor);
                rect((i - 1) * unitLength, (j - 2) * unitLength, unitLength * 3, unitLength * 5);
                rect((i - 2) * unitLength, (j - 1) * unitLength, unitLength * 5, unitLength * 3);

                fill(255, 145, 0);
                stroke(strokeColor);
                rect((i - 1) * unitLength, (j - 1) * unitLength, unitLength * 3, unitLength * 3);
                
                fill(255, 251, 0);
                stroke(strokeColor);
                rect((i - 1) * unitLength, (j) * unitLength, unitLength * 3, unitLength);
                rect(i  * unitLength, (j - 1) * unitLength, unitLength, unitLength * 3);

            }
        }
    }
}
    }

    // if (mouseX > unitLength * columns || mouseY > unitLength * gameRows) {
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    // currentBoard[x][y] = 0;
    fill(40, 98, 161); //dark blue
    rect((x - 1) * unitLength, (y - 3) * unitLength, unitLength * 3, unitLength);

    fill(65, 132, 204); //pale blue
    rect((x - 1) * unitLength, (y - 5) * unitLength, unitLength * 3, unitLength * 2);

    fill(149, 233, 252); //palest blue
    rect((x - 1) * unitLength, (y - 6) * unitLength, unitLength * 3, unitLength);

    fill(48, 48, 48); //darkest grey
    rect((x - 7) * unitLength, (y - 1) * unitLength, unitLength, unitLength);
    rect((x - 7) * unitLength, (y + 4) * unitLength, unitLength, unitLength);
    rect((x - 6) * unitLength, (y + 7) * unitLength, unitLength * 2, unitLength);
    rect((x - 4) * unitLength, (y + 1) * unitLength, unitLength, unitLength * 3);
    rect((x - 3) * unitLength, (y - 3) * unitLength, unitLength, unitLength * 8);
    rect((x + 7) * unitLength, (y - 1) * unitLength, unitLength, unitLength);
    rect((x + 7) * unitLength, (y + 4) * unitLength, unitLength, unitLength);
    rect((x + 5) * unitLength, (y + 7) * unitLength, unitLength * 2, unitLength);
    rect((x + 4) * unitLength, (y + 1) * unitLength, unitLength, unitLength * 3);
    rect((x + 3) * unitLength, (y - 3) * unitLength, unitLength, unitLength * 8);
    rect((x - 1) * unitLength, (y - 2) * unitLength, unitLength * 3, unitLength);
    rect((x - 1) * unitLength, (y + 2) * unitLength, unitLength * 3, unitLength);

    fill(92, 92, 92); //dark grey
    rect((x - 8) * unitLength, (y + 2) * unitLength, unitLength, unitLength * 2);
    rect((x - 8) * unitLength, (y + 5) * unitLength, unitLength, unitLength * 3);
    rect((x - 7) * unitLength, (y) * unitLength, unitLength, unitLength);
    rect((x - 6) * unitLength, (y + 3) * unitLength, unitLength, unitLength);
    rect((x - 6) * unitLength, (y + 5) * unitLength, unitLength, unitLength);
    rect((x - 5) * unitLength, (y) * unitLength, unitLength, unitLength * 7);
    rect((x - 4) * unitLength, (y - 2) * unitLength, unitLength, unitLength * 3);
    rect((x - 4) * unitLength, (y + 4) * unitLength, unitLength, unitLength * 2);
    rect((x - 2) * unitLength, (y - 5) * unitLength, unitLength, unitLength * 9);
    rect((x + 8) * unitLength, (y + 2) * unitLength, unitLength, unitLength * 2);
    rect((x + 8) * unitLength, (y + 5) * unitLength, unitLength, unitLength * 3);
    rect((x + 7) * unitLength, (y) * unitLength, unitLength, unitLength);
    rect((x + 6) * unitLength, (y + 3) * unitLength, unitLength, unitLength);
    rect((x + 6) * unitLength, (y + 5) * unitLength, unitLength, unitLength);
    rect((x + 5) * unitLength, (y) * unitLength, unitLength, unitLength * 7);
    rect((x + 4) * unitLength, (y - 2) * unitLength, unitLength, unitLength * 3);
    rect((x + 4) * unitLength, (y + 4) * unitLength, unitLength, unitLength * 2);
    rect((x + 2) * unitLength, (y - 5) * unitLength, unitLength, unitLength * 9);
    rect((x - 1) * unitLength, (y - 8) * unitLength, unitLength * 3, unitLength);
    rect((x - 1) * unitLength, (y + 1) * unitLength, unitLength * 3, unitLength);

    fill(181, 181, 181); //pale grey
    rect((x - 7) * unitLength, (y + 1) * unitLength, unitLength, unitLength * 3);
    rect((x - 7) * unitLength, (y + 5) * unitLength, unitLength, unitLength * 2);
    rect((x - 6) * unitLength, (y) * unitLength, unitLength, unitLength * 3);
    rect((x - 6) * unitLength, (y + 4) * unitLength, unitLength, unitLength);
    rect((x - 6) * unitLength, (y + 6) * unitLength, unitLength, unitLength);
    rect((x - 2) * unitLength, (y - 6) * unitLength, unitLength, unitLength);
    rect((x + 7) * unitLength, (y + 1) * unitLength, unitLength, unitLength * 3);
    rect((x + 7) * unitLength, (y + 5) * unitLength, unitLength, unitLength * 2);
    rect((x + 6) * unitLength, (y) * unitLength, unitLength, unitLength * 3);
    rect((x + 6) * unitLength, (y + 4) * unitLength, unitLength, unitLength);
    rect((x + 6) * unitLength, (y + 6) * unitLength, unitLength, unitLength);
    rect((x + 2) * unitLength, (y - 6) * unitLength, unitLength, unitLength);
    rect((x - 1) * unitLength, (y - 7) * unitLength, unitLength * 3, unitLength);
    rect((x - 1) * unitLength, (y - 1) * unitLength, unitLength * 3, unitLength * 2);

    fill(219, 91, 0); //orange
    rect((x - 7) * unitLength, (y - 2) * unitLength, unitLength, unitLength);
    rect((x - 6) * unitLength, (y + 8) * unitLength, unitLength * 2, unitLength);
    rect((x + 7) * unitLength, (y - 2) * unitLength, unitLength, unitLength);
    rect((x + 5) * unitLength, (y + 8) * unitLength, unitLength * 2, unitLength);

    fill(240, 182, 7); //orange
    rect((x - 6) * unitLength, (y + 10) * unitLength, unitLength, unitLength * 2);
    rect((x + 6) * unitLength, (y + 10) * unitLength, unitLength, unitLength * 2);
    // } 

    if (mouseY < unitLength * gameRows || mouseY > unitLength * rows || mouseX < unitLength * 7 || mouseX > (unitLength * (columns - 7))) {
        return;
    }
    else {


        for (let bullet1 of bullets1) {
            if (bullet1.y > 0) {
                rect(bullet1.x * unitLength, bullet1.y * unitLength, unitLength, unitLength)
                currentBoard[bullet1.x][bullet1.y]["key"] = 99;
                bullet1.y -= 1
                // nextBoard[bullet1.x][bullet1.y+2]["key"] = 0;
            }
        }

        for (let bullet2 of bullets2) {
            if (bullet2.y > 0) {
                rect(bullet2.x * unitLength, bullet2.y * unitLength, unitLength, unitLength)
                currentBoard[bullet2.x][bullet2.y]["key"] = 99;
                bullet2.y -= 1
                // nextBoard[bullet2.x][bullet2.y+2]["key"] = 0;
            }
        }
    }
}




function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < gameRows; y++) {

            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    if (y == 0 && j == -1) {
                        neighbors += 0;
                    } else {
                        // The modulo operator is crucial for wrapping on the edge
                        neighbors += currentBoard[(x + i + columns) % columns][(y + j)]["key"];
                        // neighbors = 0;
                    }
                }
            }
            // Rules of Life
            if (y < 5) {
                currentBoard[x][y] = random() > 0.3 ? { key: 1, anotherKey: 1 } : { key: 0, anotherKey: 0 };
            } else if (currentBoard[x][y]["key"] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y]["key"] = 0;
            } else if (currentBoard[x][y]["key"] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y]["key"] = 0;
            } else if (currentBoard[x][y]["key"] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y]["key"] = 1;
            } else if (currentBoard[x][y]["key"] == 99) {
                // New life due to Reproduction
                nextBoard[x][y]["anotherKey"] = 1
                currentBoard[x][y + 1]["anotherKey"] = 0
                nextBoard[x][y + 1]["key"] = 1;
            } else {
                // Stasis
                nextBoard[x][y]["key"] = currentBoard[x][y]["key"];
            }
        }

    }
    for (let x = 0; x < columns; x++) {
        for (let y = gameRows; y < rows; y++) {

            if (y == gameRows) {
                nextBoard[x][y] = random() > 0.999 ? { key: 1, anotherKey: 1 } : { key: 0, anotherKey: 0 };
            }
            if (y >= gameRows && currentBoard[x][y]["anotherKey"] == 1 && y <= (rows - 3)) {
                // nextBoard[x][y+ (Math.floor(Math.random() * 3))]["anotherKey"] = 1;
                nextBoard[x][y + 1]["anotherKey"] = 1;
                nextBoard[x][y + 2]["anotherKey"] = 1;
                currentBoard[x][y]["anotherKey"] = 0
            }
            if (y >= rows - 3 && currentBoard[x][y]["anotherKey"] == 1) {
                nextBoard[x][y]["anotherKey"] = 0
                currentBoard[x][y]["anotherKey"] = 0
            }
        }
    }
    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];

}



function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * gameRows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y]["key"] = 1;
    fill(boxColor); //CHANGEABLE COLOR for boxes' inner color when dragging
    stroke(strokeColor); //CHANGEABLE COLOR for boxes' border when dragging
    rect(x * unitLength, y * unitLength, unitLength, unitLength);

}

/**
 * When mouse is pressed
 */
function mousePressed() {
    if (mouseY < unitLength * gameRows || mouseY > unitLength * rows || mouseX < unitLength * 7 || mouseX > (unitLength * (columns - 7))) {
        return;
    } else {
        let bullet1 = {
            x: Math.floor(mouseX / unitLength) - 7,
            y: Math.floor(mouseY / unitLength) - 3
        }
        bullets1.push(bullet1);

        let bullet2 = {
            x: Math.floor(mouseX / unitLength) + 7,
            y: Math.floor(mouseY / unitLength) - 3
        }
        bullets2.push(bullet2);
    }

    noLoop();
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop()

}

document.querySelector('#reset-game')
    .addEventListener('click', function () {
        init();
    });


// document.querySelector('.play-pause')
//     .addEventListener('click', function () {
//         if (playPause.innerHTML === "PAUSE") {
//         playPause.innerHTML = "CONTINUE";
//         fr = 0;
//     } else {
//         playPause.innerHTML = "PAUSE"
//     }
// });
