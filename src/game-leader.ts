// Game leader class
class GameLeader {


    constructor () {

    }

    startGame() {
        appState.correctNumber = Math.floor(Math.random() * 20) + 1;
    }

    public handleUserGuess(value: number) {
        appState.makeGuess(value);
        appState.addGuessToPlayer();
        this.nextPlayer();
    }

    public timeOut() {
        this.nextPlayer();
    }

    public async nextPlayer() {
        
        
        if (appState.numberGuessed === appState.correctNumber) {
            appState.updateHighscore(appState.getCurrentPlayer());
            appState.nextPage(new EndPage());
            game.updateUI();
            return;
        }

        const nextPlayer = appState.nextPlayer();

        appState.nextPage(new PlayPage());
        game.updateUI();
        
        if (appState.getLastPlayer().isHuman()) {
            await sleep(2000);
        }

        if (!nextPlayer.isHuman()) {
            const botPlayer = nextPlayer;
            appState.makeGuess(botPlayer.makeGuess());
            await sleep(2000);
            if (appState.numberGuessed !== appState.correctNumber) {
                appState.nextPage(new PlayPage());
                game.updateUI();
                await sleep(2000);
            }
            this.nextPlayer();
        }
    }   
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }