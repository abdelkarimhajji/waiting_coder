import React, { useState, useRef, useEffect } from 'react';
import style from '../sass/mainLanguage.module.scss';
import { FaYoutube, FaCode } from 'react-icons/fa';
import { TiHtml5 } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
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


function MainLanguage() {
  const [valid, setValid] = useState(0);
  const [setSelectValuesLanguages, setSetSelectValuesLanguages] = useState([]);
  
  const [scrollPosition, setScrollPosition] = useState(0);

  function displayWindow() {
    if (valid === 0) {
      document.body.style.transition = '1s all';
      // document.body.style.overflow = 'hidden';
      setValid(1);
    } else {
      //   document.body.style.overflow = 'auto';
      document.body.style.transition = '1s all';
      setValid(0);
    }
  }

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
    fetch(`http://localhost:8081/api/get_languages/${localStorage.getItem("selectedOptionKey")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSetSelectValuesLanguages(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <div className={valid === 1 ? style.display : style.display2}>
        <div className={style.displayContainValid}>
          <p>Are you sure you finished this course?</p>
          <div className={style.buttons}>
            <button className={style.yes} onClick={displayWindow}>
              Yes
            </button>
            <button className={style.no} onClick={displayWindow}>
              No
            </button>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.language}>
          <FaCode className={style.FaCode} />
          <p>Languages</p>
          <AiFillCaretDown className={style.aifillcaerdown} />
        </div>
        {/* container of languages */}
        {setSelectValuesLanguages.map((item, index) => (
        <div key={index} className={style.cantAllLanguage} id={item.name_langauge} >
          <div className={style.titleLanguage}>
          {React.createElement(iconMapping[item.name_icon] || Default, { className: style.IconTitleLanguage })}
            <p> - {item.name_langauge}</p>
          </div>
          <div className={style.contentTitleLanguage}>
            <p>{item.description}</p>
          </div>
          <div className={style.validationLanguage}>
            <div className={style.containLink}>
              <BsArrowRight className={style.iconLink} />
              <p className={style.nameLink}>First link to study HTML5:</p>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}><a href={item.link} target="_blank" rel="noopener noreferrer">Click on the link</a></p>
            </div>
          </div>
        </div>
        ))}
        {/* finish container of languages */}
      </div>
    </>
  );
}

export default MainLanguage;
