import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Level from "../components/Level";
import Footer from "../components/Footer";
import style from "../sass/mainpushproject.module.scss";
import { UserContext } from "../utils/UserContext";
import {TbSend} from 'react-icons/tb'
import {MdLibraryAddCheck} from 'react-icons/md'
import {MdNumbers} from 'react-icons/md';
function MainPushProject() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.containerPush}>
        {/* containerProjectLink */}
        <div className={style.containerProjectLink}>
             <div className={style.chooseProject}>
                <div className={style.containerTitle}>
                    <p className={style.title}>Project(s)</p>
                </div>
                <div className={style.allProjects}>
                    <div className={style.porject}>
                        <div className={style.containerIcon}>
                            < MdNumbers  className={style.icon}/>
                        </div>
                        <p>this test of projects ok so if center you can tell me that ok</p>
                    </div>
                    <div className={style.porject}>
                        <div className={style.containerIcon}>
                            < MdNumbers  className={style.icon}/>
                        </div>
                        <p>this test of projects ok so if center you can tell me that ok</p>
                    </div>
                </div>
                
            </div>
            <div className={style.displayLink}>
                <div className={style.containerTitle}>
                    <p className={style.title}>Link(s)</p>
                </div>
                <div className={style.allMessages}> 
                    {/* all Messages */}
                    <div className={style.containerSendLink}>
                        <p className={style.nameSend}>karim: 10/10/2020</p>
                        <div className={style.sendLink}>
                            <p>slm i am karim slm i am m i am karim slm i am m i am karim slm i am </p>
                        </div>
                    </div>
                    <div className={style.containerResLink}>
                        <p className={style.nameRes}>admin: 11/10/2020</p>
                        <div className={style.resLink}>
                            <p>i am admin</p>
                        </div>
                    </div>
                    {/* finsh Messages */}
                </div>
            </div>
        </div> 
        {/* finish containerProjectLink */}
        {/* start push */}
        <div className={style.push}>
            <p className={style.title}>Put the link here:</p>
            {/* conatainer Input */}
            <div className={style.containerInput}>
                <input type="text" className={style.inputPush} placeholder="Enter your link here"/>
                <div className={style.containerAllIcon}>
                    <div className={style.containerIcon}>
                        <TbSend className={style.icon}/>
                    </div>
                </div>
            </div>
            {/* finsh container input */}
        </div>
        {/* finish push */}
      </div>
    </div>
  );
}

export default MainPushProject;
