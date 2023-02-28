import { useQuery } from "@tanstack/react-query";
import  Axios  from "axios";

export default function useDetailData(url, recipeId){

    const { data, isError } = useQuery(["recipe", recipeId], async (recipeId) => {
      return  Axios.get(url/{recipeId}).then((res) => res.data)
    })
    return { data, isError }
}