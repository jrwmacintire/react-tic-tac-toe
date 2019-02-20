import React, { Component } from 'react'
import Board from './Board'
import Scoreboard from './Scoreboard';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            next: 'x',
            currentStep: 0
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.currentStep + 1);
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        const squares = current.squares.slice();
        if(winner || squares[i]) return;
        squares[i] = this.state.next ? 'x' : 'o';
        this.setState({
          history: history.concat([{ squares: squares }]),
          next: !this.state.next,
          currentStep: history.length
        });
    }

    jumpTo(step) {
      this.setState({
        currentStep: step,
        next: (step % 2) === 0
      });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.currentStep];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
          const desc = move ?
          `Go to move ${move}` :
          'Go to game start';
          return (
            <li key={ move }>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          )
        });
        
        let status;
        if(winner) {
            status = `Winner is ${ winner }`;
        } else {
            status = `Next player is ${ this.state.next ? 'X' : 'O' }`
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares={ current.squares } 
                    onClick={ (i) => this.handleClick(i) } 
                />
            </div>
            <div className="game-info">
                <Scoreboard />
                <hr></hr>
                <p>{ status }</p>
                <ol>{ moves }</ol>
            </div>
            </div>
        );
    }
}

export default Game;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}