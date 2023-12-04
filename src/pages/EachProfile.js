import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Footer from "../components/Footer";
import style from "../sass/eachprofile.module.scss";
import { UserContext } from "../utils/UserContext";
import EachLevel from "../components/EachLevel";
import MainEachProfile from '../components/MainEachProfile';

function EachProfile() {

  const [idCollectionValue, setIdCollectionValue] = useState();
  const [id, setId] = useState();
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
        <EachLevel setIdCollectionValue={setIdCollectionValue} setId={setId}/>
        <MainEachProfile idCollectionValue={idCollectionValue} id={id}/>
        <Footer />
      </div>
    </div>
  );
}

export default EachProfile;
