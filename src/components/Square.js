import React from "react";

function Square(props) {
    return (
        <input type="text"
               className="square"
               autoComplete="off"
               onChange={(e) => props.onChange(e)}
               value={props.value}
               name={props.name}
               maxLength={1}
        />
    )
}

export default Square

// import React from "react";
//
// function Square(props) {
//     return (
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     )
// }
//
// export default Square