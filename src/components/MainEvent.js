import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../sass/mainevent.module.scss";
import { UserContext } from "../utils/UserContext";
import MainProfile from "./MainProfile";
import {MdWatchLater} from 'react-icons/md';
import {BsFillCalendar2EventFill} from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';
function MainEvent() {
  
  return (
    <div className={style.container}>
      <div className={style.containerTitlePage}>
        <BsFillCalendar2EventFill className={style.iconEvent}/>
        <p>Event(s)</p>
        <AiFillCaretDown className={style.iconDown}/>
      </div>
      {/* begin container event */}
      <div className={style.containerEvent}>
        <div className={style.date}>
            <p className={style.number}>24</p>
            <p>NOV</p>
        </div>
        <div className={style.description}>
          <p className={style.title}>TITLE OF EVENT</p>
          <p>drr how to do this in the last fshsdfh sdfosf djjjjjjj</p>
          <div className={style.parentTimeButton}>
              <div className={style.containerTime}>
                <MdWatchLater className={style.icon}/>
                <p>20:23 pm</p>
              </div>
              <div className={style.containerButton}>
                  <button>Register</button>
              </div>
          </div>
        </div>
      </div>
      {/* finsh container event */}
      {/* begin container event */}
      <div className={style.containerEvent}>
        <div className={style.date}>
            <p className={style.number}>24</p>
            <p>NOV</p>
        </div>
        <div className={style.description}>
          <p className={style.title}>TITLE OF EVENT</p>
          <p>drr how to do this in the last fshsdfh sdfosf djjjjjjj</p>
          <div className={style.parentTimeButton}>
              <div className={style.containerTime}>
                <MdWatchLater className={style.icon}/>
                <p>20:23 pm</p>
              </div>
              <div className={style.containerButton}>
                  <button>Register</button>
              </div>
          </div>
        </div>
      </div>
      {/* finsh container event */}
      
    </div>
  );
}

export default MainEvent;
