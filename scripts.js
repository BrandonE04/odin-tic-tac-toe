function createGame(){
    const ROWNUMBER = 3;
    const COLUMNNUMBER = 3;

    let scoreboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const printScoreboard = () => {
        console.log(scoreboard);
    }

    const checkWin = () => {
        let count = 1;

        for(let i = 0; i < ROWNUMBER; i++){
            count = 1;
            for(let o = 1; o < ROWNUMBER; o++){
                if((scoreboard[i][o-1] === scoreboard[i][o]) && scoreboard[i][o] !== null){
                    count++;
                }
            }
            if(count === 3){
                return true;
            }
        }

        for(let i = 0; i < COLUMNNUMBER; i++){
            count = 1;
            for(let o = 1; o < COLUMNNUMBER; o++){
                if((scoreboard[o][i] === scoreboard[o-1][i]) && scoreboard[o][i] !== null){
                    count++;
                }
            }
            if(count === 3){
                return true;
            }
        }
        
        if(scoreboard[0][0] === scoreboard[1][1]){
            if((scoreboard[2][2] === scoreboard[1][1]) && scoreboard[1][1] !== null){
                return true;
            }
        }

        
        if(scoreboard[0][2] === scoreboard[1][1]){
            if((scoreboard[2][0] === scoreboard[1][1]) && scoreboard[1][1] !== null){
                return true;
            }
        }

        return false;

    }

    function Player(name, symbol){
        let playerName = name;
        let playerSymbol = symbol;
        const getName = () => {return playerName};
        const setName = (name) => {playerName = name};

        const takeTurn = (x,y,box) => {
            if(scoreboard[x][y] === null){
                const symbolBox = document.createElement("p");
                symbolBox.setAttribute("class", "symbol");
                symbolBox.textContent = symbol;
                scoreboard[x][y] = symbol;
                box.appendChild(symbolBox);
            } 
        }

        return {getName, setName, takeTurn};
    }

    function reset(){
        symbols = document.querySelectorAll(".symbol");

        scoreboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
        ];

        for(symbol of symbols){
            symbol.parentNode.removeChild(symbol);
        }
    }

    let playerOneName = "One";
    let playerTwoName = "Two";

    function namePlayers(){
        playerOne.setName(document.forms["playerNames"]["playerOneName"].value);
        playerTwo.setName(document.forms["playerNames"]["playerTwoName"].value); 

        return false;
    }
      
    const playerOne = Player(playerOneName, "X");
    const playerTwo = Player(playerTwoName, "O");

    return{playerOne, playerTwo, printScoreboard, checkWin, reset, namePlayers}
}

function playGame(){
    const game = createGame();
    const boxes = document.querySelectorAll(".box");
    const display = document.querySelector(".display");
    const reset = document.querySelector(".reset");

    for(box of boxes){
        box.addEventListener("click", playTurn)
    }

    reset.addEventListener("click", game.reset);

    let oddTurn = true;

    function playTurn(){
        if(oddTurn){
            game.playerOne.takeTurn(this.getAttribute("x"), this.getAttribute("y"), this);
            oddTurn = false;

            if(game.checkWin()){
                display.innerText = game.playerOne.getName() + " wins!";
            }
            else{
                display.innerText = game.playerTwo.getName() + "'s Turn";
            }
        }
        else{
            game.playerTwo.takeTurn(this.getAttribute("x"), this.getAttribute("y"), this);
            oddTurn = true;

            if(game.checkWin()){
                display.innerText = game.playerTwo.getName() + " wins!";
            }
            else{
                display.innerText = game.playerOne.getName() + "'s Turn";
            }
        }
        
    }

    return game;
}

const game = playGame();









