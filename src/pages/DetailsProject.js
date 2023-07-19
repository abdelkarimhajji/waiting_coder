import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/detailsproject.module.scss";
import { UserContext } from "../utils/UserContext";
import MainDetailsProject from '../components/MainDetailsProject'

function DetailsProject() {
  
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
        <MainDetailsProject />
        <Footer />
      </div>
    </div>
  );
}

export default DetailsProject;
