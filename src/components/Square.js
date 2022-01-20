import React from "react";

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
        this.words = ["R", "U", "S", "A", "K"]
    }

    changeColor =  (c, i) => {
        const square = document.querySelector(`input[name='${i}']`)
        square.style.backgroundColor = c;
    }

    handleChange = (e) => {
        const {maxLength, value} = e.target
        this.setState({value: value.toUpperCase()}, () => {})
        const fieldIndex = parseInt(e.target.name)
        if (value.length === maxLength) {
            if (fieldIndex < 25) {
                const nextField = document.querySelector(
                    `input[name='${fieldIndex + 1}']`
                )
                if (this.words.includes(value.toUpperCase())) {
                    const indexWords = this.words.indexOf(value.toUpperCase(), fieldIndex)
                    if (fieldIndex < 5) {
                        if (fieldIndex === indexWords) {
                            this.changeColor("green", fieldIndex)
                        } else {
                            this.changeColor("yellow", fieldIndex)
                        }
                    } else {
                        this.setState(fieldIndex - 5)
                        if (fieldIndex === indexWords) {
                            this.changeColor("green", fieldIndex)
                        } else {
                            this.changeColor("yellow", fieldIndex)
                        }
                    }
                } else {
                    this.changeColor("gray", fieldIndex)
                }
                if (nextField !== null) {
                    nextField.focus()
                }
            }
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="square" name={this.props.value}
                       value={this.state.value}
                       autoComplete="off"
                       maxLength={1}
                       onChange={this.handleChange}
                />
            </div>
        )
    }
}
