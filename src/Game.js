import React from "react";
import "./Game.css";

const CELL_SIZE = 10;
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
  presetGun=()=> {
    const presetGun = [[27,7,],[25,8,],[27,8,],[15,9,],[16,9,],[23,9,],[24,9,],[37,9,],[38,9,],[14,10,],[18,10,],[23,10,],[24,10,],[37,10,],[38,10,],[ 3,11,],[ 4,11,],[13,11,],[19,11,],[23,11,],[24,11,],[ 3,12,],[ 4,12,],[13,12,],[17,12,],[19,12,],[20,12,],[25,12,],[27,12,],[13,13,],[19,13,],[27,13,],[14,14,],[18,14,],[15,15,],[16,15,]]; 
    this.setBoard(presetGun);
  }
  presetOssilator=()=> {
    const presetOssilator = [[36,17],[37,17],[59,17],[60,17],[36,18],[37,18],[59,18],[60,18],[33,20],[34,20],[40,20],[41,20],[42,20],[43,20],[44,20],[52,20],[53,20],[54,20],[55,20],[56,20],[62,20],[63,20],[33,21],[34,21],[39,21],[41,21],[43,21],[45,21],[51,21],[53,21],[55,21],[57,21],[62,21],[63,21],[39,22],[45,22],[51,22],[57,22],[37,23],[38,23],[40,23],[41,23],[42,23],[43,23],[44,23],[52,23],[53,23],[54,23],[55,23],[56,23],[58,23],[59,23],[36,24],[39,24],[57,24],[60,24],[36,25],[37,25],[39,25],[57,25],[59,25],[60,25],[36,26],[39,26],[57,26],[60,26],[36,27],[37,27],[39,27],[57,27],[59,27],[60,27],[36,28],[39,28],[57,28],[60,28],[37,29],[38,29],[58,29],[59,29],[37,35],[38,35],[58,35],[59,35],[36,36],[39,36],[57,36],[60,36],[36,37],[37,37],[39,37],[57,37],[59,37],[60,37],[36,38],[39,38],[57,38],[60,38],[36,39],[37,39],[39,39],[57,39],[59,39],[60,39],[36,40],[39,40],[57,40],[60,40],[37,41],[38,41],[40,41],[41,41],[42,41],[43,41],[44,41],[52,41],[53,41],[54,41],[55,41],[56,41],[58,41],[59,41],[39,42],[45,42],[51,42],[57,42],[33,43],[34,43],[39,43],[41,43],[43,43],[45,43],[51,43],[53,43],[55,43],[57,43],[62,43],[63,43],[33,44],[34,44],[40,44],[41,44],[42,44],[43,44],[44,44],[52,44],[53,44],[54,44],[55,44],[56,44],[62,44],[63,44],[36,46],[37,46],[59,46],[60,46],[36,47],[37,47],[59,47],[60,47]];
    this.setBoard(presetOssilator);
  }
  setBoard = (cells) => {
    let newBoard = this.makeEmptyBoard();
    for (let i = 0; i < cells.length; ++i) { 
      newBoard[cells[i][1]][cells[i][0]]=true;
    }
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
            if (this.board[y][x]!==true){
                this.board[y][x]=false;
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
          <button className="button" onClick={this.presetGun}>
            Glider-gun
          </button>
          <button className="button" onClick={this.presetOssilator}>
            Square-Ossilator
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
