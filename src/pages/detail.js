
import React from "react"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import '../index.css';
import useFetchData from "../hooks/useFetchData"



function Detail(){
  let params = useParams()
  const [detail, setDetail] = useState({})
  const [btnText,setBtnText] = useState("SAVE")
  const [btnColor,setBtnColor] = useState("")
  const [disable, setDisable] = useState(false)
  
  function changeColor(){
    setBtnColor("green")
  }
  const [fav, setFav] = useState(()=> {
    const fav = JSON.parse(localStorage.getItem('fav'));
     return fav || [];
    })
  
  function changeTextBtn(){
      addToMyList(detail)
      setBtnText("SAVED")
      changeColor()
       setDisable(true) 
    console.log(btnColor, btnText)
  }
  const addToMyList =  () => {
    const idDetail = detail.id
    setFav([idDetail, ...fav])
   console.log(fav)
   console.log(idDetail)
     
  }
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav))
  }, [fav])
  
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('fav'));
    if (fav) {
     setFav(fav);
    }
  }, []);
  
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
  
  
  const fetchDetails = async () => {
  try {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailData = await data.json()
    setDetail(detailData)
    console.log(detailData)
    console.log(detailData.extendedIngredients)
     
  
  
  }catch(err) {
    console.log(err)
    alert(err)
   }
  }
  
  useEffect(() => {
    fetchDetails()
  },[params.detail])
  
  
    return (
      <div>
        <Header />
        <div className="detailWrapper">
          <h1 className="title "> RECEIPE </h1>
            <SearchBar />
          <div className="detailPage">
              <div className="img">
                <img className=" w-full object-cover md:w-32 lg:w-48 " src= {detail.image} alt= {detail.title} />
              </div>
              <div className="detailCard">
                  <div className="btns">
                  <button className="receipe p-2"
                    onClick= {() => {setOpen(false)}}>
                  RECIPE
                  </button>
                    <button className="instructions"
                      onClick= {() => {setOpen(true)}}>
                    INSTRUCTIONS
                    </button>
                    <button disabled={disable} className="save" style={styles.save}
                      onClick= {changeTextBtn}> {btnText}
                    
                    </button>
                  </div>
                  <div className="detailSummary">
                  <div className=" mt-1" style={styles.summary}>
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
  