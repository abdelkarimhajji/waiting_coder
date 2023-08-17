import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import FormSignIn from "./FormSignIn";
// import { UserContext } from '../utils/UserContext';
import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown} from 'react-icons/ai';
import style from "../sass/maincompetition.module.scss"
import {FaTrophy} from 'react-icons/fa'
import {GoFileBinary, GoFileZip} from 'react-icons/go'

function MainCompetition() {
    const userId = localStorage.getItem("userId");
    const selectedOptionKey = localStorage.getItem("selectedOptionKey");
    const [selectedValuesCompetitions, setSelectedValuesCompetitions] = useState([])
    const [valid, setValid] = useState(0);
    const [valid2, setValid2] = useState(0);
    const containerClassName = valid === 1 ? style.displayAlert : style.displayAlert2;
    const containerClassName2 = valid2 === 1 ? style.displayAlert : style.displayAlert2;
    const smoothScrollToTop = () => {
        document.body.style.overflow = 'hidden'; // Hide overflow
        
        const scrollStep = -window.scrollY / (500 / 15); // Adjust the animation speed by changing the division factor
      
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      };
    useEffect(() => {
        fetch(`http://localhost:8081/api/get_competitions/${userId}/${selectedOptionKey}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesCompetitions(data);
          })
          .catch((error) => console.error(error));

      }, [userId, selectedOptionKey]);

      const register = (competitionId) => {
        const data = { 
            id_user: userId,
            id_competition: competitionId
            };
          fetch('http://localhost:8081/api/register_competition', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.message === 'User is already registered for this event')
                {
                    setValid(1);
                    console.log("respose data",responseData)
                    smoothScrollToTop();
                }
                else
                {
                    setValid2(1);
                    window.scrollTo(0, 0);
                }
            })
            .catch((error) => {
              console.error('Error pushing data:', error);
          });
      }
      const already = () =>
        {
        setValid(0);
        setValid2(0);
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    }
  return (
    <>
    <div className={containerClassName}>
    <div className={style.alReady}>
        <p>you are already exist 😎</p>
        <button onClick={() => already()}>ok</button>
    </div>
</div>
<div className={containerClassName2}>
    <div className={style.alReady}>
        <p>you are register 👍</p>
        <button onClick={() => already()}>ok</button>
    </div>
</div>
    <div className={style.container}>
        <div className={style.containTitle}>
            <FaTrophy className={style.PiProjectorScreenChartBold}/>
            <p className={style.title}>Competition</p>
            <AiFillCaretDown className={style.AiFillCaretDown} />
        </div>
        <div className={style.containCompetition}>
            {selectedValuesCompetitions.map((item, index) => (
            <div key={index} className={style.card}>
                <div className={style.containerIcon}>
                    <GoFileZip className={style.icon}/>
                </div>
                <div className={style.containerTitle}>
                    <h1>{item.title_competition}</h1>
                </div>
                <div className={style.description}>
                    <p>{item.description_competition}</p>
                </div>
                <div className={style.month}>
                    <h2>{item.day_competition} : {item.month_competition}</h2>
                </div>
                <div className={style.time}>
                    <p>{item.time_competition}</p>
                </div>
                <div className={style.containerButton}>
                    <button onClick={() => register(item.id)}>Register</button>
                </div>
            </div>
        ))}
        </div>
    </div>
    </>
  );
}

export default MainCompetition;
