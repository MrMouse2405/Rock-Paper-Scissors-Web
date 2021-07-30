//Caching The DOM
let userScore = 0;
let compScore = 0;

const maxScore = 10;

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("computer-score");

const scoreBoard_div = document.querySelector(".score-board");
const result_div     = document.querySelector(".result > p");
const message_div    = document.getElementById("action-message");

const rock_div     = document.getElementById("Rock");
const paper_div    = document.getElementById("Paper");
const scissors_div = document.getElementById("Scissors");

const disabled_CSSClass = "disabledChoice";
const enabled_CSSClass  = "choice";


/*

    Choices

    1 : Rock
    2 : Paper
    3 : Scissors

    Paper beats Scissors
    So,
        Paper: 2 
        Rock: 1

        2 > 1
    
    Scissor Beat Paper
    So,
        Scissor: 3
        Paper: 2

        3 > 2

    Rock Beats Scissor
    So,
        Rock: 1
        Scissor: 3

        3 - 1 = 2

        Read function game to understand full logic


    Each game has Rounds.
    
    Each round can be won by user or computer, or it can end in a draw

    Game ends when user or computer wins 10 points.

    5 seconds after the game ends, new game starts.

*/

//array Holding Choices
const Choices = ["Rock","Paper","Scissors"];


/* User Controls */

//Events Listerners
const EventListeners = {
    Rock : null,
    Paper: null,
    Scissors: null
}

//Adding Events Listeners
function addEventListeners() {
    //Rock
    rock_div.addEventListener('click',EventListeners.Rock);
    
    //Paper
    paper_div.addEventListener('click',EventListeners.Paper);
    
    //Scissors
    scissors_div.addEventListener('click',EventListeners.Scissors);

    //Changing CSS to show that controls are enabled 
    rock_div.className     = enabled_CSSClass;
    paper_div.className    = enabled_CSSClass;
    scissors_div.className = enabled_CSSClass;

    //Telling user to make their move
    message_div.textContent = "Make your move!"
}

//Removing Events Listeners
function removeEventListeners() {
    //Rock
    rock_div.removeEventListener('click',EventListeners.Rock);
    
    //Paper
    paper_div.removeEventListener('click',EventListeners.Paper);
    
    //Scissors
    scissors_div.removeEventListener('click',EventListeners.Scissors);

    //Changing CSS to show that controls are disabled
    rock_div.className     = disabled_CSSClass;
    paper_div.className    = disabled_CSSClass;
    scissors_div.className = disabled_CSSClass;

    //Removing the message for making their move.
    message_div.textContent = ""
}

/* Round Logic */

//function for making player win the round
function winRound(userChoice,computerChoice) {

    //Incrementing user score
    userScore++;

    //Showing Score
    userScore_span.textContent = userScore;
    
    //Showing Result
    result_div.innerHTML = Choices[userChoice] + " (you) " + " beats " + Choices[computerChoice] + " (comp). You win! 👏 " ;

}

//function for making computer win the round
function loseRound(userChoice,computerChoice) {

    //Incrementing computer score
    compScore++;

    //Showing Score
    compScore_span.textContent = compScore;

    //Showing Result
    result_div.innerHTML = Choices[computerChoice] + " (comp) " + " beats " + Choices[userChoice] + " (you). You loose. ＞﹏＜" ;

}

//function if the round ends in draw
function drawRound(userChoice,computerChoice) {

    //Showing Result
    result_div.innerHTML = Choices[computerChoice] + " (user) " + " is same as  " + Choices[userChoice] + " (comp). It's a draw! " ;

}

/* Game Logic */

//function for reseting the game
function reset() {
    
    //Enabling Controls
    addEventListeners();

    //Showing that user can play the game(in our case, just empty the result)
    result_div.textContent = "";

    //Reseting Scores
    userScore_span.textContent = 0;
    compScore_span.textContent = 0;

    userScore = 0;
    compScore = 0;
}


//function for making user win the game NOT round
function winGame() {

    //Disabling Controls
    removeEventListeners();

    //Displaying that user won.
    result_div.textContent = "You won the game by " + userScore + ":" + compScore + " 👏";

    //Reseting the game after 5 sec
    setTimeout(reset,5000);
}


//function for making computer win the game
function loseGame() {

    //Disabling Controls
    removeEventListeners();

    //Displaying that user won.
    result_div.textContent = "You lost the game by " + userScore + ":" + compScore + " ＞﹏＜";

    //Reseting the game after 5 sec
    setTimeout(reset,5000);
    
}

//function to define winner of each round and then game
function game(userChoice) {

    //Getting the Computer Choice
    let computerChoice = Math.floor(Math.random() * 3);
  
    //Deciding Current Round's Winner
    if (computerChoice - userChoice == 2 || userChoice > computerChoice) {
        winRound(userChoice,computerChoice);
    }
    else if(userChoice - computerChoice == 2 || computerChoice > userChoice) {
        loseRound(userChoice,computerChoice);
    }
    else { 
        drawRound(userChoice,computerChoice);
    }

    //Checking 
    if (userScore == maxScore) {
        winGame();
    }
    else if(compScore == maxScore) {
        loseGame();
    }
}

/* Main */

function main() {

    //Settings up controls
    EventListeners.Rock     = ()=>game(0);
    EventListeners.Paper    = ()=>game(1);
    EventListeners.Scissors = ()=>game(2);

    //Initializing controls
    addEventListeners();
}

main()