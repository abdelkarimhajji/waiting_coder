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
      fetch(`http://localhost:8081/api/get_tools/${localStorage.getItem("selectedOptionKey")}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("hello i am karim ok")
          setSetSelectValuesTools(data);
        })
        .catch((error) => console.error(error));
    }, [setSelectValuesTools]);
  return (
    <div className={style.container}>
        <div className={style.language}>
          <FaCode className={style.FaCode} />
          <p>Tool(s)</p>
          <AiFillCaretDown className={style.aifillcaerdown} />
        </div>
        {/* container of languages */}
        {setSelectValuesTools.map((item, index) => (
        <div key={index} className={style.cantAllLanguage} id="html" ref={sectionRef}>
          <div className={style.titleLanguage}>
          {React.createElement(iconMapping[item.name_icon] || Default, { className: style.IconTitleLanguage })}
            <p> - {item.name_tool}</p>
          </div>
          <div className={style.contentTitleLanguage}>
            <p>{item.description}</p>
          </div>
          <div className={style.validationLanguage}>
            <div className={style.containLink}>
              <BsArrowRight className={style.iconLink} />
              <p className={style.nameLink}>Click on the link</p>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}><a href={item.link} target="_blank" rel="noopener noreferrer">Click on the link</a></p>
            </div>
          </div>
        </div>
        ))}
        {/* finish container of languages */}
      </div>
  );
}

export default MainTools;
