
// &#9675; : Cricle
// &#9711 : Large circle
// &times : Cross

//CREATES BOARD
const Gameboard = (() => {
    
    
    
    let gameboard = [
       ["&#9675", "&times", "&times"], // row
       ["&times", "&times", "&times"],
       ["&times", "&times", "&times"]
    ];
    let board = document.getElementById("board");

    let createRow = (row, index) => {
        let rowR = document.createElement("div");
        rowR.classList.add("row");
        
        rowR.dataset.index = index;
        board.appendChild(rowR);

        row.forEach(function (box, index) {
            let boxR = document.createElement("div");
            boxR.classList.add("box");
            boxR.innerHTML = box;
            
            boxR.dataset.index = index;
            rowR.appendChild(boxR);          
            
        })
    }

    let render = () => {
        gameboard.forEach(createRow);


    }
    return {
        
        render
    }

})();

// CREATES NEW PLAYER
const Player = (name) => {

    const getName = () => name;

    const play = function () {

    }
}

//CREATES NEW GAME
const Game = () => {

}

Gameboard.render();