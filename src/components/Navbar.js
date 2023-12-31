import style from "../sass/navbar.module.scss";
import { Link } from 'react-router-dom';
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import React, { useState, useEffect, useContext } from "react";
import karim from '../imgs/karim.png';
import { UserContext } from '../utils/UserContext';
import { FaCode, FaUpload, FaStar } from 'react-icons/fa'
import {TbToolsOff} from 'react-icons/tb'
import {PiProjectorScreenChartBold} from 'react-icons/pi'
import {BsFillCalendar2EventFill} from 'react-icons/bs'
import {PiSignOutBold} from 'react-icons/pi'
import {FaTrophy} from 'react-icons/fa'

function Navbar(props) {
  const [hovered, setHovered] = useState(true);
  const [clickedElement, setClickedElement] = useState(null);
  const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);


  const handleClick = () => {
    if (hovered === true)
      setHovered(false);
    else
      setHovered(true);    
  };
  useEffect(() => {
    const handleWindowClick = (event) => {
      const className = event?.target?.className;
      if ((className == 'home_nextNav__ly6kh' || className == 'level_contLevel__MgiZe'
        || className == 'search_search__Qsxif' || className == 'level_level__e5II8' 
        || className == 'nameUser' || className == 'imgUser' || className == 'select'
        || className == 'search_photo__14TYx' || className == 'search_user__5phco' 
        || className == 'search_name__tG9en' || className == "search_container__633Wd"
        || className == 'level_photoPhon__mQ-xD' || className =='mainhome_container__4cLCr'
        || className == 'mainhome_itemsProgram__ohGGv' || className == "mainhome_itemsEvents__gchN6"
        || className == "mainhome_program__HKcK6" || className == "mainhome_itemsProgram__ohGGv"
        || className == 'mainhome_itemsEvents__gchN6' || className == "mainhome_events__DwRPV"
        || className == 'mainhome_program__HKcK6' || className == 'mainhome_conatEventItm__2w9U2'
        || className == 'mainhome_contInsidEvents__GQYo6' || className == 'mainhome_titleEvents__pQdD8'
        || className == 'mainhome_titleProgram__2jm9g' || className == 'mainhome_contInsidProgram__-d0V2'
        || className == 'par'
        || className == 'level_container__FNb5F' ) && hovered === false) {
        handleClick();
      }
      console.log("Clas s:   " + className );
      // setClickedElement(className);
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [hovered]);
  const logout = () => {
    console.log("i am rest to 0");
    localStorage.removeItem("selectedOptionKey");
    localStorage.removeItem("userId");
    localStorage.removeItem('idProject');
    localStorage.removeItem('idEachProfile');
    localStorage.setItem('login', 0);
    // setIsLogin(0);
  };
  const userId = localStorage.getItem("userId");
  const [selectedValuesUsers, setSelectedValuesUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8081/get_user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedValuesUsers(data);
      })
      .catch((error) => console.error(error));
      
  }, [userId]);
  const close = () => {
    setHovered(true);
  }
  return (
    <>
      <div className={hovered === true ? style.navbar : style.navbarOut}>
        {hovered === true ? (
          <AiOutlineMenuUnfold className={style.menu} onClick={handleClick} />
        ) : (
          <AiOutlineMenuFold className={style.menu} onClick={handleClick} />
        )}
        <div className={style.nameUser}>
          {selectedValuesUsers[0] ? (
          <div>
            <img src={require(`../imgs/${selectedValuesUsers[0].image}`)} alt="" className={style.img} />
            <p>@{selectedValuesUsers[0].lastName}</p>
          </div>
            ) : (
              <>
                <img src={karim} alt="" className={style.img} /> 
                <p>admin</p>
                </>
            )}
        </div>
        
        <div className={style.twoUl}>
        <Link to="/Home" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>HOME</p>
            <p className={style.twoItem}><AiOutlineHome className={style.AiOutlineMenuFold} /></p>
          </div>
        </Link>
        <Link to="/Language" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Languages</p>
            <p className={style.twoItem}><FaCode className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
          <Link to="/Tools" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Tools</p>
            <p className={style.twoItem}><TbToolsOff className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
          <Link to="/Project" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Projects</p>
            <p className={style.twoItem}><PiProjectorScreenChartBold className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
          <Link to="/Profile" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Profiles</p>
            <p className={style.twoItem}><FiUsers className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
          <Link to="/Event" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Events</p>
            <p className={style.twoItem}><BsFillCalendar2EventFill className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
          <Link to="/Competition" className={style.Link} onClick={close}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Competition</p>
            <p className={style.twoItem}><FaTrophy className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
          <Link to="/" className={style.Link}  onClick={logout}>
          <div className={style.containItemNav}>
            <p className={style.oneItem}>Sign Out</p>
            <p className={style.twoItem}><PiSignOutBold className={style.AiOutlineMenuFold} /></p>
          </div>
          </Link>
        </div>
        <div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
