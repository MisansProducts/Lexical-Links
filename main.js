let people = {};    // People dictionary
let wordBank = [];  // Word Bank array

// Function to get a random person from the people dictionary
function getRandomPerson(collection) {
    let people = Array.from(Object.keys(collection));
    return people[Math.floor(Math.random() * people.length)];
}

// Function to get an array of random words from the word bank array
function getRandomWords(count) {
    const randomWords = [];
    let tempBank = [...wordBank];
    for (var i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * tempBank.length);
        randomWords.push(tempBank[randomIndex]);
        tempBank.splice(randomIndex, 1); // Choose without replacement
    }
    return randomWords;
}

// Associate at random (outdated version 0.56)
// wordBank.forEach(i=>people[getRandomKey(people)].push(i));

// Gameplay loop
function game() {
    const numOptions = wordBank.length < 3 ? wordBank.length : 3;
    const randomPerson = getRandomPerson(people);
    const randomWords = getRandomWords(numOptions);
    let wordChoice; // User input for choice prompt
    let errorFlag; // Error flag for choice prompt

    console.log(`Your person is: ${randomPerson}\nWord bank:`);
    for (var i = 1; i < numOptions + 1; i++) {
        console.log(`${i}. ${randomWords[i-1]}`);
    }
    
    do {
        wordChoice = prompt("Choice: ");
        errorFlag = false;
        if (wordChoice < 1 || wordChoice > numOptions) {
            console.log("Invalid choice. Try again.");
            errorFlag = true;
        }
    } while (errorFlag);

    const chosenWord = randomWords[wordChoice-1];
    people[randomPerson].push(chosenWord);
    wordBank.splice(wordBank.indexOf(chosenWord), 1);
}

// Collect names for the people dictionary
let personInput;
console.log("Write a list of people separated by returns. Type 'STOP' to submit.");
do {
    personInput = prompt();
    if (personInput.toUpperCase() != "STOP") people[personInput] = [];
} while (personInput.toUpperCase() != "STOP");

// Collect words for the word bank array
let wordInput;
console.log("Write a list of adjectives separated by returns. Type 'STOP' to submit.");
do {
    wordInput = prompt();
    if (wordInput.toUpperCase() != "STOP") wordBank.push(wordInput);
} while (wordInput.toUpperCase() != "STOP");

// Starts the game
while (wordBank.length > 0) game();

// Displays everything
for (const [key, value] of Object.entries(people)) {
    console.log(key);
    value.forEach(i=>console.log("...", i))
}
