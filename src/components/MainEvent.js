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
  const [envetId, setEventId] = useState();


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
      
  }, [userId, selectedOptionKey, valid2, valid]);
  
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
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
    }); 
};



const deleteRegistration = (eventId) => {
  const data = {
    id_user: userId,
    id_event: eventId,
  };

  fetch('http://localhost:8081/api/delete_registration', {
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




const already = () =>
{
  // setValid(0);
  setValid2(0);
  register_event(envetId);
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 300);
  
}

const cancel = () =>
{
  setValid(0);
  // setValid2(0);
  deleteRegistration(envetId)
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 300);
  
}

const confirmation = (eventId) => {

  setValid2(1);
  smoothScrollToTop();
  setEventId(eventId)
}

const deletConfirmation = (eventId) => {

  setValid(1);
  smoothScrollToTop();
  setEventId(eventId)
}
const No = () => {
  document.body.style.overflow = 'auto';
  setValid(0);
  setValid2(0);
}
  return (
    <>
    <div className={containerClassName}>
        <div className={style.alReady}>
            <p>cancel your register !!!</p>
            <div className={style.twoButton}>
              <button onClick={() => cancel ()}>ok</button>
              <button onClick={() => No()}>No</button>
            </div>
        </div>
    </div>
    <div className={containerClassName2}>
          <div className={style.alReady}>
              <p>conifrme your register 👍</p>
              <div className={style.twoButton}>
                <button onClick={() => already()}>ok</button>
                <button onClick={() => No()}>No</button>
              </div>
          </div>
    </div>
    <div className={style.container}>
      <div className={style.containerTitlePage}>
        <BsFillCalendar2EventFill className={style.iconEvent}/>
        <p>Event(s)</p>
        <AiFillCaretDown className={style.iconDown}/>
      </div>
      {/* begin container event */}
       {selectedValuesEvents === 'No specific events found.' ? (
            <p className={style.noUsers}>No events found</p>
          ) : (
  selectedValuesEvents.map((item, index) => (
    <div key={index} className={style.containerEvent}>
      <div className={style.date}>
        <div className={style.number}>
          <p>{item.day_event}</p>
        </div>
        <div className={style.month}>
          <p>{item.month_event}</p>
        </div>
      </div>
      <div className={style.description}>
        <p className={style.title}>{item.title_event}</p>
        <p>{item.description_event}</p>
        <div className={style.parentTimeButton}>
          <div className={style.containerTime}>
            <MdWatchLater className={style.icon} />
            <p>{item.time_event}</p>
          </div>
          <div className={style.containerButton}>
          {item.is_registered === 0 ? (
            <button onClick={() => confirmation(item.id)}>Register</button>
            ):(
              <button onClick={() => deletConfirmation(item.id)}>UnRegister</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )))
}   
      {/* finsh container event */}
      
    </div>
    </>
  );
}

export default MainEvent;
