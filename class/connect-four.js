const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);
    Screen.render()

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('u', 'move upwards', this.moveUp.bind(this));
    Screen.addCommand('l', 'move left', this.moveLeft.bind(this));
    Screen.addCommand('r', 'move right', this.moveRight.bind(this));
    Screen.addCommand('d', 'move down', this.moveDown.bind(this))
    Screen.addCommand('x', "play 'X'", this.playX.bind(this))
    Screen.addCommand('o', "play 'O'", this.playO.bind(this))


    this.cursor.setBackgroundColor();
    this.moveCount = 0;
    Screen.render();
    Screen.printCommands();
  }

  moveUp () {
    this.cursor.up();
    Screen.render()
    Screen.printCommands();
  }

  moveRight() {
    this.cursor.right()
    Screen.render()
    Screen.printCommands();
  }

  moveDown() {
    this.cursor.down();
    Screen.render()
    Screen.printCommands();
  }

  moveLeft () {
    this.cursor.left();
    Screen.render()
    Screen.printCommands();
  }

  playX () {
    let row = this.cursor.row;
    let col = this.cursor.col;
    if (Screen.grid[row][col] !== ' ') {
      return;
    }
    Screen.setGrid(row, col, "X");
    let outcome = ConnectFour.checkWin(Screen.grid)
    if (outcome !== false && outcome !== "T") {
        Screen.render()
        Screen.setQuitMessage("Player 'X' has won the game! Congrats!");
        Screen.quit();
      } else {
        Screen.render()
      }
  }

  playO () {
    let row = this.cursor.row;
    let col = this.cursor.col;
    if (Screen.grid[row][col] !== ' ') {
      return;
    }
    Screen.setGrid(row, col, "O");
    let outcome = ConnectFour.checkWin(Screen.grid)
    if (outcome !== false && outcome !== "T") {
        Screen.render()
        Screen.setQuitMessage("Player 'O' has won the game! Congrats!");
        Screen.quit();
      } else {
        Screen.render()
      }
  }


  static checkWin(grid) {

    let flat = grid.flat();
    if (!flat.includes("X") && !flat.includes("O")) {
      return false;
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === grid[i][j+1] && grid[i][j+1] === grid[i][j+2] && grid[i][j+2] === grid[i][j+3] && grid[i][j] !== ' ') {
          return grid[i][j]
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[j][i] === grid[j+1][i] && grid[j+1][i] === grid[j+2][i] && grid[j+2][i] === grid[j+3][i] && grid[j][i] !== ' ') {
          return grid[j][i]
        }
      }
    }

    // Check for down-right diagonal wins
    for (let i = 0; i < 3; i++) { // Only go up to the 3rd row
      for (let j = 0; j < 4; j++) {  // Only go up to the 4th column
        if (grid[i][j] === grid[i+1][j+1] && grid[i+1][j+1] === grid[i+2][j+2] && grid[i+2][j+2] === grid[i+3][j+3] && grid[i][j] !== ' ') {
          return grid[i][j];  // Return the winner
        }
      }
    }

    // Check for up-right diagonal wins
    for (let i = 3; i < 6; i++) { // Start from the 3rd row down
      for (let j = 0; j < 4; j++) {  // Only go up to the 4th column
        if (grid[i][j] === grid[i-1][j+1] && grid[i-1][j+1] === grid[i-2][j+2] && grid[i-2][j+2] === grid[i-3][j+3] && grid[i][j] !== ' ') {
          return grid[i][j];  // Return the winner
        }
      }
    }

    // Check for a tie (if no spaces left)
    if (!flat.includes(' ')) {
      Screen.setQuitMessage("No win! Both players have tied.")
      Screen.quit()
      return "T";  // Tie game
    }

    return false;  // No win yet
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
