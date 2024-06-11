import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarCharte({choosetYear}) {

  const [getYearnEarning, setGetYearnEarning] = useState([]);

  useEffect(() => {
    fetch(`http://35.180.127.147:8082/api/getYearEarnings/${choosetYear}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetYearnEarning(data);
        console.log("okkk ticgh ", choosetYear);
        console.log("okkk ticgh ", data);
      })
      .catch((error) => console.error(error));
  }, [choosetYear]);

  const data = [
    {
      name: 'JAN',
      DH: getYearnEarning.find(item => item.month === 1)?.earnings || 0,
      // amt: 2400,
    },
    {
      name: 'MAR',
      DH: getYearnEarning.find(item => item.month === 2)?.earnings || 0,
      // amt: 2210,
    },
    {
      name: 'MAY',
      DH: getYearnEarning.find(item => item.month === 3)?.earnings || 0,
      // amt: 2290,
    },
    {
      name: 'JUL',
      DH: getYearnEarning.find(item => item.month === 4)?.earnings || 0,
      // amt: 2000,
    },
    {
      name: 'SEPT',
      DH: getYearnEarning.find(item => item.month === 5)?.earnings || 0,
      // amt: 2181,
    },
    {
      name: 'NOV',
      DH: getYearnEarning.find(item => item.month === 6)?.earnings || 0,
      // amt: 2500,
    },
    {
      name: 'FEB',
      DH: getYearnEarning.find(item => item.month === 7)?.earnings || 0,
      // amt: 2100,
    },
    {
      name: 'APR',
      DH: getYearnEarning.find(item => item.month === 8)?.earnings || 0,
      // amt: 2100,
    },
    {
      name: 'JUN',
      DH: getYearnEarning.find(item => item.month === 9)?.earnings || 0,
      // amt: 2100,
    },
    {
      name: 'AUG',
      DH: getYearnEarning.find(item => item.month === 10)?.earnings || 0,
      // amt: 2100,
    },
    {
      name: 'OCT',
      DH: getYearnEarning.find(item => item.month === 11)?.earnings || 0,
      // amt: 2100,
    },
    {
      name: 'DEC',
      DH: getYearnEarning.find(item => item.month === 12)?.earnings  || 0,
      // amt: 2100,
    },
  ];
  console.log("just test ok",getYearnEarning.find(item => item.month === 8)?.earnings  || 0,)
  return (
    <ResponsiveContainer width="100%" height="70%">
  <BarChart
    data={data} 
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Legend />
    <Tooltip />
    <Bar dataKey="DH" fill="#2a2d38" barSize={40} /> 
  </BarChart>
</ResponsiveContainer>

  );
}

export default BarCharte;