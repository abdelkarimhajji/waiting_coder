import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/profile.module.scss";
import MainTools from '../components/MainTools';  

function Tools() {
  
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
        <MainTools />
        <Footer />
      </div>
    </div>
  );

}

export default Tools;
