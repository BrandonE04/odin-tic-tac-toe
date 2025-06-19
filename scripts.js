

class createGame{

    Player(name, symbol){
        let playerName = name;
        let playerSymbol = symbol;
        const getName = () => {return playerName};
        const setName = (name) => {playerName = name};

        const takeTurn = (x,y,box) => {
            if(this.scoreboard[x][y] === null){
                const symbolBox = document.createElement("p");
                symbolBox.setAttribute("class", "symbol");
                symbolBox.textContent = symbol;
                this.scoreboard[x][y] = symbol;
                box.appendChild(symbolBox);
            } 
        }

        return {getName, setName, takeTurn};
    }

    constructor()   {
        this.ROWNUMBER = 3;
        this.COLUMNNUMBER = 3;

        this.scoreboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        this.playerOneName = "One";
        this.playerTwoName = "Two";

        this.playerOne = this.Player(this.playerOneName, "X", this.scoreboard);
        this.playerTwo = this.Player(this.playerTwoName, "O", this.scoreboard);
    }
    
    printScoreboard = () => {
        console.log(this.scoreboard);
    }

    checkWin = () => {
        let count = 1;

        for(let i = 0; i < this.ROWNUMBER; i++){
            count = 1;
            for(let o = 1; o < this.ROWNUMBER; o++){
                if((this.scoreboard[i][o-1] === this.scoreboard[i][o]) && this.scoreboard[i][o] !== null){
                    count++;
                }
            }
            if(count === 3){
                return true;
            }
        }

        for(let i = 0; i < this.COLUMNNUMBER; i++){
            count = 1;
            for(let o = 1; o < this.COLUMNNUMBER; o++){
                if((this.scoreboard[o][i] === this.scoreboard[o-1][i]) && this.scoreboard[o][i] !== null){
                    count++;
                }
            }
            if(count === 3){
                return true;
            }
        }
        
        if(this.scoreboard[0][0] === this.scoreboard[1][1]){
            if((this.scoreboard[2][2] === this.scoreboard[1][1]) && this.scoreboard[1][1] !== null){
                return true;
            }
        }

        
        if(this.scoreboard[0][2] === this.scoreboard[1][1]){
            if((this.scoreboard[2][0] === this.scoreboard[1][1]) && this.scoreboard[1][1] !== null){
                return true;
            }
        }

        return false;

    }

    reset = () => {
        let symbols = document.querySelectorAll(".symbol");

        this.scoreboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
        ];

        for(let symbol of symbols){
            symbol.parentNode.removeChild(symbol);
        }
    }

    namePlayers(){
        this.playerOne.setName(document.forms["playerNames"]["playerOneName"].value);
        this.playerTwo.setName(document.forms["playerNames"]["playerTwoName"].value); 

        return false;
    }
      
    //return{playerOne, playerTwo, printScoreboard, checkWin, reset, namePlayers}
}

class playGame{
    constructor(){
        this.game =  new createGame();
        this.boxes = document.querySelectorAll(".box");
        this.display = document.querySelector(".display");
        this.reset = document.querySelector(".reset");

        for(let box of this.boxes){
            box.addEventListener("click", this.playTurn)
        }

        this.reset.addEventListener("click", this.game.reset);

        this.oddTurn = true;

    }
    
    playTurn = () => {
        if(this.oddTurn){
            this.game.playerOne.takeTurn(event.target.getAttribute("x"), event.target.getAttribute("y"), event.target);
            this.oddTurn = false;

            if(this.game.checkWin()){
                this.display.innerText = this.game.playerOne.getName() + " wins!";
            }
            else{
                this.display.innerText = this.game.playerTwo.getName() + "'s Turn";
            }
        }
        else{
            this.game.playerTwo.takeTurn(event.target.getAttribute("x"), event.target.getAttribute("y"), event.target);
            this.oddTurn = true;

            if(this.game.checkWin()){
                this.display.innerText = this.game.playerTwo.getName() + " wins!";
            }
            else{
                this.display.innerText = this.game.playerOne.getName() + "'s Turn";
            }
        }
        
    }

}

const game = new playGame();









