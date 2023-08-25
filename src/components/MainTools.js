import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../sass/mainLanguage.module.scss";
import { UserContext } from "../utils/UserContext";
import { FaYoutube, FaCode } from 'react-icons/fa';
import { TiHtml5 } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AiOutlineProject} from 'react-icons/ai';
import { FaUpload, FaStar,FaTrophy } from 'react-icons/fa'
import { TbHandClick , TbToolsOff, TbBrandJavascript, TbBrandVscode} from 'react-icons/tb'
import { DiCss3 } from 'react-icons/di'
import {BiLogoGithub} from 'react-icons/bi'
import { FiFigma} from 'react-icons/fi'
import { PiProjectorScreenChartBold } from 'react-icons/pi'
import {BsFillCalendar2EventFill } from 'react-icons/bs'
import {GiStarShuriken} from 'react-icons/gi'
import {BsFiletypePhp} from 'react-icons/bs'
import {SiXampp} from 'react-icons/si'
import {AiOutlineLink} from 'react-icons/ai'

function MainTools() {
  const location = useLocation();
    const sectionRef = useRef(null);
    const [setSelectValuesTools, setSetSelectValuesTools] = useState([]);
    useEffect(() => {
    const section = location.hash ? location.hash.slice(1) : '';
    if (section && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    }, [location]);
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
      fetch(`http://localhost:8081/api/getToolsAndLinks/${localStorage.getItem("selectedOptionKey")}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("hello i am karim ok", data)
          setSetSelectValuesTools(data);
        })
        .catch((error) => console.error(error));
    }, [localStorage.getItem("selectedOptionKey")]);
  return (
    <div className={style.container}>
        <div className={style.language}>
          <FaCode className={style.FaCode} />
          <p>Tool(s)</p>
          <AiFillCaretDown className={style.aifillcaerdown} />
        </div>
        {/* container of languages */}
        {setSelectValuesTools.map((tools) => (
          
          <div key={tools.toolId} className={style.cantAllLanguage} id={tools.languageName} >
            {/* <section className={style.cardInner}> */}
                {/* <div className={style.front}> */}
                <div className={style.titleLanguage}>
                  <div className={style.containerIcon}>
                      {React.createElement(iconMapping[tools.toolIcon] || Default, { className: style.IconTitleLanguage })}
                  </div>
                  <div className={style.containerTitle}>
                      <p>{tools.toolName}</p>
                  </div>
                </div>
                <div className={style.contentTitleLanguage}>
                  <div className={style.overFlow}>
                      <p>{tools.toolDescription}</p>                          
                  </div>
                </div>
                <div className={style.back}>
                  <div className={style.chooseLink}>
                      <p>choose you link</p>
                  </div>
                <div className={style.allLinks}>
                {tools.links.map((link) => (
                  <div key={link.linkId} className={style.link}>
                    <AiOutlineLink  className={style.AiOutlineLink}/>
                    <p className={style.clickLink}><a href={link.link} target="_blank" rel="noopener noreferrer">{link.linkName}</a></p>
                  </div>  
                  ))}
                </div>
                </div>
          </div>
          ))}
        {/* finish container of languages */}
      </div>
  );
}

export default MainTools;
