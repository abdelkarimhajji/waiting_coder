import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import style from "../sass/mainLanguage.module.scss";
import {  FaCode } from 'react-icons/fa';
import { TiHtml5 } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import {  TbBrandJavascript, TbBrandVscode} from 'react-icons/tb'
import { DiCss3 } from 'react-icons/di'
import {BiLogoGithub} from 'react-icons/bi'
import { FiFigma} from 'react-icons/fi'
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
    let selectedOptionKey = localStorage.getItem("selectedOptionKey");
    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/getToolsAndLinks/${localStorage.getItem("selectedOptionKey")}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSetSelectValuesTools(data);
        })
        .catch((error) => console.error(error));
    }, [selectedOptionKey]);

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
    
  return (
    <div className={style.container}>
        <div className={style.language}>
          <FaCode className={style.FaCode} />
          <p>Tool(s)</p>
          <AiFillCaretDown className={style.aifillcaerdown} />
        </div>
        {/* container of languages */}
        {setSelectValuesTools.map((tools) => (
          
          <div key={tools.toolId} className={style.cantAllLanguage} id={tools.toolName} >
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
                      <p>choose The link</p>
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
