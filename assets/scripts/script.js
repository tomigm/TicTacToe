const Gameboard = (() => {
    
    
    
    let gameboard = [
       ["X", "X", "X"], // row
       ["X", "X", "X"],
       ["X", "X", "X"]
    ];
    let board = document.getElementById("board");

    let createRow = (row) => {
        let rowR = document.createElement("div");
        rowR.classList.add("row");
        board.appendChild(rowR);

        row.forEach(box => {
            let boxR = document.createElement("div");
            boxR.classList.add("box");
            boxR.textContent = box;
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