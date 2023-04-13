import React from "react";
import { useState } from "react";
import Button from "../components/button"
import { useContext } from "react";
import { Context } from "../Context"



export default function Recipe({detail, index}) {
const { changeTextBtn,disable, btnText, remove, btnColor} = useContext(Context)



const[open, setOpen] = useState()
const styles = {
  receipe: {
    display: open? "block" : "none",
    opacity: open ? "1": "0",
  },
   summary: {
      display: open? "none" : "block",
      opacity: open ? "0": "1",
    },
    
    save: {
      backgroundColor: btnColor ? "green" : " "
    }
}

    return(
        <div className="flex flex-col lg:flex-row p-8 " >
                <div className=" max-w-full ">
                  <img className=" w-full h-full rounded-xl object-cover" src= {detail.image} alt= {detail.title} />
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
                          click= {changeTextBtn}
                          disabled={disable} 
                          style={styles.save}
                          text = {btnText}
                          />
                       
                   <Button
                    
                      click= {() => {remove(detail.id, index)}}
                      text = {"REMOVE"}
                    /> 
                     
                      </div>
                    <div className="flex justify-center">
                    
                     <div className="text-center p-1 text-lg " style={styles.summary}>
                        <h1>{detail.title}</h1>
                        <p dangerouslySetInnerHTML={{__html:detail.summary}}></p>
                        </div>
                    
                        { open &&(
                        <div className="receipe" style={styles.receipe} >
                            <ul>
                              {detail.extendedIngredients.map((ingredient)=>(
                                <li key={ingredient.id}>{ingredient.original}</li>
                              ))}
                            </ul>
                            <p dangerouslySetInnerHTML={{__html:detail.instructions}}></p>
                         </div>
                         )}
                     </div>
                   </div>
                  </div>
             )
            }
             