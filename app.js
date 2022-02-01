//HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//game constants
const xSymbol = '✖';
const oSymbol ='○';
// game variables

//Game is live by default, when there is a winner or a tie, we will change this to false
let gameIsLive = true;
//X is always first, so we start the game with X, we will later make this false when it is O's turn
let xIsNext = true;
let winner = null;

//functions
const letterToSymbol = function(letter){
    if (letter === 'x'){
        return xSymbol;  
    }else{
        return oSymbol;
    }
}
//Lets look to see if the cell has an X or an O
const checkGameStatus = function(){
    //we check each individual cell from 0-8 and look at the third class because that is where we are storing the X or )
    const topLeft = cellDivs[0].classList[2];
    const topmid = cellDivs[1].classList[2];
    const topright = cellDivs[2].classList[2];
    const midleft = cellDivs[3].classList[2];
    const midmid = cellDivs[4].classList[2];
    const midright = cellDivs[5].classList[2];
    const botleft = cellDivs[6].classList[2];
    const botmid = cellDivs[7].classList[2];
    const botright = cellDivs[8].classList[2];

//Check winner?
    //if top left is equal to top middle and top right, that is a win
    if(topLeft && topLeft === topmid && topLeft === topright){
        //if there is a winner, game is live will be false
        gameIsLive = false;
        winner = topLeft; 
        statusDiv.innerHTML = `${letterToSymbol(topLeft)} has won!`;
    }   
};


// event handlers
const handleReset = function(e){
    console.log(e);
}
const handleCellClick = function(e){
    //we will add to the cells using classes
    //grab the class list and assign to variable so we just reference it and not have to type it out e.target.classlist
    const classList = e.target.classList;
    const location = classList[1]

    //we have to make it so that if the cell already has an X or an O, we do not use that cell
    //we are adding the X or O class to the third class or 2nd index of the class: game-cell, position, {x||o}
    //if the second index in our class list is X or O, do nothing
    if (classList[2] === 'x' || classList[2] ==='o'){
        return;
    }
    //if it is empty, then depending on who's turn it is, add and X or O
    if(xIsNext){
        //lets add the class x to the cell that player x selects
        classList.add('x');
        checkGameStatus();
        xIsNext = !xIsNext;
    } else{
        //lets add the class o to the cell that player o selects
        classList.add('o');
        checkGameStatus();
        xIsNext = !xIsNext;
    }
};

// event listeners
resetDiv.addEventListener('click', handleReset)

for(const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}