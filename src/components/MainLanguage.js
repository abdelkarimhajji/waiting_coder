import React, { useContext, useEffect } from 'react';
import style from '../sass/mainLanguage.module.scss';
import { FaYoutube , FaCode} from 'react-icons/fa';
import {TbHandClick} from 'react-icons/tb';
import {TiHtml5} from 'react-icons/ti';
import { AiOutlineUserAdd , AiFillCaretDown } from 'react-icons/ai';
import { UserContext } from '../utils/UserContext';
import {BsArrowRight} from 'react-icons/bs'

function MainLanguage() {

//   const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);


  return (
    <div className={style.container}>
        <div className={style.language}>
             <FaCode className={style.FaCode}/>
            <p>Languages</p>
            <AiFillCaretDown className={style.aifillcaerdown}/>
        </div>
        {/* conatainer of languages */}
       <div className={style.cantAllLanguage}>
            <div className={style.titleLanguage}>
                <TiHtml5 className={style.IconTitleLanguage}/>
                <p> - HTML5</p>
            </div>
            <div className={style.contentTitleLanguage}>
                <p>this is discription this is discription this is discription this is
                    discription this is discription this is discription 
                    discription this is discription this is discription
                    discription this is discription this is discription
                    discription this is discription this is discription
                </p>
            </div>
            <div className={style.validationLanguage}>
                <div className={style.containLink}>
                    <BsArrowRight className={style.iconLink}/>
                    <p className={style.nameLink}>First link to study HTML5 : </p>
                </div>
                <div className={style.link}>
                    <p className={style.clickLink}>this link ok .... </p>
                    <button className={style.validateLink}>click me</button>
                </div>
                <div className={style.containLink}>
                    <BsArrowRight className={style.iconLink}/>
                    <p className={style.nameLink}>First link to study HTML5 : </p>
                </div>
                <div className={style.link}>
                    <p className={style.clickLink}>this link ok .... </p>
                    <button className={style.validateLink}>click me</button>
                </div>
            </div>
       </div>
       {/* finish conatainer of languages */}
       {/* conatainer of languages */}
       <div className={style.cantAllLanguage}>
            <div className={style.titleLanguage}>
                <TiHtml5 className={style.IconTitleLanguage}/>
                <p> - HTML5</p>
            </div>
            <div className={style.contentTitleLanguage}>
                <p>this is discription this is discription this is discription this is
                    discription this is discription this is discription 
                    discription this is discription this is discription
                    discription this is discription this is discription
                    discription this is discription this is discription
                </p>
            </div>
            <div className={style.validationLanguage}>
                <div className={style.containLink}>
                    <BsArrowRight className={style.iconLink}/>
                    <p className={style.nameLink}>First link to study HTML5 : </p>
                </div>
                <div className={style.link}>
                    <p className={style.clickLink}>this link ok .... </p>
                    <button className={style.validateLink}>click me</button>
                </div>
                <div className={style.containLink}>
                    <BsArrowRight className={style.iconLink}/>
                    <p className={style.nameLink}>First link to study HTML5 : </p>
                </div>
                <div className={style.link}>
                    <p className={style.clickLink}>this link ok .... </p>
                    <button className={style.validateLink}>click me</button>
                </div>
            </div>
       </div>
       {/* finish conatainer of languages */}
    </div>
  );
}

export default MainLanguage;
