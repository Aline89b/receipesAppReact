import React from "react";
import {useEffect, useState} from "react"
import '../index.css';
import SearchBar from "../components/searchBar"
import Header from "../components/header"


function MyList() {
 const [fav, setFav] = useState(()=> {
  const fav = JSON.parse(localStorage.getItem('fav'));
  console.log(fav)
   return fav || [];
  })
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
    
}

    return(
        <div className="myListPage">
            < Header />
            < SearchBar />
            <h2>My List of favourite receipes</h2>
         <div className="wrapperFav">
           {fav.map((item) => (
            <div className="detailPage" >
                <div className="img">
                  <img src= {item.image} alt= {item.title} />
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
                        <h1>{item.title}</h1>
                        <p dangerouslySetInnerHTML={{__html:item.summary}}></p>
                        </div>
                        {open &&(
                        <div className="receipe" style={styles.receipe}>
                            <ul>
                              {item.extendedIngredients.map((ingredient)=>(
                                <li key={ingredient.id}>{ingredient.original}</li>
                              ))}
                            </ul>
                            <p dangerouslySetInnerHTML={{__html:item.instructions}}></p>
                         </div>
                         )}
                     </div>
                   </div>
                  </div>
             ))}</div>
              </div>
            )
          
          }
       
      
                
export default MyList