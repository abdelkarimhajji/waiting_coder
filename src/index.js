import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import "./sass/index.module.scss"

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route exact path="/" element={<SignIn/>} />
      <Route path="/Home" element={<Home />} />
      {/* <Route path="/Ho" element={<Home />} /> */}
  </Routes>
</BrowserRouter>
);