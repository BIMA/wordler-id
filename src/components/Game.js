import React from "react";
import { Board } from "./Board";

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