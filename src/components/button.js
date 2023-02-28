import React from "react";


export default function Button({type ="button", onClick}) {

    return (
        <Button
        type={type}
        className= "m-2 rounded cursor-pointer p-4 shadow-primary hover:bg-yellow-500"
        onClick={onClick}
        > 
        
       </Button>
    )
}