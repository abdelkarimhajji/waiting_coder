  import React, { useState , useEffect, useContext} from "react";
  import style from "../sass/formSignIn.module.scss";
  import { useNavigate , Navigate } from 'react-router-dom';
  import { UserContext } from '../utils/UserContext';
  import Typewriter from 'typewriter-effect';

  function FormSignIn() {
    // State variables
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const {value, setIsLogin} = useContext(UserContext);
    //navigate
    const navigate = useNavigate();
    //function to navigate
    const text = '`Waiting Coder`';
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


  // Register with intra 42
      
  const callAuth42 = () => {
    window.location.href = "http://localhost:3000/auth/42/callback";
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    if (user) {
      const userData = JSON.parse(user);
     
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/registerIntra`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userData: userData})
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('userId', data.idUser);
      })
      .catch((error) => console.error(error));
      localStorage.setItem('login', 1);
      setIsLogin(1);
      navigate("/Home");
      
      // console.log(JSON.parse(user));
    }
  }, [navigate, setIsLogin]);

  
    
    let login = localStorage.getItem("login");
    useEffect(() => {
      if (parseInt(localStorage.getItem("login")) === 1)
      {
          navigate("/Home");
      }
    }, [navigate, login]);
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
          }),
        });

        const data = await response.json();
        setResponse(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const handleButtonClick = () => {
        localStorage.setItem('login', 1);
        setIsLogin(1);
        navigate("/Home");
      };
    
      if (response.status === 1) {
        handleButtonClick();
        localStorage.setItem('userId', response.userId);
        localStorage.setItem("idEachProfile", response.userId);
      }
    }, [response, setIsLogin, navigate]); 
    
    
    useEffect(() => {
      if (response.status !== 1) {
        setname('');
        setPassword('');
      }
    }, [response]);
     
    if (value === 1)
    {
      return <Navigate to="/Home" replace />;
    }

      const handleTypingDone = () => {
        // This function will be called when typing animation is done
        // Set the displayText to the typed text once it's done typing
        setDisplayText('Hello World! This is a Typewriter Effect. Enjoy using it in React!');
      };

     

    return (
      <div className={style.container}>
        <h1>              
        {!displayText ? (
        <Typewriter
          options={{
            strings: ['Hello World! This is a Typewriter Effect. Enjoy using it in React!'],
            autoStart: true,
            loop: false,
          }}
          onInit={(typewriter) => {
            typewriter.start();
          }}
          onComplete={handleTypingDone}
        />
      ) : (
        <div>{displayText}</div>
      )}
          </h1>
        <form className={style.inputs} onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Enter your email" value={name} onChange={(e) => setname(e.target.value)} />
          <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" className={style.submit} />
          <input type="button" value="Signin with 42" className={style.submit} onClick={callAuth42} />
        </form>
        <div className={style.error}>{response.status === -1 && <p>Your Password or email does not exist</p>}</div>
      </div>
    );  
  }

  export default FormSignIn;
