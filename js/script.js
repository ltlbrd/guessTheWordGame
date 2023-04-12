//Unordered list where guesses appear
const guessedLettersElement = document.querySelector(".guessed-letters");

//Button with the text "Guess!"
const guessButton = document.querySelector(".guess");

//Text input area for guesses
const guessInput = document.querySelector(".letter");

//Empty paragraph element which holds the word in-progress
const wordInProgress = document.querySelector(".word-in-progress");

//Paragraph element where remaining guesses are displayed
const guessesRemaining = document.querySelector(".remaining");

//Span inside remaining guesses paragraph
const guessesRemainingSpan = document.querySelector(".remaining span");

//Empty paragraph element which displays messages to the user when they make a guess
const message = document.querySelector(".message");

//Hidden button that appears to prompt the player to play again
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//grab a word from a particular list of 800 words
async function getWord() {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};



//Replace letters of secret word with placeholder character on the display:
const placeholder = function (word) {
    //console.log(word);
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("❀");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

//Guess button event listener
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //empty the message paragraph
    message.innerText = "";
    //receive player's guess
    const guess = guessInput.value;
    //check that the guess is valid
    const validGuess = inputCheck(guess);
    if (validGuess) {
        //valid guess
        makeGuess(validGuess);
    }
    guessInput.value = ""; 

});

//Check player input
 const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
       //empty input? get message:
       message.innerText = "Please enter a letter guess";
    } else if (input.length > 1) {
        //too many letters? get message:
        message.innerText = "Please enter only a single letter guess at a time.";
    } else if (!input.match(acceptedLetter)) {
        //provide non-letter input? get message:
        message.innerText = "I can only accept letters, friend-o."
    } else {
        //an acceptable guess! Return the input:
        return input;
    };
 };

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Already guessed that! Try another letter";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuesses();
        countRemaining(guess);
        wordInProgressUpdate(guessedLetters);
    };
};

const showGuesses = function () {
    //clear the list
    guessedLettersElement.innerHTML = "";
    //add guesses to the list of guesses
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    };
};

const wordInProgressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const wordReveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            wordReveal.push(letter.toUpperCase());
        } else {
            wordReveal.push("❀");
        }
    }
    console.log(wordReveal);
    wordInProgress.innerText = wordReveal.join("");
    successfulGuess();
};

//Count the remaining guesses
const countRemaining = function (guess) {
   const upperWord=  word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, but that guess is incorrect.`;
        remainingGuesses -= 1; 
    } else {
        message.innerText = `Correct guess! The word contains ${guess}`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `You are all out of guesses. Game over! <br>The word was ${word}.`;
        guessesRemainingSpan.innerText = `no more guesses`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//check for a winning word
const successfulGuess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //reset the game to original settings
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;

    //get the new word
    getWord();

    // remove end-of-game UI
    guessButton.classList.remove("hide");
    guessesRemaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});