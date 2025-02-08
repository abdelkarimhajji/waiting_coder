import React, { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Level from "../components/Level";
import MainHome from "../components/MainHome";
import Footer from "../components/Footer";
import style from "../sass/home.module.scss";

function Home() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValuesTools, setSelectedValuesTools] = useState([]);
  const [selectedValuesProject, setSelectedValuesProject] = useState([]); 
  
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
