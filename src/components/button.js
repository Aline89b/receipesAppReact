import React from "react";



export default function Button({click,style,text, disabled}) {

    return (
        <button
        
        className= "m-2 rounded cursor-pointer p-4 shadow-primary hover:bg-yellow-500"
        onClick={click}
        disable={disabled}
        style={style}
        
        > 
        {text} 
       </button>
    )
}
        Button.defaultProps = {
            type: "button",
            text: "SAVE",
            disabled: false
        };
  