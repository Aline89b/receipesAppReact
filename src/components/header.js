import React from "react"
import "../index.css"
import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa";

function Header(){

  return (
    <header>
        <Link to="/"><h2 className="logo">Cooking with< FaHeart /></h2></Link>
    </header>
  )
}

export default Header