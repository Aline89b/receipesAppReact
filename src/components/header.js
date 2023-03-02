import React from "react"
import "../index.css"
import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import { SocialIcon } from 'react-social-icons'

function Header(){

  return (
    <header className="flex bg-amber-300  flex-wrap text-center w-full justify-around items-center text-xl font-medium">
        <div className = "flex flex-wrap ">
          <Link className="flex" to="/">
            <h2 className="decoration-none text-red-700 ">Cooking with</h2>
               < FaHeart color="red" className=" w-6 p-0.5" />
          </Link>
        </div>
      <div className='flex space-x-3 p-1 mx-1'> 
        <SocialIcon  url="https://github.com/Aline89b/" />
        <SocialIcon  url="https://linkedin.com/in/aline-grianti-32a9a9b7/" />
        <SocialIcon url="https://whatsapp.com/wa.me/393283539590" />
      </div>
        <Link to="/myList/"><h2 className="text-green-500">My List</h2></Link>
    </header>
  )
}

export default Header