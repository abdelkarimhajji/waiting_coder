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

function MainHome({selectedValues, selectedValuesTools, selectedValuesProject}) {
    const [selectedValuesEvents, setSelectedValuesEvents] = useState([])
    const [selectedValuesCompetitions, setSelectedValuesCompetitions] = useState([])
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
                    <Link
                    to={{
                      pathname: '/Language',
                      hash: `#${item.name_langauge}`,
                      state: { sectionId: item.name_langauge } // Pass the section ID as state
                    }}
                    className={style.link}
                    key={index}
                  >
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
                            {Array.isArray(selectedValuesCompetitions)  ? (
                              selectedValuesCompetitions.map((item, index) => (
                                <Link key={index} to={`/Event#${item.title_competition}`} className={style.link}>
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
        </div>
       {/* finish  itemsEvents */}
    </div>
  );
}

export default MainHome;
// SELECT *
// FROM ((((user
// INNER JOIN specifics ON user.id = specifics.id_user)
// INNER JOIN groups ON specifics.id_group = groups.id)
// INNER JOIN name_specifics ON name_specifics.id = specifics.id_nameSpecifics)
// INNER JOIN projects ON name_specifics.id = projects.id_collection) WHERE groups.group_valid = 1 and user.id = 2

// SELECT *
// FROM (((((user
// INNER JOIN specifics ON user.id = specifics.id_user)
// INNER JOIN groups ON specifics.id_group = groups.id)
// INNER JOIN name_specifics ON name_specifics.id = specifics.id_nameSpecifics)
// INNER JOIN projects ON name_specifics.id = projects.id_collection) 
// INNER JOIN projects_display ON projects_display.id_project = projects.id) where user.id = 2  and projects_display.display = 1


// SELECT *
// FROM ((((user
// INNER JOIN specifics ON user.id = specifics.id_user)
// INNER JOIN name_specifics ON name_specifics.id = specifics.id_nameSpecifics)
// INNER JOIN projects ON projects.id_collection = name_specifics.id)
// INNER JOIN groups_permissions ON groups_permissions.id = projects.id)
// where user.id_group = 1 and groups_permissions.permission = 1 and groups_permissions.finished = 0


// last one id the good now 
// SELECT * 
// FROM ((((user 
// INNER JOIN specifics ON user.id = specifics.id_user)
// INNER JOIN name_specifics ON specifics.id_nameSpecifics = name_specifics.id)
// INNER JOIN projects ON name_specifics.id = projects.id_collection)
// INNER JOIN groups_permissions ON specifics.id_group = groups_permissions.id_group)
// WHERE user.id = 2 and specifics.id_group = 1 and groups_permissions.id_project = 1 and projects.id = 1

