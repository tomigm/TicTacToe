
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
    
    let board = [             
       ["", "", ""], // row
       ["", "", ""],
       ["", "", ""],       
    ];

    let boardDOM = document.getElementById("board");

    let createRow = (row, index) => {
        let rowR = document.createElement("div");
        rowR.classList.add("row");
        
        rowR.dataset.index = index;
        boardDOM.appendChild(rowR);

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
       if(boardDOM.hasChildNodes()) {
         
         while (boardDOM.hasChildNodes()) {
           boardDOM.removeChild(boardDOM.lastChild);
         }
         return
       }
       else {return}
       
       }

    let render = () => {
        resetBoard();
        board.forEach(createRow);
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(div => div.addEventListener('click', gameflow.playerTurn))



    }
    return {
        board,
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
        Gameboard.board[rowIndex][boxIndex] = getSign();
        Gameboard.render();
        gameflow.gameCheck();
        

    }
    return {getMoves, play}
}

//CHOOSE TURN
const Gameflow = () => {
    const gameCheck = function (){
        

let winSign = 'tie';
let arr = Gameboard.board
 // Check for horizontal win 
for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] !== "" && arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2]){
            if (winSign == 'tie'){
            winSign = arr[i][0] ;
            return console.log (winSign); //TODO HACER QUE SEGUN EL SIGNO, ME DEVUELVA EL PLAYER
            }break;           
	}
}

 // Check for vertical win 
for (let i = 0; i < arr.length; i++){
        if (arr[0][i] !== "" && arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i] ){
            if (winSign == 'tie'){
            winSign = arr[0][i];
            return console.log (winSign); //TODO
            }break;                   
	}
}

 // Check for diagonal win (upper left to bottom right) || Check for diagonal win (upper right to bottom left)
 if ((arr[0][0] !== "" && arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) || (arr[0][0] !== "" && arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0])){
    if (winSign == 'tie'){
        winSign = arr[1][1];
        return console.log (winSign); //TODO
    }
    
}
      
        console.log (winSign);
    }

    const playerTurn = event => {
        
        if (playerOne.getMoves() == playerTwo.getMoves()){
            
           playerOne.play(event);
           
        }

        else if (playerOne.getMoves() > playerTwo.getMoves()){

            playerTwo.play(event);
        }
        else {return}

    }

    return {playerTurn, gameCheck};   
};

const gameflow = Gameflow();
const playerOne = Player('one', '&times');
const playerTwo = Player('two', '&#9675');
Gameboard.render();





