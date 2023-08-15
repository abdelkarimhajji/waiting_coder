import React, { useContext, useEffect } from 'react';
import style from "../sass/project.module.scss";
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "../components/FormSignIn";
import { UserContext } from '../utils/UserContext';
import Navbar from '../components/Navbar';
import Searsh from '../components/Searsh'
import Footer from '../components/Footer'
import MainProject from '../components/MainProject';

function Project() {
//   const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);
useEffect(() => {
  window.scrollTo(0, 0);
  }, []);
  return (
    <div className={style.container}>
        <div className={style.navbar}>
            <Navbar />
        </div>
        <div className={style.nextNav}>
            <Searsh />
            <MainProject />
            <Footer />
        </div>
    </div>
  );
}

export default Project;
