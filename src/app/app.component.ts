import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'color-guessing-game';
  gameMode: 'color' | 'rgb' = 'color';

  getMode(): 'color' | 'rgb' {
    return this.gameMode;
  }

  setMode(mode: 'color' | 'rgb'): void {
    this.gameMode = mode;  
  }

  checkMode(): void {
    if (this.gameMode === 'color') {
      console.log("The game mode is currently set to color.");
    } else if (this.gameMode === 'rgb') {
      console.log("The game mode is currently set to RGB.");
    }
  }
}
