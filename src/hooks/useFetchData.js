import React from "react";
import { useState, useEffect } from "react";



export default function useFetchData(url){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const api = await fetch(url)
                    const data = await api.json()
                    setData(data.recipes)
                    console.log(data.recipes)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, error, loading }

}