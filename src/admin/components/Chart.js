import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';




export default class Chart extends PureComponent {
    
    render() {
        const data01 = [
            { name: 'Group A', value: 400 },
            // ...
          ];
          
          const data02 = [
            { name: 'Group A', value: 2400 },
            // ...
          ];
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  }

