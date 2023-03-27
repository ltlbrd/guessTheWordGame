//Unordered list where guesses appear
const guessedLetters = document.querySelector(".guessed-letters");

//Button with the text "Guess!"
const guessButton = document.querySelector(".guess");

//Text input area for guesses
const guessInput = document.querySelector(".letter");

//Empty paragraph element which holds the word in-progress
const  wordInProgress = document.querySelector(".word-in-progress");

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

//Replace letters of secret word with placeholder character on the display:
const placeholder = function (word) {
    console.log(word);
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("❀");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Guess button event listener
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
});