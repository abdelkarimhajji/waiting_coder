import React, { useState, useEffect} from "react";
import { useLocation, Navigate , Link } from "react-router-dom";
import style from "../sass/mainhome.module.scss"
import { AiFillCaretDown, AiOutlineProject} from 'react-icons/ai';
import { FaCode, FaUpload, FaStar } from 'react-icons/fa'
import {TiHtml5} from 'react-icons/ti'
import { TbHandClick , TbToolsOff, TbBrandJavascript, TbBrandVscode} from 'react-icons/tb'
import { DiCss3 } from 'react-icons/di'
import {BiLogoGithub} from 'react-icons/bi'
import { FiFigma} from 'react-icons/fi'
import { PiProjectorScreenChartBold } from 'react-icons/pi'
import {BsFillCalendar2EventFill } from 'react-icons/bs'
import {GiStarShuriken} from 'react-icons/gi'

// import Language from "../pages/Language";
function MainHome() {
    
  return (
    <div className={style.container}>
       <div className={style.program}>
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
                            <TiHtml5 className={style.TiHtml5}/>
                            <p className="par"> - HTML5</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                    </Link>
                        <Link to="/Language#css" className={style.link}>
                        <div className={style.conatProItm}>
                            <DiCss3 className={style.TiHtml5}/>
                            <p className={style.par} > - CSS3</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        </Link>
                        <div className={style.conatProItm}>
                            <TbBrandJavascript className={style.TiHtml5}/>
                            <p className="par"> - JavaScript</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <TbBrandJavascript className={style.TiHtml5}/>
                            <p className="par"> - JavaScript</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <TbBrandJavascript className={style.TiHtml5}/>
                            <p className="par"> - JavaScript</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                    </div>
                </div>
            </div>
            {/* another item */}
            <div className={style.itemsProgram}>
            <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <TbToolsOff className={style.iconLanguage} style={{fontSize: '25px'}}/>
                        <p className="par">Tools</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                        <div className={style.conatProItm}>
                            <TbBrandVscode className={style.TiHtml5}/>
                            <p className="par"> - Vscode</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <BiLogoGithub className={style.TiHtml5}/>
                            <p className="par"> - Github</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <FiFigma className={style.TiHtml5}/>
                            <p className="par"> - Figma</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <FiFigma className={style.TiHtml5}/>
                            <p className="par"> - Figma</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                    </div>
                </div>
            </div>
            {/* another item */}
            <div className={style.itemsProgram}>
            <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <PiProjectorScreenChartBold className={style.iconLanguage} style={{fontSize: '30px', marginTop: '10px'}}/>
                        <p className="par">Projects</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - Vscode</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - Github</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - Figma</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        <div className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - Figma</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <div className={style.events}>
            <div className={style.itemsEvents}>
                <div className={style.contInsidEvents}>
                        <div className={style.titleEvents}>
                            <BsFillCalendar2EventFill className={style.iconTitle}/>
                            <p className="par">Events</p>
                            <AiFillCaretDown className={style.iconTitle}/>
                        </div>
                        <div className={style.UnderConatEvent}>
                            <div className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - Vscode</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                            <div className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - Vscode</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                            <div className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - Vscode</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                            <div className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - Vscode</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                        </div>
                </div>
                    {/* finish  contInsideEvents*/}
            </div>
        {/* finish  item*/}
       {/* another item */}
       <div className={style.itemsEvents}>
                <div className={style.contInsidEvents}>
                        <div className={style.titleEvents}>
                            <BsFillCalendar2EventFill className={style.iconTitle}/>
                            <p className="par">Events</p>
                            <AiFillCaretDown className={style.iconTitle}/>
                        </div>
                        <div className={style.UnderConatEvent}>
                            <div className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - Vscode</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                        </div>
                </div>
                    {/* finish  contInsideEvents*/}
            </div>
        </div>
       {/* finish  itemsEvents */}
    </div>
  );
}

export default MainHome;
