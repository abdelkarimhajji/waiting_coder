import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

function PieCharte() {

    const [getYearMoney, setGetYearMoney] = useState([]);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getYearMoney`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map(item => ({
          name: item.year, // Function to get month name from year
          value: item.total_money
        }));
        setGetYearMoney(transformedData);
      })
      .catch((error) => console.error(error));
  }, []);
    
  return (
    <ResponsiveContainer width="80%" height="60%">
        <PieChart >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={getYearMoney}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

  );
}

export default PieCharte;
