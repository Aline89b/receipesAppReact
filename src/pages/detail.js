
import React from "react"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import '../index.css';
import useDetailData from "../hooks/useDetailData"
import Button from "../components/button"



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
          <h1 className="text-center font-bold text-lg "> RECEIPE </h1>
            <SearchBar />
          <div className="flex flex-col lg:flex-row p-8">
              <div className="w-full h-full object-cover">
                <img className=" w-full rounded object-cover " src= {detail?.image} alt= {detail.title} />
              </div>
              <div className="w-full p-8 text-right">
                  <div className="flex p-4 justify-around">
                  <Button
                   click= {() => {setOpen(false)}}
                   text= {"RECIPE"}
                    />
                   <Button
                   click= {() => {setOpen(true)}}
                   text= {"INSTRUCTIONS"}
                    />
                    <Button disabled={disable} style={styles.save}
                      click= {changeTextBtn} text = {btnText}
                    
                    />
                  </div>
                  <div className="flex justify-center">
                  <div className=" text-center p-1" style={styles.summary}>
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
  