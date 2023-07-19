import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import style from "../sass/maindetailsproject.module.scss";
import { UserContext } from "../utils/UserContext";
import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown} from 'react-icons/ai'
import bio from '../imgs/biographie.png';


function DetailsProject() {
  


  return (
    <div className={style.container}>
      <div className={style.containerMoreDetails}>
        <PiProjectorScreenChartBold className={style.icon}/>
        <p className={style.title}>More Details</p>
        <AiFillCaretDown className={style.icon}/>
      </div>
      <div className={style.partOneExplaine}>
        <img src={bio} alt="" />
        <p className={style.title}>Réaliser une Biographie d'un personnage qui vous inspire</p>
        <p className={style.discription}>Il s’agit de réaliser une page web qui présente la biographie d’un 
            personnage de votre choix (sportif, scientifique, artiste…) en utilisant HTML5 et CSS3 ;</p>
      </div>
    </div>
  );
}

export default DetailsProject;
