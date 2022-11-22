import React from "react"
import Home from "./pages/Home"

import Header from "./components/header"


function App() {
  return (
    <div className="w-full">
      <Header />
      <h1 className="text-center font-bold text-lg"> Vegetarian Receipes App </h1>
      <Home />
    </div>
  );
}

export default App;
