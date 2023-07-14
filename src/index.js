import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import "./sass/index.scss"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);