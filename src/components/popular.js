import React from "react"

import "../index.css"
import {Link} from "react-router-dom"
import useFetchData from "../hooks/useFetchData"


function Popular() {
  const {data, isLoading, isError} = useFetchData(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags="vegetarian"`)

 if(isError){
  console.log("SOMETHING WENT WRONG")
 }
console.log(data)
    return(
      
      <div>
        {isLoading && <p>Loading...</p>}
         {data && <div className="wrapper">{data.recipes.map((recipe) => {
            return(

             <Link to={`/detail/${recipe.id}`}>
                  <div className="Card" key={recipe.id}>
                    <div className="title">
                      <h3>{recipe.title}</h3>
                    </div>
                    <div className="gallery">
                      <img src={recipe.image} alt={recipe.title}/>
                    </div>
                  </div>
               </Link>

            );
           })}
          </div>
          }   
        </div>
      )
  }

export default Popular;