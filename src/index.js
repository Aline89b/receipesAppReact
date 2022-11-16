import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import Results from "./pages/Results"
import { Route, Routes} from "react-router-dom"
import Detail from "./pages/detail"
import MyList from "./pages/myList"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename = {window.location.pathname || ''}>
    <Routes>
      <Route index="/" element={<App />} />
          <Route path="/Results/:results" element={<Results />} />
          <Route path="/detail/:recipeId" element={<Detail />} />
      <Route path="/myList/" element={<MyList />} />
      </Routes>
  </Router>

);
