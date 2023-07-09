import style from "../sass/navbar.module.scss"
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineHome} from 'react-icons/ai';
import {FiUsers} from 'react-icons/fi';
import React, { useState, useEffect } from "react";
// import { BiFacebook } from 'react-icons/bi';

function Navbar() {
  const [hovered, setHovered] = useState(true);

  const handleClick= () => {
    console.log("Icon hovered");
    if (hovered === true)
      setHovered(false);
    else
    setHovered(true);
  };
    return (
      <>
      <div  className={hovered === true ? style.navbar : style.navbarOut} >
          {hovered === true ? (
                <AiOutlineMenuUnfold className={style.menu} onClick={handleClick} />
              ) : (
                <AiOutlineMenuFold className={style.menu} onClick={handleClick} />
          )}
          <div className={style.twoUl}>
            <div className={style.containItemNav}>
                <p className={style.oneItem}>HOME</p>
                <p className={style.twoItem}><AiOutlineHome className={style.AiOutlineMenuFold}/></p>
            </div>
            <div className={style.containItemNav}>
                <p className={style.oneItem}>Profiles</p>
                <p className={style.twoItem}><FiUsers className={style.AiOutlineMenuFold}/></p>
            </div>
            <div className={style.containItemNav}>
              <p className={style.oneItem}>Profiles</p>
                <p className={style.twoItem}><FiUsers className={style.AiOutlineMenuFold}/></p>
            </div>
            <div className={style.containItemNav}>
                <p className={style.oneItem}>Profiles</p>
                <p className={style.twoItem}><FiUsers className={style.AiOutlineMenuFold}/></p>
            </div>
          </div>
          
        </div>
        {/* <span>fsdfhsdf</span> */}
        </>
    );
  }
  
  export default Navbar;