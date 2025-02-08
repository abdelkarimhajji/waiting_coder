import React, { useEffect } from "react";
import style from '../sass/dashboard.module.scss'
import NavbarAdmin from '../components/NavbarAdmin'
import Footer from "../../components/Footer";
import SearchAdmin from '../components/SearchAdmin';
import MainAddUser from '../components/MainAddUser';

function AddUser() {
  
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <NavbarAdmin />
      </div>
      <div className={style.nextNav}>
        <SearchAdmin />
        <MainAddUser />
        <Footer />
      </div>
    </div>
  );

}

export default AddUser;
