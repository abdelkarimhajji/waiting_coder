import React, { useState, useEffect} from "react";
import { useLocation, Navigate , Link } from "react-router-dom";
import style from "../sass/mainhome.module.scss"
import { AiFillCaretDown, AiOutlineProject} from 'react-icons/ai';
import { FaCode, FaUpload, FaStar,FaTrophy } from 'react-icons/fa'
import {TiHtml5} from 'react-icons/ti'
import { TbHandClick , TbToolsOff, TbBrandJavascript, TbBrandVscode} from 'react-icons/tb'
import { DiCss3 } from 'react-icons/di'
import {BiLogoGithub} from 'react-icons/bi'
import { FiFigma} from 'react-icons/fi'
import { PiProjectorScreenChartBold } from 'react-icons/pi'
import {BsFillCalendar2EventFill } from 'react-icons/bs'
import {GiStarShuriken} from 'react-icons/gi'
import {BsFiletypePhp} from 'react-icons/bs'
import {SiXampp} from 'react-icons/si'

function MainHome({selectedValues, selectedValuesTools, selectedValuesProject}) {
    const [selectedValuesEvents, setSelectedValuesEvents] = useState([])
    const [selectedValuesCompetitions, setSelectedValuesCompetitions] = useState([])
    useEffect(() => {
        console.log("Selected Values:", selectedValuesProject);
      }, [selectedValues, selectedValuesTools, selectedValuesProject]);
      const iconMapping = {
        TiHtml5: TiHtml5,
        DiCss3: DiCss3,
        TbBrandJavascript: TbBrandJavascript,
        BsFiletypePhp:BsFiletypePhp,
        BiLogoGithub:BiLogoGithub,
        TbBrandVscode:TbBrandVscode,
        FiFigma:FiFigma,
        SiXampp:SiXampp,
      };
      const Default = TiHtml5;

      useEffect(() => {
        fetch(`http://localhost:8081/api/get_events`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesEvents(data);
          })
          .catch((error) => console.error(error));
      }, []);
    
      useEffect(() => {
        fetch(`http://localhost:8081/api/get_competitions`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesCompetitions(data);
          })
          .catch((error) => console.error(error));
      }, []);
    
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
                    {selectedValues.map((item, index) => (
                    <Link key={index} to={`/Language#${item.name_langauge}`} className={style.link}>
                            <div  className={style.conatProItm}>
                            {React.createElement(iconMapping[item.name_icon] || Default, { className: style.TiHtml5 })}
                            <p className="par"> - {item.name_langauge}</p>
                            <TbHandClick className={style.TbHandClick} />
                            </div>
                    </Link>
                        ))}
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
                    {selectedValuesTools.map((item, index) => (
                        <div key={index} className={style.conatProItm}>
                            {React.createElement(iconMapping[item.name_icon] || Default, { className: style.TiHtml5 })}
                            <p className="par"> - {item.name_tool}</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                    ))}
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
                    {selectedValuesProject.map((item, index) => (
                        <div key={index} className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par"> - {item.name_project}</p>
                            <TbHandClick className={style.TbHandClick} />
                        </div>
                        ))}
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
                        {selectedValuesEvents.map((item, index) => (
                            <div key={index} className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - {item.title_event}</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                        ))}
                        </div>
                </div>
                    {/* finish  contInsideEvents*/}
            </div>
        {/* finish  item*/}
       {/* another item */}
       <div className={style.itemsEvents}>
                <div className={style.contInsidEvents}>
                        <div className={style.titleEvents}>
                            <FaTrophy className={style.iconTitle}/>
                            <p className="par">Competition</p>
                            <AiFillCaretDown className={style.iconTitle}/>
                        </div>
                        <div className={style.UnderConatEvent}>
                        {selectedValuesCompetitions.map((item, index) => (
                            <div key={index} className={style.conatEventItm}>
                                <GiStarShuriken className={style.TiHtml5}/>
                                <p className="par"> - {item.title_competition}</p>
                                <TbHandClick className={style.TbHandClick} />
                            </div>
                        ))}
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
