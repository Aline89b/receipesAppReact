import React from "react"
import { useEffect, useState} from "react"
import "../index.css"
import {Link} from "react-router-dom"



function Popular() {
const [popular, setPopular] = useState([]);

  useEffect(()=> {
    getPopular()
  },[])

  const getPopular = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags="vegetarian"`)
    const data = await api.json()
    console.log(data)
    setPopular(data.recipes)
  };


    return(
      <div className="wrapper">

         {popular.map((recipe) => {
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
      )
  }

export default Popular;