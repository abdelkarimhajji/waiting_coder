import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import style from '../sass/admin.module.scss';
import {FaUserShield} from 'react-icons/fa';
import {SiCodersrank} from 'react-icons/si';
import { UserContext } from '../../utils/UserContext';


function Admin() {
const   [username, setUsername] = useState('');
const   [password, setPassword] = useState('');
const   [response, setResponse] = useState([])
const   [valid, setValid] = useState(0)

const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
const navigate = useNavigate();

useEffect(() => {
  console.log("isLoggedIn", isLoggedIn)
}, [isLoggedIn]);

const handleButtonClick = () => {
  // localStorage.setItem('login', 1);
  localStorage.setItem('adminLogin', 1);
  setIsLoggedIn(1)
  navigate("/Admin/Dashboard");
};
const singIn = async() =>
{
    try {
        const response = await fetch('http://localhost:8082/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();
        setResponse(data);
        if (data.status === 1) {
          handleButtonClick(); // Call the handleButtonClick function
        } else {
          setValid(1);
          setUsername('')
          setPassword('')
        }
        console.log(data)
      } catch (error){
        console.log(error);
      }
}


useEffect(() => {
  if (response.status === 1) {
      handleButtonClick();
      // localStorage.setItem('userId', response.userId);
      // localStorage.setItem("idEachProfile", response.userId);
      // localStorage.setItem('adminLogin', 1);
      localStorage.setItem('adminId', response.adminId)
  }
}, [response]);


const text = '`Unlock the world of possibilities through the lines of code`';
  const delay = 100; // milliseconds

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);
  return (
    <div className={style.container}>
       <div className={style.leftSide}>
            <div className={style.overlay}>
                <div className={style.contianerTitle}>
                    <div className={style.containerContent}>
                        <SiCodersrank  className={style.icon}/>
                        <p className={style.title}>Waiting Coders</p>
                        <div className={style.description}>
                            <p>{displayText}</p>
                        </div>
                    </div>
                </div>
                <div className={style.containerCopieRight}>
                <p>&copy; 2023 Waiting Coder. All rights reserved.</p>
                </div>
            </div>
       </div>
       <div className={style.loginSide}>
            <div className={style.containerLogin}>
                <div className={style.containerIcon}>
                    <FaUserShield className={style.icon}/>
                </div>
                <div className={style.containerInputs}>
                    <input type="text" placeholder="Enter your username" className={style.input} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" className={style.input}value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={style.containerSubmit}>
                    <input type="button" value="submit" className={style.submit} onClick={singIn}/>
                </div>
                {valid ?
                <p className={style.error}>Your Password or email does not exist</p>
                :
                <p className={style.error}></p>
                }
            </div>
       </div>
    </div>
  );
}

export default Admin;