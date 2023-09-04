import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/mainaddusers.module.scss'
import {HiFolderRemove} from 'react-icons/hi'

function AddUsers() {
   
  return (
    <div className={style.container}>
        <div className={style.containerValidateProject}>
            <div className={style.containerTitle}>
                <HiFolderRemove  className={style.iconFolder}/>
                <p>Finish Group</p>
            </div>
        </div>
    </div>
  );

}

export default AddUsers;
