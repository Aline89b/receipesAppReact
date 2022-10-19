
import React from "react"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import '../index.css';


function Detail(){
let params = useParams()
const [detail, setDetail] = useState({})
const[open, setOpen] = useState()
const styles = {
  receipe: {
    display: open? "block" : "none",
    opacity: open ? "1": "0",
  },
   summary: {
      display: open? "none" : "block",
      opacity: open ? "0": "1",
    }
}


const fetchDetails = async () => {
  const data = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
  const detailData = await data.json()
  setDetail(detailData)
  console.log(detailData)
  console.log(detailData.extendedIngredients)

}

useEffect(() => {
  fetchDetails()
},[params.detail])

  return (
    <div>
      <Header />
      <div className="detailWrapper">
        <h1 className="title"> RECEIPE </h1>
          <SearchBar />
        <div className="detailPage">
            <div className="img">
              <img src= {detail.image} alt= {detail.title} />
            </div>
            <div className="detailCard">
                <div className="btns">
                <button className="receipe"
                  onClick= {() => {setOpen(false)}}>
                RECEIPE
                </button>
                  <button className="instructions"
                    onClick= {() => {setOpen(true)}}>
                  INSTRUCTIONS
                  </button>
                </div>
                <div className="detailSummary">
                <div className="summary" style={styles.summary}>
                    <h1>{detail.title}</h1>
                    <p dangerouslySetInnerHTML={{__html:detail.summary}}></p>
                    </div>
                    {open &&(
                    <div className="receipe" style={styles.receipe}>
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
        </div>
      </div>

  )

}

export default Detail