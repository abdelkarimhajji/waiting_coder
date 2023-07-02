import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import SignIn from './SignIn';
import "./components/sass/index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>
);