// set the variables
// sets the game up to start
let grid= document.querySelector('.grid');
let popup = document.querySelector('.popup');
let playAgain = document.querySelector('.playAgain');
let scoreDisplay = document.querySelector('.scoreDisplay');
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let bottom = document.querySelector('bottom');
let up = document.querySelector('up');
// width sets our left to right movement
let width = 10;
// establish index's for the snake and the apples so we can count
let currentIndex = 0;
let appleIndex = 0;
// set snake lives
let currentSnake = [2, 1, 0];
// up basically equals 1 logically
let direction = 1;
let score = 0;
// speed will increase as snake gets bigger, the intervalTime = interval*speed
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

//event listeners go here

// functions to be used
// basically acts as the render to load up the game. Will replace with proper render function as this is currently breaking my code
function init() {
    let squares= document.querySelectorAll('.grid div');
    //random apples initiates
    randomApples(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake= [2, 1, 0];
    currentIndex= 0;
    currentSnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcome, intervalTime);
}
document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('keyup', control);
    createBoard();
    startGame();
    playAgain.addEventListener('click', replay);
})

function renderBoard() {
//close the popup
    popup.style.display = 'none';
// initiats a 10x10 board
    for(let i = 0; 1<100; i++) {
        let div = document.createElement('div');
        grid.appendChild(div);
    }
}

//check if we hit a barrier or anything else
function moveOutcome() {
    let squares = document.querySelectorAll('.grid div');
    if (checkForHits(squares)) {
        alert('You hit something!');
        popup.style.display ='flex';
        return clearInterval(interval);
    } else {
        moveSnakes(squares);
    }
}

// if we hit nothing the snake moves from one dive to the next

function moveSnakes(squares) {
    // move tail from last spot
    let tail = currentSnake.pop();
    square[tail].classList.remove('snake');
    //push foward one unit in direction of input
    currentSnake.unshift(currentSnake[0]+direction);
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add('snake');
}

function checkForHits(squares) {
    if(
       // checks to see if next move would place snake out of board
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
       // checks to see the corners  (all corner divs end in 9)
        (currentSnake[0] % width === width -1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1)||
       //checks to see if snake is hitting itself
        squares[currentSnake[0] + directon].classList.contains('snake')
    ){
        return true;
    } else {
        return false;
    }
}

function eatApple(sqaures, tail) {
    //checks if snake is hitting an apple
    if (squares[currentSnake[0]].classList.contains('apples')) {
       // executes function to remove the apple from board and make the snake bigger
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        // put another apple on board in new random location
        randomApples(square);
        // increase score and update UI Display
        score++;
        scoreDisplay.textContent = score;
        // update the time interval to increase snake speed
        clearInterval(intreval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomApples(squares) {
    do {
        //make a new random apple
        appleIndex = Math.floor(Math.random() * squares.length);
        //tells code to make new apple when a snake takes the previous one.
    } while (square[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple')
}

//UI Controls Creation
// keyboard controls
function control(e) {
    if (e.keycode === 39) {
        direction = 1; //right 1 div
    } else if (e.keycode === 38) {
        direction = -width; // move ten divs up
    } else if (e.keycode === 37) {
        direction = -1; //left 1 div 
    } else if (e.keycode === 40) {
        direction = +width; // move 10 divs down instantly
    }
}

// mobile device controls need to make media query in CSS so these only appear when we are on mobile

up.addEventListener('click', () => (direction = -width));
bottom.addEventListener('click', () => (direction = +width));
left.addEventListener('click', () => (direction = -1));
right.addEventListener('click', () =>(direction = 1));

//and finally a replay button

function replay(){
    grid.innerHTML = '';
    createBoard();
    startGame();
    popup.style.display = 'none'
}