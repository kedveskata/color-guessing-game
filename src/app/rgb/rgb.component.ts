import { Component } from '@angular/core';

interface Color {
  rgbValue: string;
  style: string;
}

@Component({
  selector: 'app-rgb',
  templateUrl: './rgb.component.html',
  styleUrls: ['./rgb.component.css']
})
export class RgbComponent {

  // Variables
  currentColor: Color = this.generateRandomColor(); 
  previousRgb: Color = this.generateRandomColor();
  message: string = 'Enter the possible values on the lines';  
  wrongGuesses: number = 0;  
  messageColor: string = 'black';
  guess = { r: '', g: '', b: '' };
  isFlipped: boolean = false;

  constructor() {
    this.setupGame();
  }

  // Returns the game into its original state, somewhat acts as a constructor
  setupGame(): void {
    document.body.style.backgroundColor = 'white';
    this.currentColor = this.generateRandomColor();
    this.message = 'Enter the possible values on the lines';
    this.messageColor = 'black';
    this.wrongGuesses = 0;
    this.isFlipped = false;
  }

  // Generates a random RGB value
  generateRandomColor(): Color {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgbValue = `${r}, ${g}, ${b}`;
    return { rgbValue, style:  `rgb(${r}, ${g}, ${b})`};
  }

  // Handles the incoming values from the user
  inputHandling(): boolean {
    const numR = parseInt(this.guess.r);
    const numG = parseInt(this.guess.g);
    const numB = parseInt(this.guess.b);

    if ((!isNaN(numR) && !isNaN(numG) && !isNaN(numB))) {
      if (numR < 255 && numR > 0 && numG < 255 && numG > 0 && numB < 255 && numB > 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  // Resposible for the color-box flip
  toggleFlip(): void {
      this.isFlipped = !this.isFlipped;
  }

  // Checks if the guessed colors are within the given range
  isWithinRange(guessedRgb: string, actualRgb: string): boolean {
    const guessedParts = guessedRgb.split(',').map(x => parseInt(x.trim()));
    const actualParts = actualRgb.split(',').map(x => parseInt(x.trim()));

    return guessedParts.every((val, index) => Math.abs(val - actualParts[index]) <= 30);
  }

  private handleIncorrectGuess(rgbValue: string): void {
    this.message = "Wrong! Try again.";
    if (rgbValue !== this.previousRgb.rgbValue) {
      this.wrongGuesses++;
      this.messageColor = 'red';
    }
    this.previousRgb.rgbValue = rgbValue;
  }
  
  // Checks if the guessed box was correct and sets the variables accordingly
  checkColor(): void {
    const rgbValue = `${this.guess.r}, ${this.guess.g}, ${this.guess.b}`;

    if (this.inputHandling()) {
      if (this.isWithinRange(rgbValue, this.currentColor.rgbValue)) {
        this.message = "Congratulations! You've guessed it correctly.";
        this.messageColor = 'green';
        document.body.style.backgroundColor = this.currentColor.style;
      } else {
        this.handleIncorrectGuess(rgbValue);
      }
    } else {
      this.message = "Incorrect value, please enter a number between 0 and 255";
      this.messageColor = 'red';
    }
  }
}
