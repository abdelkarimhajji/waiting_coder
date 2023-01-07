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
    const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);
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

    const handleButtonClick = () => {
      localStorage.setItem('login', 1);
      setIsLogin(1);
      navigate("/Home");
    };
    useEffect(() => {
      if (parseInt(localStorage.getItem("login")) === 1)
      {
        // console.log("looooook ",parseInt(localStorage.getItem("login")))
        // console.log("looooook ")
          navigate("/Home");
      }
    }, [localStorage.getItem("login")]);
    
    
    // Form submission handler
    const storedData = localStorage.getItem('login');
   
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch('http://localhost:8081/signup', {
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
      if (response.status === 1) {
          handleButtonClick();
          localStorage.setItem('userId', response.userId);
          localStorage.setItem("idEachProfile", response.userId);
      }
    }, [response]);
    
    useEffect(() => {
      if (response.status !== 1) {
        setname('');
        setPassword('');
      }
    }, [response]);
    if (value == 1)
      return <Navigate to="/Home" replace />;

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
        </form>
        <div className={style.error}>{response.status === -1 && <p>Your Password or email does not exist</p>}</div>
      </div>
    );  
  }

  export default FormSignIn;
