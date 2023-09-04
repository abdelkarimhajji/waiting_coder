import React, { useState, useEffect } from "react";
import { useLocation, Navigate , Link} from "react-router-dom";
import style from "../sass/maindashboard.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';
import BarCharte from './BarCharte'
import PieCharte from "./PieCharte";
import BarCharte2 from "./BarCharte2";
import PieChart2 from './PieChart2'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// ... other imports ...

function MainDashboard() {
  
  const [getAggregatedData, setGetAggregatedData] = useState({});
  const [selectYears, setSelectYears] = useState([]);
  const [choosetYear, setChoosetYear] = useState();
  const [choosetYear2, setChoosetYear2] = useState();

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

  useEffect(() => {
    fetch(`http://localhost:8082/api/getYears`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectYears(data);
        setChoosetYear(data[0].year)
        setChoosetYear2(data[0].year)
        // console.log("mian dashbore fetch ", data);
        // console.log("main dashborad choosetYear ", choosetYear);
      })
      .catch((error) => console.error(error));
  }, []);
  

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if(selectedValue !== 'Choose another Year')
    {
      setChoosetYear(selectedValue)
      console.log(selectedValue)
    }
  };
  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value;
    if(selectedValue !== 'Choose another Year')
    {
      setChoosetYear2(selectedValue)
      console.log(selectedValue)
    }
  };
  return (
    <div className={style.container}>
        <div className={style.containerDivsInfo}>
          {/* start one div */}
          {Object.keys(getAggregatedData).map((title, index) => (
            <div key={index} className={style.oneDiv}>
              <div className={style.insidedOneDivContent}>
                  <div className={style.total}>
                      <p>+{getAggregatedData[title]?.data?.count || 0} {title}</p>
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
        {/* container about money start */}
        <div className={style.containeConrainer}>
          {/* start choose */}
          <div className={style.choose}>
            <h2>More deatils about money</h2>
          <select onChange={handleSelectChange}>
            <option value="Choose another Year">Choose another Year</option>
            {selectYears.map((item, index) => (
            <option key={index} value={item.year}>Year {item.year}</option>
            ))}
          </select>
          </div>
          {/* finish choose */}
          <div className={style.ContainerBarCharte}>
            <div className={style.some}>
              <p className={style.title}>Chart of earn all year</p>
              <PieCharte />
              <p>hi here i will put some </p>
              <p>dddddd</p>
            </div>
            <div className={style.barCharte}>
              <p className={style.title}>Chart of earn all year</p>
              <BarCharte choosetYear={choosetYear}/>
            </div>
          </div>
        </div>
        {/* container about money finish */}
        {/* container about money start */}
        <div className={style.containeConrainer}>
          {/* start choose */}
          <div className={style.choose}>
            <h2>More deatils about Student</h2>
          <select onChange={handleSelectChange2}>
            <option value="Choose another Year">Choose another Year</option>
            {selectYears.map((item, index) => (
            <option key={index} value={item.year}>Year {item.year}</option>
            ))}
          </select>
          </div>
          {/* finish choose */}
          <div className={style.ContainerBarCharte}>
            <div className={style.barCharte}>
              <p className={style.title}>Chart : Number of stuent each month</p>
              <BarCharte2 choosetYear={choosetYear2}/>
            </div>
            <div className={style.some}>
              <p className={style.title}>Chart : Number User in each year</p>
              <PieChart2 />
              <p>hi here i will put some </p>
              <p>dddddd</p>
            </div>
          </div>
        </div>
        {/* container about money finish */}
    </div>
  );
}

export default MainDashboard;

