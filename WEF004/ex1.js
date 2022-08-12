window.onload = function () {
    console.log("Window is onloaded")
}

let boxClass = document.querySelector(".box-container")
let boxElems = document.querySelectorAll(".box") 
let whoseTurn = document.querySelector(".turn-wrapper")
let xTurn = document.querySelector(".x-score-box")
let oTurn = document.querySelector(".o-score-box")
let turn = 1;
let game = 1;


let restart = document.querySelector(".restart-btn")
let scores = document.querySelectorAll(".score")


function restartGame() {
        for (let boxElem of boxElems) {
            boxElem.innerHTML = ""
        }
        for (let score of scores) {
            score.innerHTML = "-"
        }
    }

let winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,8]
]


function win() {
    let scoreNow = []
    for (let boxElem of boxElems) {
        scoreNow.push(boxElem.innerHTML)
    }
    console.log(scoreNow)

for (let condition of winningConditions){
    let x = 0
    let o = 0
    for (let item of condition) {
        if (scoreNow[item] === "X") {
        x = x + 1
        }
        if (scoreNow[item] === "O") {
        o = o + 1
        }
        }
        if (x === 3 ) {
            alert("x wins")
        }
        if (o === 3 ) {
            alert("o wins")
        }
    }
}


function init() {
    if (game % 2 === 1) {
        turn = turn + 1
    }
    boxClass.addEventListener("click", function (event) {

        if (event.target.innerHTML !== "") {
            alert("This box has been checked")
        } else if (turn % 2 === 1) {
            event.target.innerHTML = "X";
            turn = turn + 1 // ("this is not occupied")
            whoseTurn.innerHTML = "O Turn";
            oTurn.setAttribute("status","active")
            xTurn.setAttribute("status","")

        } else if (turn % 2 === 0) {
            event.target.innerHTML = "O";
            turn = turn + 1;
            whoseTurn.innerHTML = "X Turn";
            xTurn.setAttribute("status","active")
            oTurn.setAttribute("status","")
        }

        if (true){
            win()
        }
    })

    restart.addEventListener("click", restartGame)
    
}




init()
