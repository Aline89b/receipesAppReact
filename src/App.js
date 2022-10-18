import React from "react"
import Home from "./pages/Home"

import Header from "./components/header"


function App() {
  return (
    <div className="App">
      <Header />
      <h1 className="title"> Vegetarian Receipes App </h1>
      <Home />
    </div>
  );
}

export default App;
