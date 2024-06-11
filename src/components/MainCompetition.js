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
    const [refresh, setRefresh] = useState(0);
    const [competitionId, setCompetitionId] = useState();

    const containerClassName = valid === 1 ? style.displayAlert : style.displayAlert2;
    const containerClassName2 = valid2 === 1 ? style.displayAlert : style.displayAlert2;
    const smoothScrollToTop = () => {
        document.body.style.overflow = 'hidden'; // Hide overflow
      };
      function get_competitions() {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_competitions/${userId}/${selectedOptionKey}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesCompetitions(data);
            console.log("seee data   ",data);
          })
          .catch((error) => console.error(error));
      }
    useEffect(() => {
        
      get_competitions();
      }, [userId, selectedOptionKey, refresh,selectedValuesCompetitions]);

      const register = (competitionId) => {
        const data = { 
            id_user: userId,
            id_competition: competitionId
            };
          fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/register_competition`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((responseData) => {
            })
            .catch((error) => {
              console.error('Error pushing data:', error);
          });
      }


      const deleteRegistration = (competitionId) => {
        const data = {
          id_user: userId,
          id_competition: competitionId,
        };
      
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/delete_registration_competition`, {
          method: 'DELETE', // Use the DELETE method for deletion
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the response data if needed
          console.log(responseData.message); // Print the response message
          // Refresh the data after deletion
          // setValid2(valid2 + 1); // Increment valid2 to trigger useEffect refresh
        })
        .catch((error) => {
          console.error('Error deleting registration:', error);
        });
      };

      const registeR = () =>
        {
          get_competitions()
          setRefresh(refresh + 1)
          register(competitionId)
          setValid(0);
          setTimeout(() => {
              document.body.style.overflow = 'auto';
          }, 300);
    }

    const cancel = () =>
        {
          get_competitions()
          setRefresh(refresh + 1)
        deleteRegistration(competitionId)
        setValid2(0);
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    }

    const confirmation = (eventId) => {
      
      setValid(1);
      smoothScrollToTop();
      setCompetitionId(eventId);
    }
    const deletConfirmation = (eventId) => {

      setValid2(1);
      smoothScrollToTop();
      setCompetitionId(eventId)
    }
    const No = () => {
      setRefresh(refresh + 1)
      document.body.style.overflow = 'auto';
      setValid(0);
      setValid2(0);
    }
  return (
    <>
    <div className={containerClassName}>
    <div className={style.alReady}>
        <p>confirme your register 😎</p>
        <div className={style.twoButton}>
          <button onClick={() => registeR()}>Yes</button>
          <button onClick={() => No()}>No</button>
        </div>
    </div>
</div>
<div className={containerClassName2}>
    <div className={style.alReady}>
        <p>canel your regester 👍</p>
        <div className={style.twoButton}>
          <button onClick={() => cancel()}>Yes</button>
          <button onClick={() => No()}>No</button>
        </div>
    </div>
</div>
    <div className={style.container}>
        <div className={style.containTitle}>
            <FaTrophy className={style.PiProjectorScreenChartBold}/>
            <p className={style.title}>Competition</p>
            <AiFillCaretDown className={style.AiFillCaretDown} />
        </div>
        <div className={style.containCompetition}>
          {selectedValuesCompetitions.length != 0 ? (
            selectedValuesCompetitions.map((item, index) => (
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
              {item.is_registered === 0 ? (
              
                  <button onClick={() => confirmation(item.id)}>Register</button>
                  ) : (
                  <button onClick={() => deletConfirmation(item.id)}>UnRegister</button>
                  )}
              </div>
          </div>

            ))):(

            <p>No events available</p>
        )}
        </div>
    </div>
    </>
  );
}

export default MainCompetition;
