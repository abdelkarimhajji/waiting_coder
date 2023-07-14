import React, { useState, useEffect, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Level from "../components/Level";
import MainHome from "../components/MainHome";
import style from "../sass/footer.module.scss";
import { UserContext } from "../utils/UserContext";

function Footer() {
  
  return (
    <div className={style.container}>
        <div className={style.child}>
            <p>Edit-informations</p>
            <p>Portability-requests</p>
            <p>Anonymization-requests</p>
            <p>I-have-a-problem</p>
        </div>
    </div>
  );
}

export default Footer;
