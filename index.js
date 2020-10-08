// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 *
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 *
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
 */
bar = (str) => str + str;

function processFirstItem(stringList, callback) {
  return callback(stringList[0]);
}

// ⭐️ console.log(processFirstItem(["foo"], bar));

// ⭐️ Example Challenge END ⭐️

///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 *
 * 1. What is the difference between counter1 and counter2?
 *
 *  Counter1 declares a variable that holds an independant count inside
 *  Counter2 works with a global variable to increase
 *
 * 2. Which of the two uses a closure? How can you tell?
 *
 *  Counter1 Uses closure, due to the variable and the count function inside.
 *
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *
 * Counter1 would be preferable if one was going to use the same function with different counters frequently. Makes for more readable code.
 * Counter2 would be preferable if one was going to count up for only one variable (or a few). Less code, faster computation time.
 */

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  };
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}

/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning() {
  return Math.floor(Math.random() * 3);
}
/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/
function finalScore(callback, number) {
  const playInning = () => {
    let score = 0;
    return function () {
      score += callback();
      return score;
    };
  };

  let homeScore = playInning();
  let awayScore = playInning();
  return Array(number)
    .fill()
    .map(() => {
      return {
        Home: homeScore(),
        Away: awayScore(),
      };
    });
}

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function scoreboard(call, func, inn) {
  let game = call(func, inn);

  console.log(
    game
      .map((_, i) => {
        switch (i) {
          case 0:
            return ` 1st inning: ${_.Home} - ${_.Home}\n`;
          case 1:
            return ` 2nd inning: ${_.Home} - ${_.Away}\n`;
          case 2:
            return ` 3rd inning: ${_.Home} - ${_.Away}\n`;
          default:
            return ` ${i + 1}th inning: ${_.Home} - ${_.Away}\n`;
        }
      })
      .toString()
  );
  return `Final Score: ${game[game.length - 1].Home} - ${
    game[game.length - 1].Away
  }`;
}

console.log(scoreboard(finalScore, inning, 9));
