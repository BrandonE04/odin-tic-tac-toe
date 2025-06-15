function createGame(){
    let scoreboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    function createPlayers(){
        let playerOneScore = 0;
        let playerTwoScore = 0;

        const getPlayerOneScore = () => playerOneScore;
        const getPlayerTwoScore = () => playerTwoScore;
        const givePlayerOneScore = () => playerOneScore++;
        const givePlayerTwoScore = () => playerTwoScore++;

        return {getPlayerOneScore, getPlayerTwoScore, givePlayerOneScore, givePlayerTwoScore};
    }

}



runGame();
