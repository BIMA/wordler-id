import React from "react";
import { Board } from "./Board";

// function calculateWinner(squares) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a]
//         }
//     }
//     return null
// }

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            history: [{
                squares: Array(25).fill(null),
            }],
            stepNumber: 0,
            position: 0,
            words: ["R", "U", "S", "A", "K"],
        }
    }

    // jumpTo(step) {
    //     this.setState({
    //         stepNumber: step,
    //         xIsNext: (step % 2) === 0
    //     })
    // }

    changeColor(c, i) {
        const square = document.querySelector(`input[name='${i}']`)
        square.style.backgroundColor = c;
    }

    handleChange(i, e) {
        const value = e.target.value.toUpperCase();
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const nextStepNumber = this.state.stepNumber + 1;
        const nextField = document.querySelector(
            `input[name='${this.state.stepNumber + 1}']`
        )
        if (this.state.words.includes(value)) {
            console.log("----------")
            console.log("step: ", this.state.stepNumber)
            console.log("position: ", this.state.position)
            console.log("input: ", value)
            console.log("index: ", this.state.words.indexOf(value))
            if (this.state.words.indexOf(value) === this.state.position) {
                this.changeColor("green", this.state.stepNumber)
            } else if (this.state.words.indexOf(value) !== -1 ) {
                this.changeColor("yellow", this.state.stepNumber)
            } else {
                this.changeColor("gray", this.state.stepNumber)
            }
        } else {
            this.changeColor("gray", this.state.stepNumber)
        }
        squares[i] = value;
        this.setState({
            value: value,
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: nextStepNumber,
            position: nextStepNumber < 5 ? this.state.position + 1 : nextStepNumber % 5
        })
        if (nextField !== null) {
            nextField.focus()
        }

        // const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // const current = history[history.length - 1];
        // const squares = current.squares.slice();
        // if (calculateWinner(squares) || squares[i]) {
        //     return;
        // }
        // squares[i] = this.state.xIsNext ? "X" : "O";
        // this.setState({
        //     history: history.concat([{
        //         squares: squares,
        //     }]),
        //     stepNumber: history.length,
        //     xIsNext: !this.state.xIsNext,
        // })
    }

    render() {
        const history = this.state.history.slice();
        const current = history[this.state.stepNumber];
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onChange={(i, e) => this.handleChange(i, e)}
                    />
                </div>
            </div>
        )
    }
}

// import React from "react";
// import { Board } from "./Board";
//
// function calculateWinner(squares) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a]
//         }
//     }
//     return null
// }
//
// export class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [{
//                 squares: Array(25).fill(null),
//             }],
//             stepNumber: 0,
//             xIsNext: true,
//         }
//     }
//
//     jumpTo(step) {
//         this.setState({
//             stepNumber: step,
//             xIsNext: (step % 2) === 0
//         })
//     }
//
//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? "X" : "O";
//         this.setState({
//             history: history.concat([{
//                 squares: squares,
//             }]),
//             stepNumber: history.length,
//             xIsNext: !this.state.xIsNext,
//         })
//     }
//
//     render() {
//         const history = this.state.history.slice();
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares);
//
//         const moves = history.map((step, move) => {
//             const desc = move ?
//                 'Go to move #' + move :
//                 'Go to game start';
//             return (
//                 <li key={move}>
//                     <button onClick={() => this.jumpTo(move)}>{desc}</button>
//                 </li>
//             )
//         })
//
//         let status;
//         if (winner) {
//             status = 'Winner: ' + winner;
//         } else {
//             status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
//         }
//         return (
//             <div className="game">
//                 <div className="game-board">
//                     <Board
//                         squares={current.squares}
//                         onClick={(i) => this.handleClick(i)}
//                     />
//                 </div>
//                 <div>{status}</div>
//                 <ol>{moves}</ol>
//             </div>
//         )
//     }
// }