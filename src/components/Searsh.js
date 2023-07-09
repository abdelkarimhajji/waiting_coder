import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import style from "../sass/search.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';
import karim from '../imgs/karim.jpg'
function Searsh() {
  
  return (
    <div className={style.container}>
        <div className={style.iconSearsh}>
            <AiOutlineSearch />
        </div>
      <input type="search" name="search" placeholder="Search ... " className={style.search}/>
      <div className={style.user}>
            <div className={style.name}>
                <p>Abdelkarim hajji</p>
            </div>
            <div className={style.photo}>
                <img src={karim} alt="" />
            </div>
      </div>
    </div>
  );
}

export default Searsh;
