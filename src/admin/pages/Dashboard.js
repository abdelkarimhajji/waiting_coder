import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/dashboard.module.scss'
import NavbarAdmin from '../components/NavbarAdmin'
import Footer from "../../components/Footer";
import SearchAdmin from '../components/SearchAdmin';
import MainDashboard from "../components/MainDashboard";
// import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis , Radar } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function Dashboard() {
  
useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
   
    const [currentDate, setCurrentDate] = useState('');

  const fetchCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  };
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <NavbarAdmin />
      </div>
      <div className={style.nextNav}>
        <SearchAdmin />
        <MainDashboard />
        <Footer />
      </div>
    </div>
  );

}

export default Dashboard;
