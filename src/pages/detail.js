
import React from "react"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import '../index.css';
import useDetailData from "../hooks/useDetailData"
import Recipe from "../components/recipe"
import { Context } from "../Context"



 

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
          <h1 className="text-center font-bold text-lg "> RECEIPE </h1>
            <SearchBar />
            <Context.Provider value={{detail,changeTextBtn,btnText,btnColor,disable, changeColor}}>
              <Recipe detail={detail} key={detail.id} />
              
            </Context.Provider>  
          </div>
        </div>
  
    )
  
  }
  export default Detail
  