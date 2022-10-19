import React from "react";
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import '../index.css';
import Header from "../components/header"
import SearchBar from "../components/searchBar"

function Results(){
  const [resultRecipes, setResultRecipes] = useState([])
  let params = useParams()
  console.log(params)

  const getResults = async (name) => {
    try {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${name}`)

      const recipes = await data.json()
      setResultRecipes(recipes.results)
      console.log(recipes.results)
  }catch(err) {
    console.log(err)
    alert(err)
   }
  }

  useEffect(() => {
    getResults(params.results)
  }, [params.results])

  return (
    <div>
      <Header />
      <SearchBar />

  <div className="wrapper">
      {resultRecipes.map(result => {
        return (

            <Link to={"/detail/" + result.id}>
                <div className="Card" key={result.id}>
                  <div className="title">
                    <h3>{result.title}</h3>
                  </div>
                  <div className="gallery">
                    <img src={result.image} alt={result.title}/>
                  </div>
                </div>
            </Link>

     )})}
   </div>
  </div>
  )
}


export default Results
