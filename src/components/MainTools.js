import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../sass/mainLanguage.module.scss";
import { UserContext } from "../utils/UserContext";
import { FaYoutube, FaCode } from 'react-icons/fa';
import { TiHtml5 } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
function MainTools() {
  const location = useLocation();
    const sectionRef = useRef(null);

    useEffect(() => {
    const section = location.hash ? location.hash.slice(1) : '';
    if (section && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    }, [location]);
  return (
    <div className={style.container}>
        <div className={style.language}>
          <FaCode className={style.FaCode} />
          <p>Tool(s)</p>
          <AiFillCaretDown className={style.aifillcaerdown} />
        </div>
        {/* container of languages */}
        <div className={style.cantAllLanguage} id="html" ref={sectionRef}>
          <div className={style.titleLanguage}>
            <TiHtml5 className={style.IconTitleLanguage} />
            <p> - Github</p>
          </div>
          <div className={style.contentTitleLanguage}>
            <p>This is description. This is description. This is description. This is description.</p>
          </div>
          <div className={style.validationLanguage}>
            <div className={style.containLink}>
              <BsArrowRight className={style.iconLink} />
              <p className={style.nameLink}>First link to study HTML5:</p>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}>this link ok ....</p>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}>this link ok ....</p>
            </div>
          </div>
        </div>
        {/* finish container of languages */}
        {/* container of languages */}
        <div className={style.cantAllLanguage} id="css" ref={sectionRef}>
          <div className={style.titleLanguage}>
            <TiHtml5 className={style.IconTitleLanguage} />
            <p> - VsCode</p>
          </div>
          <div className={style.contentTitleLanguage}>
            <p>This is description. This is description. This is description. This is description.</p>
          </div>
          <div className={style.validationLanguage}>
            <div className={style.containLink}>
              <BsArrowRight className={style.iconLink} />
              <p className={style.nameLink}>First link to study HTML5:</p>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}>this link ok ....</p>
              {/* <button className={style.validateLink} onClick={displayWindow}>
                click me
              </button> */}
            </div>
            <div className={style.link}>
              <p className={style.clickLink}>this link ok ....</p>
              {/* <button className={style.validateLink} onClick={displayWindow}>
                click me
              </button> */}
            </div>
          </div>
        </div>
        {/* finish container of languages */}
      </div>
  );
}

export default MainTools;
