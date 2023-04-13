import {useEffect, useState} from "react"
import '../index.css';
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import axios from "axios"
import RecipeList from "../components/recipesList";
import { Context } from "../Context";


function MyList() {
 
 const [fav, setFav] = useState(()=> {
  const fav = JSON.parse(localStorage.getItem('fav'));
  console.log(fav)
     return fav || [];
  })
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav))
  }, [fav])




   const [newArr, setNewArr] = useState([])
   const [filteredArr, setFilteredArr] =useState([])
    
    
   useEffect(() => {
      localStorage.setItem("newArr", JSON.stringify(newArr))
    }, [fav])
  
  useEffect(() => {
   const newArr = JSON.parse(localStorage.getItem('newArr'));
    if (newArr) {
     setNewArr(newArr);
    }
  
  }, []); 
 
 
  useEffect(() => {
    
    if(fav) {
     fav.map(async(id) => {
      try{
        const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        console.log(res.data)
      
       newArr.push(res.data)
       console.log(newArr)
       

      } 
      catch(error) {
        console.log(error)
      } 
      const filteredArr = Array.from(new Set(newArr.map(a => a.id)))
        .map(id => {
          return newArr.find(a => a.id === id)
        })
        console.log(filteredArr)
      setFilteredArr(filteredArr)
       
    })
      
  }
  
   
      },[fav]);
  
        const remove = (id,index) => {
          const newFav = filteredArr.filter(filteredItem => filteredItem.id !== id);
          const newFavId = fav.filter((_, i) => i !== index);
          console.log(newFavId)
          setFav(newFavId)
          console.log(newFav)
            setNewArr(newFav);
          
        };

  
   return (
        <div className=" w-full">
           <div className="flex flex-col sm:width-full">
              < Header />
              < SearchBar />
              <h2 className="text-center text-2xl font-bold uppercase">My List of favourite recipes</h2>
            </div>
            <Context.Provider value ={{ filteredArr, remove }}>
              <RecipeList />
            </Context.Provider>
        </div>
            )
            
          
          }
       
      
                
export default MyList