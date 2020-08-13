
// &#9675; : Cricle
// &#9711 : Large circle
// &times : Cross


const Gameboard = (() => {
    
    
    
    let gameboard = [
       ["&#9675", "&times", "&times"], // row
       ["&times", "&times", "&times"],
       ["&times", "&times", "&times"]
    ];
    let board = document.getElementById("board");

    let createRow = (row) => {
        let rowR = document.createElement("div");
        rowR.classList.add("row");
        board.appendChild(rowR);

        row.forEach(box => {
            let boxR = document.createElement("div");
            boxR.classList.add("box");
            boxR.innerHTML = box;
            rowR.appendChild(boxR);          
            
        })
    }

    let render = () => {
        gameboard.forEach(row => createRow(row));


    }
    return {
        
        render
    }

})();


const Player = (name) => {

    

    const play = function () {

    }
}

Gameboard.render();