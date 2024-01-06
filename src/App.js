import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './sass/index.scss';
import { UserContext } from './utils/UserContext';
import Language from './pages/Language';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import Profile from './pages/Profile';
import EachProfile from './pages/EachProfile';
import DetailsProject from './pages/DetailsProject';
import PushProject from './pages/PushProject';
import Event from './pages/Event';
import Tools from './pages/Tools';
import Competition from './pages/Competition';
import Admin from './admin/pages/Admin';
import Dashboard from './admin/pages/Dashboard';
import Groups from './admin/pages/Groups'
import Validate from './admin/pages/Validate';
import AddUser from './admin/pages/AddUser';
import Emails from './admin/pages/Emails';
function App() {
  const [value, setValue] = useState(0);
  
  const [isLogin, setIsLogin] = useState(parseInt(localStorage.getItem("login")) || 0);
  const [isLoggedIn, setIsLoggedIn] = useState(parseInt(localStorage.getItem("adminLogin")) || 0);
  
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ value, setValue, isLogin, setIsLogin , isLoggedIn, setIsLoggedIn}}>
        <Routes>
          {/* <Route exact path="/" element={<SignIn />} />
          <Route path="/Home" element={isLogin ? <Home /> : <Navigate to="/" />} />
          <Route path="/PushProject" element={isLogin ? <PushProject /> : <Navigate to="/" />} />
          <Route path="/Language" element={isLogin ? <Language /> : <Navigate to="/" />} />
          <Route path="/Project" element={isLogin ? <Project /> : <Navigate to="/" />} />
          <Route path="/Profile" element={isLogin ? <Profile /> : <Navigate to="/" />} />
          <Route path="/EachProfile" element={isLogin ? <EachProfile /> : <Navigate to="/" />} />
          <Route path="/DetailsProject" element={isLogin ? <DetailsProject /> : <Navigate to="/" />} />
          <Route path="/Event" element={isLogin ? <Event /> : <Navigate to="/" />} />
          <Route path="/Tools" element={isLogin ? <Tools /> : <Navigate to="/" />} />
          <Route path="/competition" element={isLogin ? <Competition /> : <Navigate to="/" />} /> */}
           <Route exact path="/" element={<SignIn />} />
          <Route path="/Home" element={ <Home />} />
          <Route path="/PushProject" element={isLogin ? <PushProject /> : <Navigate to="/" />} />
          <Route path="/Language" element={isLogin ? <Language /> : <Navigate to="/" />} />
          <Route path="/Project" element={isLogin ? <Project /> : <Navigate to="/" />} />
          <Route path="/Profile" element={isLogin ? <Profile /> : <Navigate to="/" />} />
          <Route path="/EachProfile" element={isLogin ? <EachProfile /> : <Navigate to="/" />} />
          <Route path="/DetailsProject" element={isLogin ? <DetailsProject /> : <Navigate to="/" />} />
          <Route path="/Event" element={isLogin ? <Event /> : <Navigate to="/" />} />
          <Route path="/Tools" element={isLogin ? <Tools /> : <Navigate to="/" />} />
          <Route path="/competition" element={isLogin ? <Competition /> : <Navigate to="/" />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Admin/Dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/Admin" />} />
          <Route path="/Admin/Groups" element={isLoggedIn ? <Groups /> : <Navigate to="/Admin" />} />
          <Route path="/Admin/Validate" element={isLoggedIn ? <Validate /> : <Navigate to="/Admin" />} />
          <Route path="/Admin/AddUser" element={isLoggedIn ? <AddUser /> : <Navigate to="/Admin" />} />
          <Route path="/Admin/Emails" element={isLoggedIn ? <Emails /> : <Navigate to="/Admin" />} />
          <Route path="/NotFound" element={isLogin ? <NotFound /> : <Navigate to="/" />} />
          <Route path="*" element={isLogin ? <Navigate to="/NotFound" /> : <Navigate to="/" />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
