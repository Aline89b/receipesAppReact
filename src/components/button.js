import React from "react";


export default function Button(props) {

    return (
        <button
        type={props.type}
        className= "m-2 rounded cursor-pointer p-4 shadow-primary hover:bg-yellow-500"
        onClick={props.click}
        disable={props.disabled}
        style={props.style}
        > 
        {props.text} 
       </button>
    )
}
        Button.defaultProps = {
            type: "button",
        
            disabled: false
        };
  