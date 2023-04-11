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


//Starting word to test out game while building:
const word = "magnolia";
const guessedLetters = [];

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

placeholder(word);

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

//check for a winning word
const successfulGuess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};