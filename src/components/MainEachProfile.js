import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import style from "../sass/maineachprofile.module.scss";
import {AiFillCaretDown} from 'react-icons/ai';
import {PiProjectorScreenChartBold} from 'react-icons/pi'
import {FaCode} from 'react-icons/fa';
import {TiHtml5} from 'react-icons/ti';
import {FaUpload} from 'react-icons/fa';
import {GiStarShuriken} from 'react-icons/gi';
import {BsFillCalendar2EventFill} from 'react-icons/bs';
import {FaTrophy } from 'react-icons/fa'

import { Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis , Radar } from 'recharts'; 

function MainEachProfile({idCollectionValue, id}) {

  const [selectedValues, setSelectedValues] = useState([])
  const [selectValuePoject, setselectValuePoject] = useState([])
  const [selectedValuesTools, setSelectedValuesTools] =  useState([])
  const [skills, setSkills] = useState([])
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_languages/${idCollectionValue}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setSelectedValues(data);
          })
          .catch((error) => console.error(error));
      }, [idCollectionValue]);

      useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_porject/${idCollectionValue}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.length > 0) {
              localStorage.setItem("idProject", data[0].id);
            }
            setselectValuePoject(data);
          })
          .catch((error) => console.error(error));
      }, [idCollectionValue]);


      useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_tools/${idCollectionValue}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            setSelectedValuesTools(data);
          })
          .catch((error) => console.error(error));
      }, [idCollectionValue]);

      useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_skills/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSkills(data);
          })
          .catch((error) => console.error(error));
      }, [id]);
      const data = [
        {
          "subject": skills.length > 0 ? skills[0].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 && skills[0].validation === 1 ? 15 : skills[0].validation_week === 1 ? 3 : skills[0].validation === 1 ? 15 : 1.5) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[1].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 && skills[1].validation === 1 ? 15 : skills[0].validation_week === 1 ? 3 : skills[1].validation === 1 ? 15 : 1.5) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[2].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 && skills[2].validation === 1 ? 15 : skills[0].validation_week === 1 ? 3 : skills[2].validation === 1 ? 15 : 1.5) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[3].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 && skills[3].validation === 1 ? 15 : skills[0].validation_week === 1 ? 3 : skills[3].validation === 1 ? 15 : 1.5) : 0,
          "fullMark": 15
        },
        {
          "subject": skills.length > 0 ? skills[4].shurt_name : "",
          "A": skills.length > 0 ? (skills[0].validation_week === 1 && skills[4].validation === 1 ? 15 : skills[0].validation_week === 1 ? 3 : skills[4].validation === 1 ? 15 : 1.5) : 0,
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
      }, [id]);

  return (
    <div className={style.container}>
       <div className={style.program}>
            <div className={style.itemsProgram}>
                <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <PiProjectorScreenChartBold className={style.iconLanguage}/>
                        <p className="par">Languages</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                        {selectedValues.map((item, index) => (
                        // <Link key={index} to="/Language#html" className={style.link}>
                            <div key={index} className={style.conatProItm}>
                                <FaUpload className={style.TiHtml5}/>
                                <p className="par"> - {item.languageName}</p>
                            </div>
                        // </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* another item */}
            <div className={style.itemsProgram}>
                <div className={style.contInsidProgram}>
                    <div className={style.titleProgram}>
                        <FaCode className={style.iconLanguage}/>
                        <p className="par">Projects</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                    {selectValuePoject.map((item, index) => (
                    // <Link key={index} to="/Language#html" className={style.link}>
                        <div key={index} className={style.conatProItm}>
                            <TiHtml5  className={style.TiHtml5}/>
                            <p className="par"> - {item.name_project}</p>
                        </div>
                    // </Link>
                    ))}
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
                        <p className="par">Tools</p>
                        <AiFillCaretDown className={style.iconLanguage}/>
                    </div>
                    <div className={style.UnderConatProgram}>
                        {selectedValuesTools.map((item, index) => (
                        <div key={index} className={style.conatProItm}>
                            <GiStarShuriken className={style.TiHtml5}/>
                            <p className="par"> - {item.name_tool}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.itemsProgram}>
          <div className={style.contInsidEvents}>
                  <div className={style.titleEvents}>
                      <FaTrophy className={style.iconTitle}/>
                      <p className="par">Skills</p>
                      <AiFillCaretDown className={style.iconTitle}/>
                  </div>
                  <div style={{overflowY: 'scroll', height:'230px', scrollbarWidth:'none'}}>
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
          </div>
              {/* finish  contInsideEvents*/}
      </div>
        </div>
       {/* finish  itemsEvents */}
       
    </div>
  );
}

export default MainEachProfile;
