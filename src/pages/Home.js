import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Level from "../components/Level";
import MainHome from "../components/MainHome";
import Footer from "../components/Footer";
import style from "../sass/home.module.scss";
import { UserContext } from "../utils/UserContext";

function Home() {
  const location = useLocation();
  const { state } = location;
  const number = state && state.number ? state.number : 0;
  const { value, setValue, isLogin, setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const [updatedNumber, setUpdatedNumber] = useState(number);
  const [valid, setValid] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   if (parseInt(localStorage.getItem("login")) !== 1) {
  //     // setValue(0);
  //     navigate("/", { replace: true });
  //   } else {
  //     // setValue(1);
  //   }
  // }, [navigate]);

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={style.nextNav}>
        <Searsh />
        <Level />
        <MainHome />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
