import { useQuery } from "@tanstack/react-query";
import  Axios  from "axios";

export default function useDetailData(recipeId){
const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  const getData = (recipeId) = async () => {
    const response = await Axios.get(url);
    return response.data;
  }
  


    const { data } = useQuery(["recipe", recipeId],()=> getData(recipeId))
    
    return { data }
}