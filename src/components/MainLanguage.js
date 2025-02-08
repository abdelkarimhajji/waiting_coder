import React, { useState, useEffect } from 'react';
import style from '../sass/mainLanguage.module.scss';
import { FaCode } from 'react-icons/fa';
import { TiHtml5 } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import {  TbBrandJavascript, TbBrandVscode} from 'react-icons/tb'
import { DiCss3 } from 'react-icons/di'
import {BiLogoGithub} from 'react-icons/bi'
import { FiFigma} from 'react-icons/fi'
import {BsFiletypePhp} from 'react-icons/bs'
import {SiXampp} from 'react-icons/si'
import {AiOutlineLink} from 'react-icons/ai'

function MainLanguage() {
  const [setSelectValuesLanguages, setSetSelectValuesLanguages] = useState([]);
  
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

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/getLanguagesAndLinks/${localStorage.getItem("selectedOptionKey")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
      })
      .catch((error) => console.error(error));
  }, []);

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
                    <p>choose The link</p>
                </div>
              <div className={style.allLinks}>
              {language.links.map((link) => (
                <div key={link.linkId} className={style.link}>
                  <AiOutlineLink  className={style.AiOutlineLink}/>
                  <p ><a href={link.link} target="_blank" rel="noopener noreferrer">{link.linkName}</a></p>
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
