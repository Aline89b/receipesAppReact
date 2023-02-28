
import { useQuery } from "@tanstack/react-query";
import  Axios  from "axios";


export default function useFetchData(url){

    const { data, isLoading, isError } = useQuery(["recipe"], async () => {
      return  Axios.get(url).then((res) => res.data)
    })
    return { data, isLoading, isError }
}
   

