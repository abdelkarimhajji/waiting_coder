import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/mainprofile.module.scss";
import { UserContext } from "../utils/UserContext";
import {GiTopPaw} from 'react-icons/gi';
import karim from '../imgs/karim.jpg';

function MainProfile() {
  

  return (
    <div className={style.container}>
        {/* start card */}
      <div className={style.containerProfile}>
        <div className={style.containerImg}>
            <img src={karim} alt="" />
        </div>
        <div className={style.containerInfo}>
            <p className={style.name}>Abdelkarim Hajji</p>
            <p className={style.login}>@ahajji</p>
            <div className={style.rectangul}>
                <div className={style.countProjects}>
                    <p className={style.title}>Projects</p>
                    <p>4</p>
                </div>
                <div className={style.countCopitions}>
                    <p className={style.title}>Compitions</p>
                    <p>5</p>
                </div>
                <div className={style.countEvents}>
                    <p className={style.title}>Eventes</p>
                    <p>2</p>
                </div>
            </div>
            <div className={style.conainerLevel}>
                <GiTopPaw className={style.icon}/>
                <p className={style.title}>Level: 2</p>
            </div>
        </div>
      </div>
      {/* finish card */}
      {/* start card */}
      <div className={style.containerProfile}>
        <div className={style.containerImg}>
            <img src={karim} alt="" />
        </div>
        <div className={style.containerInfo}>
            <p className={style.name}>Abdelkarim Hajji</p>
            <p className={style.login}>@ahajji</p>
            <div className={style.rectangul}>
                <div className={style.countProjects}>
                    <p className={style.title}>Projects</p>
                    <p>4</p>
                </div>
                <div className={style.countCopitions}>
                    <p className={style.title}>Compitions</p>
                    <p>5</p>
                </div>
                <div className={style.countEvents}>
                    <p className={style.title}>Eventes</p>
                    <p>2</p>
                </div>
            </div>
            <div className={style.conainerLevel}>
                <GiTopPaw className={style.icon}/>
                <p className={style.title}>Level: 2</p>
            </div>
        </div>
      </div>
      {/* finish card */}
    </div>
  );
}

export default MainProfile;
