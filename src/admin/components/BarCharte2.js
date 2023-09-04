import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarCharte2({choosetYear}) {

  const [getMonthsUesrs, setGetMonthsUesrs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8082/api/getMonthsUesrs/${choosetYear}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetMonthsUesrs(data);
      })
      .catch((error) => console.error(error));
  }, [choosetYear]);

  const data = [
    {
      name: 'JAN',
      'USER(s)': getMonthsUesrs.find(item => item.month === 1)?.user_count || 0,
      // amt: 2400,
    },
    {
      name: 'MAR',
      'USER(s)': getMonthsUesrs.find(item => item.month === 2)?.user_count || 0,
      // amt: 2210,
    },
    {
      name: 'MAY',
      'USER(s)': getMonthsUesrs.find(item => item.month === 3)?.user_count || 0,
      // amt: 2290,
    },
    {
      name: 'JUL',
      'USER(s)': getMonthsUesrs.find(item => item.month === 4)?.user_count || 0,
      // amt: 2000,
    },
    {
      name: 'SEPT',
      'USER(s)': getMonthsUesrs.find(item => item.month === 5)?.user_count || 0,
      // amt: 2181,
    },
    {
      name: 'NOV',
      'USER(s)': getMonthsUesrs.find(item => item.month === 6)?.user_count || 0,
      // amt: 2500,
    },
    {
      name: 'FEB',
      'USER(s)': getMonthsUesrs.find(item => item.month === 7)?.user_count || 0,
      // amt: 2100,
    },
    {
      name: 'APR',
      'USER(s)': getMonthsUesrs.find(item => item.month === 8)?.user_count || 0,
      // amt: 2100,
    },
    {
      name: 'JUN',
      'USER(s)': getMonthsUesrs.find(item => item.month === 9)?.user_count || 0,
      // amt: 2100,
    },
    {
      name: 'AUG',
      'USER(s)': getMonthsUesrs.find(item => item.month === 10)?.user_count || 0,
      // amt: 2100,
    },
    {
      name: 'OCT',
      'USER(s)': getMonthsUesrs.find(item => item.month === 11)?.user_count || 0,
      // amt: 2100,
    },
    {
      name: 'DEC',
      'USER(s)': getMonthsUesrs.find(item => item.month === 12)?.user_count  || 0,
      // amt: 2100,
    },
  ];
  console.log("just test ok",getMonthsUesrs.find(item => item.month === 8)?.user_count  || 0,)
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
    <Bar dataKey='USER(s)' fill="#2a2d38" barSize={40} /> 
  </BarChart>
</ResponsiveContainer>

  );
}

export default BarCharte2;