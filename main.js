const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field;
  }
  get field(){
    return this._field;
  }
  playGame(){
    let currentlyPlaying = true;
    let x = 0;
    let y = 0;
    console.log(this.print());
    let moveSelection;
    while (currentlyPlaying) {
      moveSelection = prompt("Which Way would you like to move? (up = 'U' Down = 'D' Left = 'L' right = 'R')");
      if(moveSelection.toUpperCase() === 'U' && y !== 0) {
        y -= 1;
      } else if (moveSelection.toUpperCase() === 'U' && y === 0) {
        console.log('You have already reached the top of the board');
      } else if (moveSelection.toUpperCase() === 'D' &&  y !== (inputHeight - 1)) {
          console.log('You have already reached the top of the board');
      } else if (moveSelection.toUpperCase() === 'D' &&  y !== (inputHeight - 1)) {
          console.log('You have already reached the top of the board');
      } else if (moveSelection.toUpperCase() === 'L' && x !== 0) {
        console.log('You have already reached the top of the board');
      } else if (moveSelection.toUpperCase() === 'L' && x === 0) {
        console.log('You have already reached the top of the board');
      } else if (moveSelection.toUpperCase() === 'R' && x !== (inputWidth - 1)) {
        console.log('You have already reached the top of the board');
      } else if (moveSelection.toUpperCase() === 'R' && x === (inputWidth - 1)) {
        console.log('You have already reached the top of the board');
      } else if(moveSelection === 'clear'){
        break;
      } else {
        console.log('Invalid Entry');
      }
      if (this.field[y][x] === hat) {
        console.log("You've successfully retrieved the hat! You win!");
        currentlyPlaying = false;
        break;
      } else if(this.field[y][x] === hole){
        console.log("Game over! you fell through the hole!");
        currentlyPlaying = false;
        break;
      } else {
        this.field[y][x] = pathCharacter;
        console.log(this.print());
      }
    }
  } 
  print(){
    return this.field.map(row => row.join('')).join('\n');
  }
  static generateField(height, width, percentage) {
    const countFieldCharacters = arrayOfHolesAndFieldCharacters => {
      let fieldCharacterCount = 0;
      for (let j = 0; j < arrayOfHolesAndFieldCharacters.length; j++){
        if(arrayOfHolesAndFieldCharacters[j] === fieldCharacter) {
          fieldCharacterCount++;
        }
      }
      return fieldCharacterCount;
    }
    let outputField = [];
    let randomInt;
    let currentArray = [];
    let rowCount = 0;
    while (rowCount < height){
      for (let i = 0; i < width; i++) {
        randomInt = Math.ceil(Math.random() * 2);
        if(randomInt === 1){
          currentArray.push(fieldCharacter);
        } else {
          currentArray.push(hole)
        }
      }
      if((countFieldCharacters(currentArray) / width) * 100 >= percentage){
        outputField.push(currentArray);
        rowCount++;
      }
      currentArray = [];
    }
    const randomHatHeight = math.Floor(Math.random() * height);
    const randomHatWidth = Math.Floor(Math.random() * width);
    outputField[0][0] = pathCharacter;
    outputField [0][1] = fieldCharacter;
    outputField[randomHatHeight][randomHatWidth] = hat;
    return outputField;
  }
}

let inputHeight = prompt('How tall would you like your game field to be? ')
let inputWidth = prompt('How wide? ');
let inputPercentage = prompt('Percentage of pathway vs holes? ');
const generateField = Field.generateField(Number(inputHeight), Number(inputPercentage));

const gameField = new Field(generateField);
gameField.playGame();


