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
        let playerScore = 0;
        let playerName = name;
        let playerSymbol = symbol;

        const getPlayerScore = () => playerScore;
        const givePlayerScore = () => playerScore++;
        const givePlayerName = () => console.log(playerName + " " 
            + playerSymbol);

        const takeTurn = (x,y,box) => {
            if(scoreboard[x][y] === null){
                const symbolBox = document.createElement("p");
                symbolBox.setAttribute("class", "symbol");
                symbolBox.textContent = symbol;
                scoreboard[x][y] = symbol;
                box.appendChild(symbolBox);
            } 
        }

        return {getPlayerScore, givePlayerScore, givePlayerName, takeTurn};
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

    

    const playerOne = Player("One", "X");
    const playerTwo = Player("Two", "O");

    return{playerOne, playerTwo, printScoreboard, checkWin, reset}
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
                display.innerText = "Player 1 wins!";
            }
            else{
                display.innerText = "Player 2's Turn";
            }
        }
        else{
            game.playerTwo.takeTurn(this.getAttribute("x"), this.getAttribute("y"), this);
            oddTurn = true;

            if(game.checkWin()){
                display.innerText = "Player 2 wins!";
            }
            else{
                display.innerText = "Player 1's Turn";
            }
        }
        
    }
}

playGame();









