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

const remove = (index) => {
    const newFav = newArr.filter((_, i) => i !== index);
    const newFavId = fav.filter((_, i) => i !== index);
    console.log(newFavId)
    setFav(newFavId)
    console.log(newFav)
      setNewArr(newFav);
    
  };

 
  
   const [newArr, setNewArr] = useState(() => {
    const newArr = JSON.parse(localStorage.getItem('newArr'));
    console.log(newArr)
       return newArr || [];
    })
    
    useEffect(() => {
      localStorage.setItem("newArr", JSON.stringify(newArr))
    }, [newArr])
  
  useEffect(() => {
    const newArr = JSON.parse(localStorage.getItem('newArr'));
    if (newArr) {
     setNewArr(newArr);
    }
  }, []);
  
  useEffect(() => {
      const getMyList = () => {
        
        fav.map((id) => {
          axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            .then((res) => {
             newArr.push(res.data) 
            setNewArr(_prevState => newArr)
             
            })
            
            .catch((err) => console.log(err))
          });
          
          getMyList()
        
      }
     
      
        },[fav]);
  


  
   return (
        <div className="w-full m-0">
            < Header />
            < SearchBar />
            <h2 className="text-center text-2xl font-bold uppercase">My List of favourite recipes</h2>
         <div className=" flex flex-wrap">
       
           { newArr && newArr.map((item, index) => 
           
           (
            <div className=" flex flex-col lg:flex-row p-8 " key ={index} >
                <div className=" w-full ">
                  <img className=" w-full h-full rounded-xl object-cover" src= {item.image} alt= {item.title} />
                </div>
                <div className=" w-full p-8 text-right">
                  <div className="flex p-4 justify-around text-center">
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