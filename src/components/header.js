import React from "react"
import "../index.css"
import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import MyList from "../pages/myList"

function Header(){

  return (
    <header className="flex flex-wrap text-center w-full justify-around text-xl font-medium">
        <div className = "flex">
          <Link to="/"><h2 className="decoration-none text-red-700 ">Cooking with< FaHeart /></h2></Link>
        </div>
        <Link to="/myList/"><h2 className="text-green-500">My List</h2></Link>
    </header>
  )
}

export default Header