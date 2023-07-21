import React, { useContext, useEffect } from 'react';
import { useLocation, Navigate , Link } from "react-router-dom";
import style from "../sass/mainproject.module.scss";
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "./FormSignIn";
import { UserContext } from '../utils/UserContext';
import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown} from 'react-icons/ai';
import biographie from '../imgs/biographie.png';

function MainProject() {

//   const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);

  return (
    <div className={style.container}>
        <div className={style.containTitle}>
            <PiProjectorScreenChartBold className={style.PiProjectorScreenChartBold}/>
            <p className={style.title}>Projects</p>
            <AiFillCaretDown className={style.AiFillCaretDown} />
        </div>
        <div className={style.containProject}>
        <Link to="/DetailsProject" className={style.Link}>
            <div className={style.project}>
              <div className={style.containImg}>
                <img src={biographie} alt="biographie" className={style.img}/>
              </div>
              <div className={style.containerDiscreption}>
                <p className={style.titleProject}>Réaliser une Biographie d'un personnage qui vous inspire</p>
                <p className={style.description}>Il s'agit de réaliser une page web qui présente la biographie 
                  d'un personnage de votre choix (sportif, scientifique, artiste…) en utilisant HTML5 et CSS3 ;</p>
              </div> 
                <button className={style.moreDetails}>More Details</button>
            </div>
        </Link>
            {/* finish project */}
            {/* begin card project */}
            <Link to="/DetailsProject" className={style.Link}>
            <div className={style.project}>
              <div className={style.containImg}>
                <img src={biographie} alt="biographie" className={style.img}/>
              </div>
              <div className={style.containerDiscreption}>
                <p className={style.titleProject}>Réaliser une Biographie d'un personnage qui vous inspire</p>
                <p className={style.description}>Il s'agit de réaliser une page web qui présente la biographie 
                  d'un personnage de votre choix (sportif, scientifique, artiste…) en utilisant HTML5 et CSS3 ;</p>
              </div> 
              <button className={style.moreDetails}>More Details</button>
            </div>
            </Link>
            {/* finish project */}
            {/* begin card project */}
            <Link to="/DetailsProject" className={style.Link}>
            <div className={style.project}>
              <div className={style.containImg}>
                <img src={biographie} alt="biographie" className={style.img}/>
              </div>
              <div className={style.containerDiscreption}>
                <p className={style.titleProject}>Réaliser une Biographie d'un personnage qui vous inspire</p>
                <p className={style.description}>ilisant HTML5 et CSS3 ;ilisant HTML5 et CSS3 ;ilisant HTML5 et CSS3 ;
                ilisant HTML5 et CSS3 ;ilisant HTML5 et CSS3 ;ilisant HTML5 et CSS3 ;fcsdfff dfgf sdf</p>
              </div> 
              <button className={style.moreDetails}>More Details</button>
            </div>
            </Link>
            {/* finish project */}
        </div>
       
       
    </div>
  );
}

export default MainProject;
