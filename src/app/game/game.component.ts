import { Component } from '@angular/core';

interface Color {
  rgbValue: string;
  style: string;
  visible: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  // Variables
  colors: Color[] = [];
  currentColor: Color = this.generateRandomColor(); 
  message: string = 'Click on the color that matches the RGB code';  
  numberOfOptions: number = 12; 
  wrongGuesses: number = 0;  
  messageColor: string = 'black';
  gameOver: boolean = false; 

  constructor() {
    this.setupGame();
  }

  // Returns the game into its original state, somewhat acts as a constructor
  setupGame(): void {
    this.colors = this.generateRandomColors(this.numberOfOptions);
    this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.message = 'Click on the color that matches the RGB code';  
    this.wrongGuesses = 0;  
    this.messageColor = 'black';
    this.gameOver = false; 
    document.body.style.backgroundColor = 'white';

    console.log("The color game setup was successful!");
  }

  // Generates a random RGB value
  generateRandomColor(): Color {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgbValue = `${r}, ${g}, ${b}`;
    return { rgbValue, style: `rgb(${r}, ${g}, ${b})`, visible: true };
  }

  // Generates an array of colors based on numberOfOptions variable
  generateRandomColors(count: number): Color[] {
    return Array.from({ length: count }, () => this.generateRandomColor());
  }

  private updateVisibleColors(selectedColor: Color): void {
    this.colors.forEach(color => {
      if (color.visible) {
        color.style = selectedColor.style;
      }
    });
  }

  private updateGameStatusAfterWin(selectedColor: Color): void {
    this.message = 'You win!';
    this.messageColor = 'green';
    document.body.style.backgroundColor = selectedColor.style;
    this.gameOver = true;
    this.updateVisibleColors(selectedColor);
  }

  private handleIncorrectGuess(selectedColor: Color): void {
    this.messageColor = 'red';
    this.wrongGuesses++;
    this.message = 'Wrong! Try again.';
    selectedColor.visible = false;
  }

  // Checks if the guessed box was correct and sets the variables accordingly
  checkColor(selectedColor: Color): void {
    if (this.gameOver) return;
  
    if (selectedColor.rgbValue === this.currentColor.rgbValue) {
      this.updateGameStatusAfterWin(selectedColor);
    } else {
      this.handleIncorrectGuess(selectedColor);
    }
  }
}
