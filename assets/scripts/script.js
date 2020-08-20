
// &#9675; : Cricle
// &#9711 : Large circle
// &times : Cross

/* DUMMY
let gameboard = [
       ["&#9675", "&times", "&times"], // row
       ["&times", "&times", "&times"],
       ["&times", "&times", "&times"]
    ];
*/

//CREATES BOARD
const Gameboard = (() => {
    
    
    
    let gameboard = [
       ["", "", ""], // row
       ["", "", ""],
       ["", "", ""]
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

    let resetBoard = () => {
        // check if booklist has childs
         //if yes > while booklist have child, remove child
       if(board.hasChildNodes()) {
         
         while (board.hasChildNodes()) {
           board.removeChild(board.lastChild);
         }
         return
       }
       else {return}
       
       }

    let render = () => {
        resetBoard();
        gameboard.forEach(createRow);
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(div => div.addEventListener('click', gameflow.playerTurn))



    }
    return {
        gameboard,
        render
    }

})();

// CREATES NEW PLAYER
const Player = (name, sign) => {

    const getName = () => name;
    const getSign = () => sign
    let moves = 0;
    let getMoves = () => moves
    const play = event => {

        if (event.target.innerHTML != "") {return}
        moves += 1;
        let boxIndex = event.target.getAttribute('data-index');
        let rowIndex = event.target.parentNode.getAttribute('data-index');
        console.log (boxIndex);
        Gameboard.gameboard[rowIndex][boxIndex] = getSign();
        Gameboard.render();
        

    }
    return {getMoves, play}
}

//CHOOSE TURN
const Gameflow = () => {
    
    const playerTurn = event => {
        
        
        if (playerOne.getMoves() == playerTwo.getMoves()){
            
           playerOne.play(event);
           

        }

        else if (playerOne.getMoves() > playerTwo.getMoves()){

            playerTwo.play(event);

        }
        else {return}
        
    };
    

    return {playerTurn};
    
};



const gameflow = Gameflow();
const playerOne = Player('one', '&times');
const playerTwo = Player('two', '&#9675');
Gameboard.render();








