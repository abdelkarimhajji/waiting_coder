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
import {AiOutlineLink} from 'react-icons/ai'
import { HashLink} from 'react-router-hash-link';

function MainLanguage() {
  const [valid, setValid] = useState(0);
  const [setSelectValuesLanguages, setSetSelectValuesLanguages] = useState([]);
  
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    console.log("Current scroll position:", window.scrollY);
    const timer = setTimeout(() => {
        window.scrollTo({
          top: window.scrollY - 55,  
          behavior: 'smooth'
        });
    }, 100);  
    return () => clearTimeout(timer);
  }, []);
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
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_languages/${localStorage.getItem("selectedOptionKey")}`)
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

  const [test, setTest] = useState([])
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/getLanguagesAndLinks/${localStorage.getItem("selectedOptionKey")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTest(data);
        console.log("tish ", data);
      })
      .catch((error) => console.error(error));
  }, []);


  const [isFlipped, setIsFlipped] = useState(false);

  const handleButtonClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
     
      <div className={style.container}>
        <div className={style.language}>
          <FaCode className={style.FaCode} />
          <p>Languages</p>
          <AiFillCaretDown className={style.aifillcaerdown} />
        </div>
        {/* container of languages */}
        {setSelectValuesLanguages.map((language) => (
          
        <div key={language.languageId} className={style.cantAllLanguage} id={language.languageName}>
          {/* <section className={style.cardInner}> */}
              {/* <div className={style.front}> */}
              <div className={style.titleLanguage}>
                <div className={style.containerIcon}>
                    {React.createElement(iconMapping[language.languageIcon] || Default, { className: style.IconTitleLanguage })}
                </div>
                <div className={style.containerTitle}>
                    <p>{language.languageName}</p>
                </div>
              </div>
              <div className={style.contentTitleLanguage}>
                <div className={style.overFlow}>
                    <p>{language.languageDescription}</p>                          
                </div>
              </div>
              <div className={style.back}>
                <div className={style.chooseLink}>
                    <p>choose you link</p>
                </div>
              <div className={style.allLinks}>
              {language.links.map((link) => (
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
    </>
  );
}

export default MainLanguage;
