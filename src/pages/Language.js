import React, { useContext, useEffect } from 'react';
import style from "../sass/language.module.scss";
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "../components/FormSignIn";
import { UserContext } from '../utils/UserContext';
import Navbar from '../components/Navbar';
import Searsh from '../components/Searsh'
import MainLanguage from '../components/MainLanguage'
import Footer from '../components/Footer'

function Language() {

//   const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);

  return (
    <div className={style.container}>
        <div className={style.navbar}>
            <Navbar />
        </div>
        <div className={style.nextNav}>
            <Searsh />
            <MainLanguage />
            <Footer />
        </div>
    </div>
  );
}

export default Language;
