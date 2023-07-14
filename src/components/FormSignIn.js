  import React, { useState , useEffect, useContext} from "react";
  import style from "../sass/formSignIn.module.scss";
  import { useNavigate , Navigate } from 'react-router-dom';
  import { UserContext } from '../utils/UserContext';
  function FormSignIn() {
    // State variables
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);
    //navigate
    const navigate = useNavigate();
    //function to navigate


    const handleButtonClick = () => {
      localStorage.setItem('login', 1);
      setIsLogin(1);
      navigate("/Home");
    };
    // Form submission handler
    const storedData = localStorage.getItem('login');
   
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // console.log('Name:', name);
      // console.log('Password:', password);
    
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
        setResponse(JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      if (response === '1') {
          handleButtonClick();
      }
    }, [response]);
    
    useEffect(() => {
      if (response === '-1') {
        setname('');
        setPassword('');
      }
    }, [response]);
    console.log("this is value of   " + value)
    if (value == 1)
      return <Navigate to="/Home" replace />;
    return (
      <div className={style.container}>
        <h1>Waiting Coder</h1>
        <form className={style.inputs} onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Enter your email" value={name} onChange={(e) => setname(e.target.value)} />
          <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" className={style.submit} />
        </form>
        <div className={style.error}>{response === '-1' && <p>Your Password or email does not exist</p>}</div>
      </div>
    );  
  }

  export default FormSignIn;
