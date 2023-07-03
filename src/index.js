import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import SignIn from './SignIn';
import "./sass/index.module.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>
);