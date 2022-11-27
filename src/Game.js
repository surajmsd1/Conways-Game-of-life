import React from "react";
import "./Game.css";

const CELL_SIZE = 20;
const WIDTH = 1200;
const HEIGHT = 600;

class Game extends React.Component {
  state = {
    cells: [],
    interval: 100,
    isRunning: false,
  };

  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };
  saveGame = () => {
    let saveCells = [];
    saveCells = this.makeCells();
    console.log(saveCells);
  };
  preset1=()=> {

    
    let preset = [
        {
          x: 27,
          y: 7,
        },
        {
          x: 25,
          y: 8,
        },
        {
          x: 27,
          y: 8,
        },
        {
          x: 15,
          y: 9,
        },
        {
          x: 16,
          y: 9,
        },
        {
          x: 23,
          y: 9,
        },
        {
          x: 24,
          y: 9,
        },
        {
          x: 37,
          y: 9,
        },
        {
          x: 38,
          y: 9,
        },
        {
          x: 14,
          y: 10,
        },
        {
          x: 18,
          y: 10,
        },
        {
          x: 23,
          y: 10,
        },
        {
          x: 24,
          y: 10,
        },
        {
          x: 37,
          y: 10,
        },
        {
          x: 38,
          y: 10,
        },
        {
          x: 3,
          y: 11,
        },
        {
          x: 4,
          y: 11,
        },
        {
          x: 13,
          y: 11,
        },
        {
          x: 19,
          y: 11,
        },
        {
          x: 23,
          y: 11,
        },
        {
          x: 24,
          y: 11,
        },
        {
          x: 3,
          y: 12,
        },
        {
          x: 4,
          y: 12,
        },
        {
          x: 13,
          y: 12,
        },
        {
          x: 17,
          y: 12,
        },
        {
          x: 19,
          y: 12,
        },
        {
          x: 20,
          y: 12,
        },
        {
          x: 25,
          y: 12,
        },
        {
          x: 27,
          y: 12,
        },
        {
          x: 13,
          y: 13,
        },
        {
          x: 19,
          y: 13,
        },
        {
          x: 27,
          y: 13,
        },
        {
          x: 14,
          y: 14,
        },
        {
          x: 18,
          y: 14,
        },
        {
          x: 15,
          y: 15,
        },
        {
          x: 16,
          y: 15,
        },
      ]; 
    setBoard(preset);
  }
/*

let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });
*/

  setBoard=(cells)=> {
    let newBoard = this.makeEmptyBoard();
    for (let i = 0; i < cells.length; ++i) {
        newBoard[cells[i].x][cells[i].y]=true;
    }
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
            if (this.board[x][y]!==true){
                this.board[x][y]=false;
            }
        }
    }
    this.board= newBoard;
    this.setState({ cells: this.makeCells() });
  }

  runIteration() {
    console.log("running iteration");
    let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value });
  };

  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
  }

  render() {
    const { cells, isRunning } = this.state;
    return (
      <div>
        <div
          className="Board"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
          onClick={this.handleClick}
          ref={(n) => {
            this.boardRef = n;
          }}
        >
          {cells.map((cell) => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>

        <div className="controls">
          Update every{" "}
          <input
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />{" "}
          msec
          {isRunning ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}
          <button className="button" onClick={this.saveGame}>
            Randomize
          </button>
          <button className="button" onClick={this.preset1}>
            Glider-gun
          </button>
        </div>
      </div>
    );
  }

  // randBoard(){
  //     for (let y = 0; y < this.rows; y++) {
  //         board[y] = [];
  //         for (let x = 0; x < this.cols; x++) {
  //             board[y][x] = false;
  //         }
  //     }
  // }

  // Create an empty board for initalizing when new board needs to be made ex: change size of board or cell size
  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  // Create cells list of active cells
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }
  //calculates where mouse was clicked to figure out which node was pressed.
  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    //Gets relative position
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }
  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }
    this.setState({ cells: this.makeCells() });
  };

  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }
}
export default Game;

class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
      />
    );
  }
}
