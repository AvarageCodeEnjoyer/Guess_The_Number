const chalk = require('chalk')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


// Generate random number
let max = 1000
let targetNumber = Math.floor(Math.random() * max) + 1;
targetNumber = parseInt(targetNumber)

let guesses = [0, targetNumber, 1000]
let attempts = 0

console.clear()

function ask() {
  /* --------- This was the first way i got the upper and lower bound --------- */
  /* // Get the guesses that were the closest and below to get a range of the target
  let above = guesses.filter(guess => guess > targetNumber)
  let below = guesses.filter(guess => guess < targetNumber)
  // Sort those arrays to be either 
  above = above.sort((a, b) => a - b)
  below = below.sort((a, b) => b - a)
 */

  /* ------------- this was the improved way of getting the bounds ------------ */
  /* I get the index of targetnumber that is inside the array and when the list is sorted the values on
  either side of it are the upper and lower bounds of your guesses  */
  let T = guesses.indexOf(targetNumber)  
  console.log(`|${chalk.red('Attempts')}: ${chalk.yellow(attempts)}\n|${chalk.green('Upper Bound')}: ${chalk.blue(guesses[T + 1])}\n|${chalk.green('Lower Bound')}: ${chalk.blue(guesses[T - 1])}`)
  
  readline.question(`Guess a number between 1 and ${max} \n`, answer => {
    answer = parseInt(answer)
    console.clear()
    
    /* --------- Early exit expressions to check for answer requirements -------- */
    if (answer > max) {
      console.log(`Invalid guess, the maximum number is ${max}`)
      return ask()
    }
    if (answer > guesses[T + 1] || answer < guesses[T - 1]){
      console.log(`${answer} is not in bounds`)
      return ask()
    }
    if (isNaN(answer)) {
      console.log(`Invalid guess, answer must be a number`)
      return ask()
    }

    /* -------------------------- Answer feedback loop -------------------------- */

    attempts++

    if (answer === targetNumber) {
      console.log(`${chalk.green('Correct!')} the number was ${chalk.blue(targetNumber)} \nAnd you got it in only ${chalk.blue(attempts)} attempts!`)
      return process.exit()
    } else if (answer > targetNumber) {
      console.log(`The number is ${chalk.green('Smaller')} then ${chalk.blue(answer)}`)
    } else if (answer < targetNumber) {
      console.log(`The number is ${chalk.green('Bigger')} then ${chalk.blue(answer)}`)
    }

    guesses.push(answer)
    guesses.sort((a, b) => a - b)
    ask()
  })
}


ask()