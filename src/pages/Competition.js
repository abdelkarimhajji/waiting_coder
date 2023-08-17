import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/profile.module.scss";
import MainCompetition from "../components/MainCompetition";
import { UserContext } from "../utils/UserContext";


function Competition() {
  
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={style.nextNav}>
        <Searsh />
        <MainCompetition />
        <Footer />
      </div>
    </div>
  );
}

export default Competition;
