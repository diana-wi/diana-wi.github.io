//-----Notes for Diana--------
// const - variable won't be reassigned
// let - variable will be reassigned
//.push() and .pop() - add and remove an item at the end of an array.
//.unshift() and .shift() - add and remove an item at the beginning of an array.


const reload = document.querySelector('.reload');

reload.onclick = function() {
    window.location.reload();
};

const updatedDate = 'December 10, 2020';
const updatedMessage = document.querySelector('.updated-date');
updatedMessage.textContent = `Last updated on ${updatedDate}`;

// Listing of project titles

const allprojects = [
    'Number Guessing Game',
    'Christmas Message Filtering',
    'Interactive Image Gallery'
];

const totalProject = allprojects.length;
const quicklinks = document.querySelector('.quicklinks');

for (let i = 0; i < totalProject; i++) {
    const projectName = allprojects[i];
    const newProjectItem = document.createElement('li');
    const newProjectLink = document.createElement('a');
    newProjectLink.setAttribute('href', `#${i+1}`);
    const newProjectNumber = document.createElement('span');
    newProjectNumber.textContent = `${i+1}`;
    newProjectLink.append(newProjectNumber, projectName);
    newProjectItem.appendChild(newProjectLink);
    quicklinks.appendChild(newProjectItem);

    const projectTitles = document.querySelectorAll('.cardtitle'); //select all card titles
    projectTitles[i].textContent = `Project ${i+1} - ${projectName}`;
}


// Project 1 - Number Guessing Game

let randomNumber = Math.floor(Math.random() * 100) + 1; 

const guess_submit = document.getElementById('guess-submit');
const guess_input = document.getElementById('guess-input');
const guess_result = document.getElementById('guess-result');
const guess_history = document.getElementById('guess-history');
const guess_form = document.querySelector('.guessing-game-form');
const guess_feedback = document.querySelector('.guess-feedback');
const play_guessgame = document.getElementById('play-guessgame');

guess_history.style.display = 'none';

guess_feedback.textContent = 'Computer picked a random number. Can you guess it within 10 turns?';
let small_note = document.createElement('p'); 
guess_result.appendChild(guess_feedback);
guess_result.appendChild(small_note);

guess_form.style.display = 'none';

let guess_count = 1;
let guess_maxCount = 10;
let guess_replaybutton;

play_guessgame.onclick = function() {
    play_guessgame.style.display = 'none';
    guess_feedback.textContent = "Guess between 1 and 100.";
    small_note.textContent = "We'll let you know if it is low or high.";
    guess_form.style.display = 'block';
    guess_input.focus();
};

function checkMyNumber() {
    let myAnswer = guess_input.value;

    if (myAnswer=='') {
        guess_feedback.textContent = "Excuse me. You need to guess a number to play this game.";
        small_note.textContent = '';
        clearInput();
    } else if (myAnswer === "0") {
        guess_feedback.textContent = "That's a zero. Try again.";
        small_note.textContent = "We won't count this as your turn.";
        clearInput();
    } else {
        let myNumber = Number(myAnswer);
        if (!myNumber) {
            guess_feedback.textContent = "Numbers only.";
            small_note.textContent = '';
            clearInput();
        } else if (myNumber % 1 != 0) {
            guess_feedback.textContent = "No no no. No decimals.";
            small_note.textContent = 'Whole number please.';
            clearInput();
        } else if (myNumber < 0) {
            guess_feedback.textContent = "No negative number.";
            small_note.textContent = 'We only accept positive number... for positive vibe.';
            clearInput();       
        } else {
            guess_history.style.display = 'block';
            guess_submit.textContent = `Guess ${guess_count}/${guess_maxCount}`;
            if (myNumber === randomNumber) {
                guess_feedback.textContent = `${myNumber} is correct!`;
                small_note.textContent = "That was fun! Let's play again.";
                guess_history.style.display = 'none';
                play_again();     
            } else if (guess_count === guess_maxCount) {
                guess_feedback.textContent = 'GAME OVER';
                small_note.textContent = "You ran out of turns. Play again?";
                guess_history.style.display = 'none';
                play_again();
            } else {
                small_note.textContent = '';
                showGuessNumber();
                guess_count++;
                clearInput();
            } 
        }  
    }     
};

guess_submit.onclick = function() {
    checkMyNumber();
};

guess_input.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        guess_submit.click();
    }
});

function showGuessNumber() {
    let myNumber = Number(guess_input.value);
    const guess_item = document.createElement('li');
    let guess_hint;

    if (myNumber < randomNumber) {
        guess_hint = 'Low';
        guess_feedback.textContent =  `${myNumber} is ${guess_hint}`;
    } else if (myNumber > randomNumber) {
        guess_hint = 'High';
        guess_feedback.textContent = `${myNumber} is ${guess_hint}`;
    }

    if (myNumber > 100) {
        guess_feedback.textContent = `${myNumber}?! Try guessing a number between 1 and 100.`;
    } 

    guess_item.textContent = `${myNumber} ${guess_hint}`;
    guess_history.insertBefore(guess_item, guess_history.firstChild); //insert the newly created list to the top.
}

function play_again() {
    guess_input.style.display = 'none';
    guess_submit.style.display = 'none';

    guess_replaybutton = document.createElement('button'); //create reset button

    guess_replaybutton.textContent = 'Play Again';
    guess_form.insertBefore(guess_replaybutton, guess_form.firstChild);
    guess_replaybutton.addEventListener('click', resetGuessGame);

    while(guess_history.hasChildNodes()) { //loops through the all children of guess history
        guess_history.removeChild(guess_history.firstChild); //removes first child
    }
};

function resetGuessGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; 
    guess_count = 1;
    guess_history.style.display = 'none';
    guess_form.removeChild(guess_form.firstChild);

    guess_input.style.display = 'initial';
    guess_submit.style.display = 'initial';
    clearInput();

    guess_submit.textContent = 'Guess';
    guess_feedback.textContent = 'Computer picked a new random number.';
    small_note.textContent = 'Guess the correct numb    er within 10 turns.';   
};

function clearInput() {
    guess_input.focus();
    guess_input.value = '';
};


// Project 2 - Christmas Messages Filtering


const christmasMessages = document.querySelector('.christmasmessages');

let greetings = [
    'Happy Birthday',
    'Happy Valentine\'s Day',
    'Merry Christmas to everyone!',
    'You\'re all I want for Christmas.',
    'Happy New Year\'s!',
    'Boo! Happy Halloween'
];

function holidayMessages() {
    for (let i = 0; i < greetings.length; i++) {
        let greeting = greetings[i];
        if(greeting) {
            let result = greeting;
            let greetingList = document.createElement('li');
            greetingList.textContent = result;
            christmasMessages.appendChild(greetingList);
        }
    }
}

holidayMessages();

const christmasFilter = document.querySelector('.christmasfilter');
const showHolidayMessages = document.createElement('button');

christmasFilter.onclick = function() {
    while(christmasMessages.hasChildNodes()) {
        christmasMessages.removeChild(christmasMessages.firstChild);
    }

    christmasFilter.parentNode.removeChild(christmasFilter);

    for (let i = 0; i < greetings.length; i++) {
        let greeting = greetings[i];
        if(greeting.indexOf('Christmas') !== -1) { //check if a string contains the word 'Christmas'
            let result = greeting;
            let greetingList = document.createElement('li');
            greetingList.textContent = result;
            christmasMessages.appendChild(greetingList);
        }
    }
};



// Project 3 - Image Gallery

const fullimage = document.querySelector('.fullimage');
const thumbnails = document.querySelector('.thumbnails');

const image = document.createElement('img');


const images = [
    'images/annie-spratt-Jr8byYZmTTU-unsplash.jpg',
    'images/drew-beamer-Se7vVKzYxTI-unsplash.jpg',
    'images/dwain-norsa-HXXJLY44WRI-unsplash.jpg',
    'images/hardik-pandya--Ey_0PMz900-unsplash.jpg'
]

for (let i = 0; i < images.length; i++) {
    const thumbnail = document.createElement('li');
    const img = document.createElement('img');
    const imgLink = images[i];
    img.setAttribute('src', imgLink);
    thumbnail.appendChild(img);
    thumbnails.appendChild(thumbnail);
    
    img.addEventListener('click', showImage);
    img.onmouseover = function() {
        img.style.border = '4px solid rgb(132, 43, 248)';
    };
    img.onmouseout = function() {
        img.style.border = '';
    };
}

function showImage() {
    image.setAttribute('src', `${this.getAttribute('src')}`);
    fullimage.appendChild(image);
}

if(!fullimage.hasChildNodes()) {
    image.setAttribute('src', images[0]);
    fullimage.appendChild(image);
}
