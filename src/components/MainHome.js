import React, { useState, useEffect, useId, useRef} from "react";
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
import {CgUnavailable} from 'react-icons/cg';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis , Radar } from 'recharts'; 

function MainHome({selectedValues, selectedValuesTools, selectedValuesProject}) {
    const [selectedValuesEvents, setSelectedValuesEvents] = useState([])
    const [selectedValuesCompetitions, setSelectedValuesCompetitions] = useState([])
    const [test, setTest] = useState([])
    const [skills, setSkills] = useState([])
    const userId = localStorage.getItem("userId");
    const selectedOptionKey = localStorage.getItem("selectedOptionKey");
    
    useEffect(() => {
        // console.log("Selected Values:", selectedValuesProject);
      }, [selectedValues, selectedValuesTools, selectedValuesProject]);
        // if (!localStorage.getItem("idProject"))
        //         localStorage.setItem("idProject", selectedValuesProject[0].id);
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
      // console.log("i juset test ok : ", selectedOptionKey)
      console.log("i juset test ok : ", userId)
      useEffect(() => {
        fetch(`http://localhost:8081/api/get_events/${userId}/${selectedOptionKey}`)
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
          
      }, [userId, selectedOptionKey]);
      
      useEffect(() => {
        fetch(`http://localhost:8081/api/get_competitions/${userId}/${selectedOptionKey}`)
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

      }, [userId, selectedOptionKey]);

      useEffect(() => {
        fetch(`http://localhost:8081/api/get_skills/${userId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSkills(data);
            console.log("tish ", data);
          })
          .catch((error) => console.error(error));
      }, []);
      
      // console.log("localStorage.getItem  " + localStorage.getItem("login"))
      const data = [
        {
          "subject": skills.length > 0 ? skills[0].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 ? (skills[0].validation === 1 ? 15 : 3) : 0) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[1].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 ? (skills[1].validation === 1 ? 15 : 3) : 0) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[2].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 ? (skills[2].validation === 1 ? 15 : 3) : 0) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[3].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 ? (skills[3].validation === 1 ? 15 : 3) : 0) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[4].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 ? (skills[4].validation === 1 ? 15 : 3) : 0) : 0,
          "fullMark": 15
        }
      ]




      const [chartOuterRadius, setChartOuterRadius] = useState(90);

      const [fontSize, setFontSize] = useState(17);
      useEffect(() => {
        const handleResize = () => {
          const screenWidth = window.innerWidth;
    
          if (screenWidth >= 470) {
            setChartOuterRadius(90);
            setFontSize(16);
          } else if (screenWidth <= 470 && screenWidth > 430) {
            setChartOuterRadius(70);
            setFontSize(14);
          } else if (screenWidth <= 430 && screenWidth > 310) {
            setChartOuterRadius(50);
            setFontSize(12);
          } else if (screenWidth <= 310) {
            setChartOuterRadius(40);
            setFontSize(10);
          }
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
  return (
    <>
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
                    {selectedValues.map((language) => (
                    <Link
                    to={{
                      pathname: '/Language',
                      hash: `#${language}`,
                      state: { sectionId: language.languageName } // Pass the section ID as state
                    }}
                    className={style.link}
                    key={language.languageId}
                  >
                  <div  className={style.conatProItm}>
                  {React.createElement(iconMapping[language.languageIcon] || Default, { className: style.TiHtml5 })}
                  <p className="par"> - {language.languageName}</p>
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
                      <Link key={index} to={`/Tools#${item.name_tool}`} className={style.link}>
                        <div key={index} className={style.conatProItm}>
                            {React.createElement(iconMapping[item.name_icon] || Default, { className: style.TiHtml5 })}
                            <p className="par"> - {item.name_tool}</p>
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
                        <PiProjectorScreenChartBold className={style.iconLanguage} style={{fontSize: '30px', marginTop: '10px'}}/>
                        <p className="par">Projects</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                    {selectedValuesProject.map((item, index) => (
                        // item.display === 1 && (
                          <Link key={index} to={`/Project#${item.name_project}`} className={style.link}>
                            <div key={index} className={style.conatProItm}>
                            <FaUpload className={style.TiHtml5}/>
                            <p className="par">- {item.name_project}</p>
                            <TbHandClick className={style.TbHandClick} />
                            </div>
                            </Link>
                        // )
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
                        {Array.isArray(selectedValuesEvents) ? (
                        selectedValuesEvents.map((item, index) => (
                          <Link key={index} to={`/Event#${item.title_event}`} className={style.link}>
                          <div key={index} className={style.conatEventItm}>
                            <GiStarShuriken className={style.TiHtml5} style={{fontSize: '30px', marginTop: '10px'}}/>
                            <p className="par"> - {item.title_event}</p>
                            <TbHandClick className={style.TbHandClick} />
                          </div>
                          </Link>
                        ))
                      ) : (
                        <>
                        <div  className={style.conatEventItm}>
                        <CgUnavailable className={style.TiHtml5}/>
                        <p> - No events available.</p>
                        </div>
                        </>
                      )}

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
                        <div className={style.UnderConatEvent}>
                            {selectedValuesCompetitions.length != 0  ? (
                              selectedValuesCompetitions.map((item, index) => (
                                <Link key={index} to={`/Competition#${item.title_competition}`} className={style.link}>
                                  <div key={index} className={style.conatEventItm}>
                                    <GiStarShuriken className={style.TiHtml5} style={{fontSize: '30px', marginTop: '10px'}}/>
                                    <p className="par"> - {item.title_competition}</p>
                                    <TbHandClick className={style.TbHandClick} />
                                  </div>
                                </Link>
                              ))
                            ) : (
                              <div className={style.conatEventItm}>
                                <CgUnavailable className={style.TiHtml5}/>
                                <p> - No competitions available.</p>
                              </div>
                            )}
                          </div>
                        </div>
                </div>
                    {/* finish  contInsideEvents*/}
            </div>
            {/* another item */}
            <div className={style.itemsEvents}>
                      <div className={style.contInsidEvents}>
                              <div className={style.titleEvents}>
                                  <FaTrophy className={style.iconTitle}/>
                                  <p className="par">Skills</p>
                                  <AiFillCaretDown className={style.iconTitle}/>
                              </div>
                              <div className={style.skills}>
                                <ResponsiveContainer width="100%" height={250}>
                                <RadarChart outerRadius={chartOuterRadius}  data={data} >
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: fontSize }}/>
                                <PolarRadiusAxis angle={18} domain={[0, 15]} tick={{ fontSize: 12 }}/>
                                <Radar  dataKey="A" stroke="#038688" fill="#038688" fillOpacity={0.6} />
                                <Legend />
                                </RadarChart>
                                </ResponsiveContainer>
                              </div>
                              <div className={style.readCharts}>
                                <p>Devlopement Web Front end : D-W-F</p>
                                <p>Devlopement Web Back end : D-W-B</p>
                                <p>Mobile Front-end : M-F</p>
                                <p>Mobile Back-end : M-B</p>
                                <p>Robitique : R</p>
                              </div>
                      </div>
                          {/* finish  contInsideEvents*/}
                  </div>
                {/* finish  itemsEvents */}
        </div>
    </div>
  </>
  );
}

export default MainHome;
  