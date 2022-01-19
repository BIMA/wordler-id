import React from "react";

export class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    handleChange = (e) => {
        const { maxLength, value } = e.target
        this.setState({value: value.toUpperCase()})
        const fieldIndex = parseInt(e.target.name)
        if (value.length === maxLength) {
            if (fieldIndex < "25") {
                const nextField = document.querySelector(
                    `input[name='${fieldIndex + 1}']`
                )
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
                       maxLength={1}
                       onChange={this.handleChange}
                />
            </div>
        )
    }
}