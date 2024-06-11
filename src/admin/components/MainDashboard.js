import React, { useState, useEffect } from "react";
import { useLocation, Navigate , Link} from "react-router-dom";
import style from "../sass/maindashboard.module.scss"
import {AiOutlineSearch, AiOutlineBarChart} from 'react-icons/ai';
import {GiClick} from 'react-icons/gi'
import {BiPieChartAlt2} from 'react-icons/bi'
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
  const [valueSelect, setValueSelect] = useState()
  const [valueSelect2, setValueSelect2] = useState()
  useEffect(() => {
    fetch(`http://35.180.127.147:8082/api/getAggregatedData`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetAggregatedData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://35.180.127.147:8082/api/getYears`)
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
        setValueSelect(data[0].year)
        setValueSelect2(data[0].year)
      })
      .catch((error) => console.error(error));
  }, []);
  

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setValueSelect(event.target.value);
    if(selectedValue !== 'Choose another Year')
    {
      setChoosetYear(selectedValue)
    }
  };
  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value;
    setValueSelect2(selectedValue);
    if(selectedValue !== 'Choose another Year')
    {
      setChoosetYear2(selectedValue)
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
            {/* <h2>More deatils about money</h2> */}
            <div className={style.containerTitle}>
                <GiClick  className={style.iconFolder}/>
                <p>More deatils about money</p>
              </div>
          <select value={valueSelect} onChange={handleSelectChange}>
            <option value="Choose another Year">Choose another Year</option>
            {selectYears.map((item, index) => (
            <option key={index} value={item.year}>Year {item.year}</option>
            ))}
          </select>
          </div>
          {/* finish choose */}
          <div className={style.ContainerBarCharte}>
            <div className={style.some}>
              {/* <p className={style.title}>Chart of earn all year</p> */}
              <div className={style.containerTitle}>
                <BiPieChartAlt2 className={style.iconFolder}/>
                <p>Earn all years</p>
              </div>
              <PieCharte />
              <p>add here your title</p>
              <p>*******</p>
            </div>
            <div className={style.barCharte}>
              {/* <p className={style.title}>Chart of earn all year</p> */}
              <div className={style.containerTitle}>
                <AiOutlineBarChart  className={style.iconFolder}/>
                <p>Earn all years</p>
              </div>
              <BarCharte choosetYear={choosetYear}/>
            </div>
          </div>
        </div>
        {/* container about money finish */}
        {/* container about money start */}
        <div className={style.containeConrainer}>
          {/* start choose */}
          <div className={style.choose}>
            {/* <h2>More deatils about Student</h2> */}
            <div className={style.containerTitle}>
                <GiClick  className={style.iconFolder}/>
                <p>More deatils about money</p>
              </div>
          <select value={valueSelect2} onChange={handleSelectChange2}>
            <option value="Choose another Year">Choose another Year</option>
            {selectYears.map((item, index) => (
            <option key={index} value={item.year}>Year {item.year}</option>
            ))}
          </select>
          </div>
          {/* finish choose */}
          <div className={style.ContainerBarCharte}>
            <div className={style.barCharte}>
              {/* <p className={style.title}>Chart : Number of stuent each month</p> */}
              <div className={style.containerTitle}>
                <AiOutlineBarChart  className={style.iconFolder}/>
                <p>Number Stuent Month</p>
              </div>
              <BarCharte2 choosetYear={choosetYear2}/>
            </div>
            <div className={style.some}>
              {/* <p className={style.title}>Chart : Number User in each year</p> */}
              <div className={style.containerTitle}>
                <BiPieChartAlt2  className={style.iconFolder}/>
                <p>Number User in each year</p>
              </div>
              <PieChart2 />
              <p>add here your title</p>
              <p>*******</p>
            </div>
          </div>
        </div>
        {/* container about money finish */}
    </div>
  );
}

export default MainDashboard;

