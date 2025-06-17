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

        const takeTurn = (x,y) => {
            if(scoreboard[x][y] === null){
                scoreboard[x][y] = symbol;
            } 
        }

        return {getPlayerScore, givePlayerScore, givePlayerName, takeTurn};
    }

    const playerOne = Player("One", "X");
    const playerTwo = Player("Two", "O");

    return{playerOne, playerTwo, printScoreboard, checkWin}
}

function playGame(){
    game = createGame();

    while(game.checkWin() === false){
        game.playerOne.takeTurn();
        game.playerTwo.takeTurn();
    }
}




