import React from "react"
import "../index.css"
import {useState} from  "react"
import {useNavigate} from "react-router-dom"

function SearchBar(){
  const [input, setInput] = useState("")
  const navigate = useNavigate()

  const submit = (e) =>{
    e.preventDefault()
    navigate("/Results/" + input)

  }

  const handleChange = (e) => {
    setInput(e.target.value)
    console.log(e.target.value)
  }
  return(
<div className="text-center w-full">
      <form onSubmit={submit}>
        <input className="bar" onChange={handleChange}
          type="text"
          value={input}
          placeholder=" Look for receipe"/>
        <input className="submit" type="submit" value="Search" />
      </form>
</div>
  )
}

export default SearchBar