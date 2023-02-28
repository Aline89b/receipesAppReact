import React from "react";
import { useState } from "react";
import Button from "../components/button"


export default function Recipe(props) {
    const [open, setOpen] =useState(false)
    
const styles = {
  receipe: {
    display: open? "block" : "none",
    opacity: open ? "1": "0",
  },
   summary: {
      display: open? "none" : "block",
      opacity: open ? "0": "1",
    },
    
}


    return(
        <div className="flex flex-col lg:flex-row p-8 " >
                <div className=" max-w-full ">
                  <img className=" w-full h-full rounded-xl object-cover" src= {props.item.image} alt= {props.item.title} />
                </div>
                <div className=" w-full p-8 text-right">
                  <div className="flex-col lg:flex-row p-4 justify-around text-center">
                  <Button
                   click= {() => {setOpen(false)}}
                   text= {"RECIPE"}
                    />
                   <Button
                   click= {() => {setOpen(true)}}
                   text= {"INSTRUCTIONS"}
                    />
                    <Button
                   click= {() => {props.remove(props.item.id, props.index)}}
                   text= {"REMOVE"}
                    />
                      
                      </div>
                    <div className="flex justify-center">
                    
                     <div className="text-center p-1 text-lg " style={styles.summary}>
                        <h1>{props.item.title}</h1>
                        <p dangerouslySetInnerHTML={{__html:props.item.summary}}></p>
                        </div>
                    
                        { open &&(
                        <div className="receipe" style={styles.receipe} >
                            <ul>
                              {props.item.extendedIngredients.map((ingredient)=>(
                                <li key={ingredient.id}>{ingredient.original}</li>
                              ))}
                            </ul>
                            <p dangerouslySetInnerHTML={{__html:props.item.instructions}}></p>
                         </div>
                         )}
                     </div>
                   </div>
                  </div>
             )
            }
             