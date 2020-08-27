
// &#9675; : Cricle    &#9711 : Large circle    &times : Cross

//CREATES BOARD
const Gameboard = (() => {
    
    let board = [             
       ["", "", ""], // row
       ["", "", ""],
       ["", "", ""],       
    ];
    const resetArray = function() {        
        for (let row = 0; row < board.length; row++) {          
            for (let box = 0; box < board[row].length; box++) {
                board[row][box] = "";
            }
        }
    }   
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
        render,
        resetArray,
    }

})();

// CREATES NEW PLAYER
const Player = (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;
    const points = 0;
    let moves = 0;
    let getMoves = () => moves;
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
    const resetValues = function(reset) {
        moves = reset;
        
    }
    return {getMoves, getName, play, points, resetValues}
}

//CHOOSE TURN
const Gameflow = () => {
    // &#9675; : Cricle
    // &#9711 : Large circle
    // &times : Cross
    let winSign = "";

    const newGame = function() {
        playerOne = Player(`${HtmlFunctionality.P1name.value}`, '&times');
        playerTwo = Player(`${HtmlFunctionality.P2name.value}`, '&#9675');
        restartGame();
        HtmlFunctionality.p1Points.textContent = '0';
        HtmlFunctionality.p2Points.textContent = '0';
        HtmlFunctionality.displayName.textContent = ':)'
        Gameboard.render();
    }
    
    const restartGame = function () {
        winSign = "";
        playerOne.resetValues(0)
        playerTwo.resetValues(0)
        Gameboard.resetArray();
        return Gameboard.render();
    }

    const roundWinner = function () {
        let totalPlays = playerOne.getMoves() + playerTwo.getMoves();
            if (winSign === '&times') {               
                playerOne.points += 1;
                HtmlFunctionality.displayName.textContent = `${playerOne.getName()} wins` // TODO DOM
                HtmlFunctionality.p1Points.textContent = playerOne.points;
                return restartGame();                
            }
            else if (winSign === '&#9675') {
                playerTwo.points += 1;
                HtmlFunctionality.displayName.textContent = `${playerTwo.getName()} wins`;
                HtmlFunctionality.p2Points.textContent = playerTwo.points; // TODO DOM                
                return restartGame();
            }
            else if (totalPlays === 9) {
                HtmlFunctionality.displayName.textContent = 'TIE!'; // TODO DOM
                return restartGame();
            }
            else {console.log('playing...')}
        }

    const gameCheck = function (){
    
        let arr = Gameboard.board
        // Check for horizontal win 
        for (let i = 0; i < arr.length; i++) {
                if (arr[i][0] !== "" && arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2]){
                    if (winSign == ""){
                    winSign = arr[i][0] ;
                    return roundWinner(); 
                    }break;           
            }
        }
        // Check for vertical win 
        for (let i = 0; i < arr.length; i++){
                if (arr[0][i] !== "" && arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i] ){
                    if (winSign == ""){
                    winSign = arr[0][i];
                    return roundWinner(); 
                    }break;                   
            }
        }
        // Check for diagonal win (upper left to bottom right) || Check for diagonal win (upper right to bottom left)
        if ((arr[0][0] !== "" && arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) || (arr[0][0] !== "" && arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0])){
            if (winSign == ""){
                winSign = arr[1][1];
                return roundWinner(); 
            }            
        }            
        return roundWinner();
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
        return {playerTurn, gameCheck, newGame};   
};

let playerOne, playerTwo;
const gameflow = Gameflow();

//* THIS BLOCK SETS ALL HTML INTERACTION & DOM MANIPULATION 
const HtmlFunctionality = (() => {
    const display = document.getElementById("display");
    let displayName = document.getElementById('displayName'); 
    let p1Points = document.getElementById('p1Points');
    let p2Points = document.getElementById('p2Points'); 
    let P1name = document.getElementById('playerOne');
    let P2name = document.getElementById('playerTwo');
    const play = document.getElementById('playBtn');
play.addEventListener('click', gameflow.newGame);

    // Get the modal
    const modal = document.getElementById("modal");    
    // Get the button that opens the modal
    const openModal = document.getElementById("newGame");    
    // Get the <span> element that closes the modal
    const closeModal = document.getElementsByClassName("close")[0];    
    // When the user clicks the button, open the modal 
    openModal.onclick = function() {
      modal.style.display = "block";    
    }    
    // When the user clicks on <span> (x), close the modal
    closeModal.onclick = function() {
      modal.style.display = "none";
    }
    play.onclick = function () {
        modal.style.display = "none"
    }
    return {display, displayName, p1Points, p2Points, P1name, P2name}

})()

HtmlFunctionality;