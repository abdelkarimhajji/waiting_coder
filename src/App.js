import React, { useState , useContext} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './sass/index.scss';
import { UserContext } from './utils/UserContext';
import Language from './pages/Language';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import Profile from './pages/Profile';
function App() {
  const [value, setValue] = useState(0);
  const [isLogin, setIsLogin] = useState(0);
  console.log("islogin  " + isLogin)
  return (
    <BrowserRouter>
      <UserContext.Provider value={{value, setValue, isLogin, setIsLogin}}>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/Home" element={parseInt(localStorage.getItem("login")) ? <Home /> : <Navigate to="/" /> } />
          <Route path="/Language" element={parseInt(localStorage.getItem("login")) ? <Language /> : <Navigate to="/" /> } />
          <Route path="/Project" element={parseInt(localStorage.getItem("login")) ? <Project /> : <Navigate to="/" /> } />
          <Route path="/Profile" element={parseInt(localStorage.getItem("login")) ? <Profile /> : <Navigate to="/" /> } />
          <Route path="/NotFound" element={parseInt(localStorage.getItem("login")) ? <NotFound /> : <Navigate to="/" />} />
          <Route path="*" element={parseInt(localStorage.getItem("login")) ? <Navigate to="/NotFound"/> : <Navigate to="/"/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;