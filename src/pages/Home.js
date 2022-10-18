import React from "react"
import Popular from "../components/popular"
import SearchBar from "../components/searchBar"

function Home(){
  return(
    <div>
      <SearchBar />
      <Popular />
    </div>
  )
}

export default Home