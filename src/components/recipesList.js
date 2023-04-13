import React from "react";
import { useContext } from "react";
import Recipe from "./recipe";
import { Context } from "../Context";

export default function RecipeList(){
const { filteredArr } = useContext(Context)

    return(
        <div className=" flex flex-wrap">
                  { filteredArr && filteredArr.map((detail, index) => 
                  
                      <Recipe detail={detail} key={detail.id} index={index} />
                  
                  )}
                </div>
    )
}