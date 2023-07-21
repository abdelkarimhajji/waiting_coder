import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import style from "../sass/maindetailsproject.module.scss";
import { UserContext } from "../utils/UserContext";
import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown, AiOutlinePaperClip} from 'react-icons/ai'
import bio from '../imgs/biographie.png';
// import AiOutlinePaperClip from 'react-icons/ai';

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
        <p className={style.langNeedProject}>HTML5, CSS3.</p>
      </div>
      <div className={style.partTwoResourse}>
            <p className={style.title}>Ressource(s)</p>
            {/* all resourse */}
            <div className={style.allResource}>
                <div className={style.EachResourse}>
                    <AiOutlinePaperClip />
                    <p>Model.png</p>
                </div>
                <div className={style.EachResourse}>
                    <AiOutlinePaperClip />
                    <p>Model.png</p>
                </div>
                <div className={style.EachResourse}>
                    <AiOutlinePaperClip />
                    <p>Model.png</p>
                </div>
            </div>
            {/* finish all resourse */} 
      </div>
      {/* part three */}
      <div className={style.partThreeContext}>
            <p className={style.title}>Context of the project</p>
            <p className={style.decription}>Votre page doit obligatoirement contenir les éléments suivants : 
                * Un titre principal sur le nom de votre personnage * Un sous-titre qui 
                le décrit * Une image * Une description de l’image * Une bio portant les dates
                clés et les meilleures réalisations * Un lien vers la page Wikipédia de votre
                personnage Vous trouverez dans les pièces jointes un modèle pour s’inspirer ;
                Pour la mise en style, vous avez le libre choix de disposer et styliser
                les éléments de votre page. Laisser votre créativité s’exprimer ;</p>
      </div>
      {/* part  foor */}
      <div className={style.partFoorDeliverables}>
        <p className={style.title}>Deliverables</p>
        <p className={style.description}>Dépôt dans le Drive (Un dossier portant votre nom et prénom,
            contenant la page HTML et CSS et le fichier WORD)
        </p>
      </div>
      {/* part five */}
      <div className={style.partFivePush}>
            <p className={style.title}>Finished Project</p>
            <p className={style.description}>So you need to click on button to go on the next page and put your link of your project in the input and click finished</p>
            <Link to="/PushProject" className={style.link}>
            <button className={style.push}>Push</button>
            </Link>
      </div>
    </div>
  );
}

export default DetailsProject;
