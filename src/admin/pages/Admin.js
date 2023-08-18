import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/admin.module.scss';
import {FaUserShield} from 'react-icons/fa';
import {SiCodersrank} from 'react-icons/si';

function Admin() {
  
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
  return (
    <div className={style.container}>
       <div className={style.leftSide}>
            <div className={style.overlay}>
                <div className={style.contianerTitle}>
                    <div className={style.containerContent}>
                        <SiCodersrank  className={style.icon}/>
                        <p className={style.title}>Waiting Coders</p>
                        <div className={style.description}>
                            <p>Unlock the world of possibilities through the lines of code</p>
                        </div>
                    </div>
                </div>
                <div className={style.containerCopieRight}>
                <p>&copy; 2023 Waiting Coder. All rights reserved.</p>
                </div>
            </div>
       </div>
       <div className={style.loginSide}>
            <div className={style.containerLogin}>
                <div className={style.containerIcon}>
                    <FaUserShield className={style.icon}/>
                </div>
                <div className={style.containerInputs}>
                    <input type="text" placeholder="Enter your username" className={style.input}/>
                    <input type="text" placeholder="Enter your password" className={style.input}/>
                </div>
                <div className={style.containerSubmit}>
                    <input type="button" value="submit" className={style.submit}/>
                </div>
            </div>
       </div>
    </div>
  );
}

export default Admin;
