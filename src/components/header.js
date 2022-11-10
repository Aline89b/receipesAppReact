import React from "react"
import "../index.css"
import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import MyList from "../pages/myList"

function Header(){

  return (
    <header className="flex  justify-around text-xl font-medium">
        <Link to="/"><h2 className="logo">Cooking with < FaHeart /></h2></Link>
        <Link to="/myList/"><h2 className="myList">My List</h2></Link>
    </header>
  )
}

export default Header