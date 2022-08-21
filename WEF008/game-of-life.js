let unitLength = 8;
const boxColor = ("#000000");
const strokeColor = 50;
let slider = document.querySelector("#myRange")
let frameRateText = document.querySelector(".framerate")
let pauseButton = document.querySelector(".pause-button")
let clearButton = document.querySelector(".clear-button")
let restartButton = document.querySelector(".restart-button")
let buttons = document.querySelectorAll(".custom-button-2")
let deselect = document.querySelector(".deselect")
let active = document.querySelector(".active")
let gunElement = document.querySelector(".gun")
let gliderElement = document.querySelector(".glider")
let trainElement = document.querySelector(".train")    
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr;
let x;
let y;
let gosperGliderPattern = []
let gosperGliderPatternConverted = [];
let gosperGliderCode = `........................O...........
......................O.O...........
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO..............
OO........O...O.OO....O.O...........
..........O.....O.......O...........
...........O...O....................
............OO......................`
let gliderPattern = []
let gliderPatternConverted = [];
let gliderCode = `OOO
O..
.O.`

let trainPattern = []
let trainPatternConverted = [];
let trainCode = `..............................O............
...............................O...........
.........................O.....O...........
....O.....................OOOOOO.....OOOOOO
.....O..............................O.....O
O....O....................................O
.OOOOO..............................O....O.
......................................OO...
...........................................
.....................................O.....
....................................O......
...................................OO...OO.
...................................O.O...OO
....................................O...OO.
........................................O..
...........................................
........................................O..
....................................O...OO.
...................................O.O...OO
...................................OO...OO.
....................................O......
.....................................O.....
...........................................
......................................OO...
.OOOOO..............................O....O.
O....O....................................O
.....O..............................O.....O
....O.....................OOOOOO.....OOOOOO
.........................O.....O...........
...............................O...........
..............................O............`

function patternGenerate(codeString, arrayRaw, arrayConverted) {
    arrayRaw.push(codeString.split("\n"))
    for (let x = 0; x < arrayRaw[0].length; x++) {
        arrayConverted[x] = []
        for (let y = 0; y < arrayRaw[0][0].length; y++) {
            if (arrayRaw[0][x][y] === ".") {
                arrayConverted[x][y] = 0
            } else if (arrayRaw[0][x][y] === "O") {
                arrayConverted[x][y] = 1
            }
        }
    }
}

patternGenerate(gosperGliderCode, gosperGliderPattern, gosperGliderPatternConverted)
patternGenerate(gliderCode, gliderPattern, gliderPatternConverted)
patternGenerate(trainCode, trainPattern, trainPatternConverted)


function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 200);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }

    fr = 30;
    frameRate(fr);
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = random() > 0.8 ? 1 : 0;
            nextBoard[i][j] = 0;
        }
    }
}

function draw() {
    background("#FEF5ED");
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                // fill(Math.floor(Math.random() * 200),Math.floor(Math.random() * 200),Math.floor(Math.random() * 200));  
                fill(135, 155, 140)


                stroke("#000000");
            } else {
                fill(255, 255, Math.floor(Math.random() * 65) + 190)

                stroke("#000000");
            }
            rect(i * unitLength, j * unitLength, unitLength, unitLength);

        }
    }
}

function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
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
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255));
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    frameRate(0);
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    if (fr === undefined) {
        frameRate(30);
    } else if (pauseButton.innerHTML === "CONTINUE") {
        return;
    } else {
        frameRate(fr);
    }
    if (gunElement.classList.contains("active")) {
        glidergun()
    } else if (gliderElement.classList.contains("active")) {
        glider() 
    } else if (trainElement.classList.contains("active")) {    
        train()
}
}

// document.querySelector('#reset-game')
// 	.addEventListener('click', function() {
// 		init();
// 	});

slider.oninput = function () {
    fr = this.value * 1;
    frameRateText.innerHTML = `Frame per sec: ${fr}`;
    if (pauseButton.innerHTML === "CONTINUE") {
        return;
    } else {
        frameRate(fr);
    }
}
function pauseStart() {
    pauseButton.classList.toggle("pause-active");

    if (pauseButton.classList.contains("pause-active")) {
        pauseButton.innerHTML = "CONTINUE";
        frameRate(0);
    } else {
        pauseButton.innerHTML = "PAUSE";
        if (fr === undefined) {
            frameRate(30);
        } else {
            frameRate(fr);
        }
    }
}
pauseButton.addEventListener("click", pauseStart)

clearButton.addEventListener("click", function () {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            currentBoard[x][y] = 0
            if (pauseButton.innerHTML === "CONTINUE") {
                noLoop();
            }
        }
    }
})

clearButton.addEventListener("mouseleave", function () {
    if (pauseButton.innerHTML === "CONTINUE") {
        loop()
        frameRate(0);
    }
})


restartButton.addEventListener("click", function () {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            currentBoard[x][y] = random() > 0.8 ? 1 : 0;
            nextBoard[x][y] = 0;
            if (pauseButton.classList.contains("pause-active")) {
                pauseButton.classList.remove("pause-active");
                pauseButton.innerHTML = "PAUSE";
                frameRate(fr);
            }
        }
    }
})

window.addEventListener('keydown', function (e) {
    let keyID = e.code
    x = Math.floor(width / 2 / unitLength);
    y = Math.floor(height / 2 / unitLength);

    if (keyID === 'Space') {
        pauseStart()
    }
}
)

function glidergun() {
    for (let i = 0; i < gosperGliderPatternConverted.length; i++) {
        for (let j = 0; j < gosperGliderPatternConverted[i].length; j++) {
            const x = Math.floor(mouseX / unitLength);
            const y = Math.floor(mouseY / unitLength);
            currentBoard[j + x][i + y] = gosperGliderPatternConverted[i][j]
        }
    }
}

function glider() {
    for (let i = 0; i < gliderPatternConverted.length; i++) {
        for (let j = 0; j < gliderPatternConverted[i].length; j++) {
            const x = Math.floor(mouseX / unitLength);
            const y = Math.floor(mouseY / unitLength);
            currentBoard[j + x][i + y] = gliderPatternConverted[i][j]
        }
    }
}

function train() {
    for (let i = 0; i < trainPatternConverted.length; i++) {
        for (let j = 0; j < trainPatternConverted[i].length; j++) {
            const x = Math.floor(mouseX / unitLength);
            const y = Math.floor(mouseY / unitLength);
            currentBoard[j + x][i + y] = trainPatternConverted[i][j]
        }
    }
}

for (let button of buttons) {
    button.addEventListener("click", function (event) {
        for (let button of buttons) {
                button.classList.remove("active");
        }
        event.target.classList.toggle("active")
        }) 
}

deselect.addEventListener("click", function (event) {
    for (let button of buttons) {
        button.classList.remove("active");
    }
})

window.addEventListener('resize', function() {
    unitLength = window.innerHeight / height * 8;
    init()
});




//>>>>>>>>>>>>>>>> DONE - Control speed of the Game of Life. (Checkout framerate, you can use slider to control the framerate )
// Allow users to change the rules of survival.
// Allow users to change the rules of reproduction.
//>>>>>>>>>>>>>>>> DONE - Start/Stop the Game of life
//>>>>>>>>>>>>>>>> DONE - Multiple colors of life on the same board.
// Darken colors for stable life.
//>>>>>>>>>>>>>>>> DONE -  Random initial states
//>>>>>>>>>>>>>>>> DONE -  Well-known patterns of Game of Life to select from(Examples:Gosper Glider Gun, Glider, Lightweight train).
// Use Keyboard to control the cursor to place the life
// Resize board on windows resize(Check out windowsResized)
//>>>>>>>>>>>>>>>> DONE -  Switching between different styles.
//>>>>>>>>>>>>>>>> DONE -  Anything else that you could think of.