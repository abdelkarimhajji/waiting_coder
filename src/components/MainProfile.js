import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {AiFillCaretDown} from 'react-icons/ai';
import style from "../sass/mainprofile.module.scss";
import { UserContext } from "../utils/UserContext";
import {GiTopPaw} from 'react-icons/gi';
import {FiUsers} from 'react-icons/fi';
import karim from '../imgs/karim.png';

function MainProfile() {
  

  return (
    <div className={style.container}>
        <div className={style.containerTitlePage}>
            <FiUsers className={style.iconEvent}/>
            <p>Event(s)</p>
            <AiFillCaretDown className={style.iconDown}/>
        </div>
        {/* start card */}
    <Link to="/EachProfile" className={style.link}>
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
      </Link>
      {/* finish card */}
      {/* start card */}
      <Link to="/EachProfile" className={style.link}>
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
      </Link>
      {/* finish card */}
    </div>
  );
}

export default MainProfile;
