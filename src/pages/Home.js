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
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValuesTools, setSelectedValuesTools] = useState([]);
  const [selectedValuesProject, setSelectedValuesProject] = useState([]); 
  const [levelData, setLevelData] = useState([]);
  const updateLevelData = (data) => {
    setLevelData(data);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("you cant read it ",selectedValuesProject[0].id)
    // if(!localStorage.getItem("idProject"))
    //     localStorage.setItem("idProject", selectedValuesProject[0].id);
  }, []);
  
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={style.nextNav}>
        <Searsh />
        <Level
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          setSelectedValuesTools={setSelectedValuesTools}
          setSelectedValuesProject={setSelectedValuesProject}
          selectedValuesProject={selectedValuesProject}
        />
        <MainHome selectedValues={selectedValues} selectedValuesTools={selectedValuesTools} selectedValuesProject={selectedValuesProject}/>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
