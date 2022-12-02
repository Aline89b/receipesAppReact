import {useEffect, useState} from "react"
import '../index.css';
import SearchBar from "../components/searchBar"
import Header from "../components/header"
import axios from "axios"




function MyList() {
 const [fav, setFav] = useState(()=> {
  const fav = JSON.parse(localStorage.getItem('fav'));
  console.log(fav)
     return fav || [];
  })
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav))
  }, [fav])
/*
useEffect(() => {
  const fav = JSON.parse(localStorage.getItem('fav'));
  if (fav) {
   setFav(fav);
  }
}, []);*/



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

   const [newArr, setNewArr] = useState([])
   const [filteredArr, setFilteredArr] =useState([])
    /*() => {
    const newArr = JSON.parse(localStorage.getItem('newArr'));
    console.log(newArr)
       return newArr || [];
    })*/
    
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
  
        const remove = (index) => {
          const newFav = filteredArr.filter((_, i) => i !== index);
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
         <div className=" flex flex-wrap">
       
           { filteredArr && filteredArr.map((item, index) => 
           
           (
            <div className="flex flex-col lg:flex-row p-8 " key ={index} >
                <div className=" max-w-full ">
                  <img className=" w-full h-full rounded-xl object-cover" src= {item.image} alt= {item.title} />
                </div>
                <div className=" w-full p-8 text-right">
                  <div className="flex-col lg:flex-row p-4 justify-around text-center">
                    <button className="m-2 rounded cursor-pointer p-4 shadow-primary hover:bg-yellow-500 "
                      onClick= {() => {setOpen(false)}}>
                    RECIPE
                    </button>
                      <button className="m-2 rounded cursor-pointer p-4 shadow-primary hover:shadow-secondary"
                        onClick= {() => {setOpen(true)}}>
                      INSTRUCTIONS
                      </button>
                      <button className="m-2 rounded cursor-pointer p-4 shadow-primary hover:shadow-secondary"
                        onClick= {() => {remove(index)}}>
                      REMOVE
                      </button>
                      </div>
                    <div className="flex justify-center">
                     <div className="text-center p-1 text-lg " style={styles.summary}>
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