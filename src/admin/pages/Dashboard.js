import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/dashboard.module.scss'

function Dashboard() {
  
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        {/* <Navbar /> */}
      </div>
      <div className={style.nextNav}>
        <p>fffff</p>
        {/* <Searsh />
        <MainTools />
        <Footer /> */}
      </div>
    </div>
  );

}

export default Dashboard;
