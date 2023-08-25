import React, { useState, useEffect } from "react";
import { useLocation, Navigate , Link} from "react-router-dom";
import style from "../sass/maindashboard.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';


// ... other imports ...

function MainDashboard() {
  
  const [getAggregatedData, setGetAggregatedData] = useState({});
  
  useEffect(() => {
    fetch(`http://localhost:8082/api/getAggregatedData`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetAggregatedData(data);
        console.log("tish ", data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={style.container}>
        <div className={style.containerDivsInfo}>
          {/* start one div */}
          {Object.keys(getAggregatedData).map((title, index) => (
            <div key={index} className={style.oneDiv}>
              <div className={style.insidedOneDivContent}>
                  <div className={style.total}>
                      <p>+{getAggregatedData[title].data.count} {title}</p>
                  </div>
                  <div className={style.description}>
                      <p>{getAggregatedData[title].description}</p>
                  </div>
              </div>
              <div className={style.insdeOneDivUnder}>
                {/* You can add additional content here */}
              </div>
            </div>
          ))}
          {/* finish one div */}
        </div>
    </div>
  );
}

export default MainDashboard;
