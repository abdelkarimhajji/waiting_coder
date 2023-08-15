import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../sass/mainevent.module.scss";
import { UserContext } from "../utils/UserContext";
import MainProfile from "./MainProfile";
import {MdWatchLater} from 'react-icons/md';
import {BsFillCalendar2EventFill} from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';


function MainEvent() {

  const userId = localStorage.getItem("userId");
  const selectedOptionKey = localStorage.getItem("selectedOptionKey");
  const [selectedValuesEvents, setSelectedValuesEvents] = useState([]);
  const [valid, setValid] = useState(0);
  const [valid2, setValid2] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8081/api/get_events/${userId}/${selectedOptionKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedValuesEvents(data);
      })
      .catch((error) => console.error(error));
      
  }, [userId, selectedOptionKey]);
  
  const containerClassName = valid === 1 ? style.displayAlert : style.displayAlert2;
  const containerClassName2 = valid2 === 1 ? style.displayAlert : style.displayAlert2;
  const register_event = (eventId) => {
    const data = { 
      id_user: userId,
      id_event: eventId
      };
    fetch('http://localhost:8081/api/register_event', {
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
            document.body.style.overflow = 'hidden';
          }
          else
          {
            setValid2(1);
            console.log('iam herrrr')
          }
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
    }); 
};
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
      <div className={style.containerTitlePage}>
        <BsFillCalendar2EventFill className={style.iconEvent}/>
        <p>Event(s)</p>
        <AiFillCaretDown className={style.iconDown}/>
      </div>
      {/* begin container event */}
      {selectedValuesEvents.map((item, index) => (
      <div key={index} className={style.containerEvent}>
        <div className={style.date}>
          <div className={style.number}>
            <p>{item.day_event}</p>
          </div>
          <div className={style.month}>
            <p >{item.month_event}</p>
          </div>
        </div>
        <div className={style.description}>
          <p className={style.title}>{item.title_event}</p>
          <p>{item.description_event}</p>
          <div className={style.parentTimeButton}>
              <div className={style.containerTime}>
                <MdWatchLater className={style.icon}/>
                <p>{item.time_event}</p>
              </div>
              <div className={style.containerButton}>
                  <button onClick={() => register_event(item.id)}>Register</button>
              </div>
          </div>
        </div>
      </div>
      ))}
      {/* finsh container event */}
      
    </div>
    </>
  );
}

export default MainEvent;
