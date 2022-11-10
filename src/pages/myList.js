import {useEffect, useState} from "react"
import '../index.css';
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import axios from "axios"
import useFetchData from "../hooks/useFetchData";



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
const [newArr, setNewArr] = useState([]);


useEffect(() => {
  fav.map((id) => {
    axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
      
        console.log(res)
        setNewArr(newArr)
        newArr.push(res.data);
        console.log(newArr)

      })
      .catch((err) => console.log(err))
     });

}, [fav]);
  


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

const remove = (index) => {
    const newFav = newArr.filter((_, i) => i !== index);
    setNewArr(newFav);
  };

  
   return (
        <div className="myListPage">
            < Header />
            < SearchBar />
            <h2>My List of favourite recipes</h2>
         <div className="wrapperFav">
       
           { newArr.map((item, index) => 
           
           (
            <div className="detailPage" key ={index} >
                <div className="img">
                  <img src= {item.image} alt= {item.title} />
                </div>
                <div className="detailCard">
                  <div className="btns">
                    <button className="receipe"
                      onClick= {() => {setOpen(false)}}>
                    RECIPE
                    </button>
                      <button className="instructions"
                        onClick= {() => {setOpen(true)}}>
                      INSTRUCTIONS
                      </button>
                      <button className="remove"
                        onClick= {() => {remove(index)}}>
                      REMOVE
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