'use strict';

let secretNumber = 0;

focusGuess();
getRandomNumber();

document.querySelector('.btn-again').addEventListener('click', function(){
    location.reload();
});

document.querySelector('.check').addEventListener('click', () => { 

    checkGreaterOrLessThan();
    checkForWin();
    checkForLoss();
    focusGuess();
})

window.addEventListener('keydown', (e) => { 
    
    if(e.key === "Enter"){
        
    document.querySelector('.check').click();

    } else if (e.key === "ArrowUp"){
        
        document.querySelector('.guess').value + 1;
    } else if (e.key === "ArrowDown"){
        document.querySelector('.guess').value - 1;
    }
    
})

function getRandomNumber () {

    let number = Math.floor(Math.random() * 20);
    if(number === 0 ) number = Math.floor(Math.random() * 20);
    
    return (secretNumber = number);
}

function checkForLoss(){
    let score = Number(document.querySelector('.score').textContent);

    if(score === 0 ){
        changeMessage("No more points. You lost this round. You can try again.");
    }
}

function checkGreaterOrLessThan(){
    const guess = Number(document.querySelector('.guess').value);
    if(secretNumber > guess){
        changeMessage("I would guess it's a bit more...");
    } else if(guess === 42){
        changeMessage(" ... the answer to life, the universe and everything.");
    }  else if (secretNumber < guess){
        changeMessage("You're a little bit too high...");
    } else if(guess > 20 || guess < 1){
        changeMessage("I don't think you understand this game of between 1 and 20...");
    }  

}

function checkForWin(){
    
    const guess = Number(document.querySelector('.guess').value);
    let score = Number(document.querySelector('.score').textContent);
    let highscore = Number(document.querySelector('.highscore').textContent);
    
    if(secretNumber === guess ){
        
        if(highscore === 0){
        
            changeScore(score);
            
        }   else {
            
            let newHiScore = 0;
            newHiScore = highscore + score;
            
            changeScore(newHiScore);
        }

        changeMessage("Correct Number! YOU WIN!!");
        startNewgame();
        
    } else if (secretNumber != guess){ 
        document.querySelector('.score').textContent = score - 1;
    }
}

function changeScore(score){
    document.querySelector('.highscore').textContent = score;
    document.querySelector('.guess').textContent = '';
    document.querySelector('.check').style.display = 'none';
}

function changeMessage(string){
document.querySelector('.message').textContent = string; 
}

function focusGuess(){
    document.querySelector('.guess').focus();
}

function init() {
    
    getRandomNumber();
    
    document.querySelector('.guess').value = '';
    document.querySelector('.message').textContent = "Start Guessing...";
    document.querySelector('.check').style.display = 'block';
    document.querySelector('.score').textContent = 20;
    
}

function startNewgame(){
    
    let timeleft = 3;
    const timerNewGame = setInterval( function(){
        if(timeleft <= 0){
            clearInterval(timerNewGame);
            init();
        }   else{ 
            changeMessage(`New game starting in ${timeleft} seconds`); 
    } timeleft -= 1;
}, 1000)
}

