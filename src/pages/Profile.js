import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/profile.module.scss";
import { UserContext } from "../utils/UserContext";
import MainProfile from "../components/MainProfile";

function Profile() {
  
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
        <MainProfile />
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
