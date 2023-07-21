import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Level from "../components/Level";
import Footer from "../components/Footer";
import style from "../sass/pushproject.module.scss";
import { UserContext } from "../utils/UserContext";
import MainPushProject from "../components/MainPushProject";

function PushProject() {
  
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
        <MainPushProject />
        <Footer />
      </div>
    </div>
  );
}

export default PushProject;
