import React, { useState, useRef, useEffect } from 'react';
import style from '../sass/mainLanguage.module.scss';
import { FaYoutube, FaCode } from 'react-icons/fa';
import { TiHtml5 } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

function MainLanguage() {
  const [valid, setValid] = useState(0);
  const scrollableRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

//   useEffect(() => {
    //     window.scrollTo(0, 0);
    //   }, []);

    const location = useLocation();
    const sectionRef = useRef(null);

    useEffect(() => {
    const section = location.hash ? location.hash.slice(1) : '';
    if (section && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    }, [location]);

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
        <div className={style.cantAllLanguage} id="html" ref={sectionRef}>
          <div className={style.titleLanguage}>
            <TiHtml5 className={style.IconTitleLanguage} />
            <p> - HTML5</p>
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
              <button className={style.validateLink} onClick={displayWindow}>
                click me
              </button>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}>this link ok ....</p>
              <button className={style.validateLink} onClick={displayWindow}>
                click me
              </button>
            </div>
          </div>
        </div>
        {/* finish container of languages */}
        {/* container of languages */}
        <div className={style.cantAllLanguage} id="css" ref={sectionRef}>
          <div className={style.titleLanguage}>
            <TiHtml5 className={style.IconTitleLanguage} />
            <p> - HTML5</p>
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
              <button className={style.validateLink} onClick={displayWindow}>
                click me
              </button>
            </div>
            <div className={style.link}>
              <p className={style.clickLink}>this link ok ....</p>
              <button className={style.validateLink} onClick={displayWindow}>
                click me
              </button>
            </div>
          </div>
        </div>
        {/* finish container of languages */}
      </div>
    </>
  );
}

export default MainLanguage;
