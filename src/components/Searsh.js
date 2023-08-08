import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import style from "../sass/search.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';

function Searsh() {
  
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    // Fetch data from the '/data' endpoint
    fetch(`http://localhost:8081/get_user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        console.log(data); // Log the data in the frontend console
      })
      .catch(error => console.error(error));
  }, []);
  

  return (
    <div className={style.container}>
        <div className={style.iconSearsh}>
            <AiOutlineSearch />
        </div>
      <input type="search" name="search" placeholder="Search ... " className={style.search}/>
      {data.length > 0 && data[0].firstName ? (
      <div className={style.user}>
        <div className={style.name}>
          <p className="nameUser">{data[0].firstName}</p>
        </div>
        <div className={style.photo}>
          <img src={require(`../imgs/${data[0].image}`)} alt="" className="imgUser" />
        </div>
      </div>
    ) : (
      <p>No user data available</p>
    )}
    </div>
  );
}

export default Searsh;
