// import React, { useState , useContext, Link} from 'react';
// import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { navigate } from 'react-router';
// import Home from './pages/Home';
// import SignIn from './pages/SignIn';
import {BiError} from 'react-icons/bi'
import {TbError404} from 'react-icons/tb';
import '../sass/index.scss';
// import { UserContext } from './utils/UserContext';
// import Language from './pages/Language';
import Home from './Home';

function NotFound() {


  return (
    <div className="containerNotFound">
        <div className='contBiError'>
        <TbError404 className='iconBiError'/>
        </div>
        <h1>Not found this page !!!</h1>
       <Link to="/Home"><button className='goToHome'>Go to Home</button></Link>
    </div>
  );
}
export default NotFound;