import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/maineachprofile.module.scss";
import { UserContext } from "../utils/UserContext";
import EachLevel from "../components/EachLevel";
import {TbToolsOff} from 'react-icons/tb'
import {AiFillCaretDown} from 'react-icons/ai';
import {PiProjectorScreenChartBold} from 'react-icons/pi'
import {FaCode} from 'react-icons/fa';
import {TiHtml5} from 'react-icons/ti';
import {FaUpload} from 'react-icons/fa';
import {GiStarShuriken} from 'react-icons/gi';
import {BsFillCalendar2EventFill} from 'react-icons/bs';
function MainEachProfile() {
  
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

  return (
    <div className={style.container}>
       <div className={style.program}>
            <div className={style.itemsProgram}>
                <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <PiProjectorScreenChartBold className={style.iconLanguage}/>
                        <p className="par">Projects</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                    <Link to="/Language#html" className={style.link}>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - HTML5</p>
                        </div>
                    </Link>
                        <Link to="/Language#css" className={style.link}>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className={style.par} > - CSS3</p>
                        </div>
                        </Link>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - JavaScript</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* another item */}
            <div className={style.itemsProgram}>
                <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <FaCode className={style.iconLanguage}/>
                        <p className="par">Languages</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                    <Link to="/Language#html" className={style.link}>
                        <div className={style.conatProItm}>
                            <TiHtml5  className={style.TiHtml5}/>
                            <p className="par"> - HTML5</p>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>
            {/* another item */}
            {/* another item */}
            
       </div>
       <div className={style.program}>
            <div className={style.itemsProgram}>
                <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <BsFillCalendar2EventFill className={style.iconLanguage}/>
                        <p className="par">Events</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                        <div className={style.conatProItm}>
                            <GiStarShuriken className={style.TiHtml5}/>
                            <p className="par"> - HTML5</p>
                        </div>

                        <div className={style.conatProItm}>
                            <GiStarShuriken className={style.TiHtml5}/>
                            <p className={style.par} > - CSS3</p>
                        </div>

                        <div className={style.conatProItm}>
                            <GiStarShuriken className={style.TiHtml5}/>
                            <p className="par"> - JavaScript</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       {/* finish  itemsEvents */}
    </div>
  );
}

export default MainEachProfile;
