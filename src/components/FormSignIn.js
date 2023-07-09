  import React, { useState , useEffect} from "react";
  import style from "../sass/formSignIn.module.scss";
  import { useNavigate } from 'react-router-dom';

  function FormSignIn() {
    // State variables
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [number, setnumber] = useState(1);
    //navigate
    const navigate = useNavigate();
    //function to navigate
    const handleButtonClick = (number) => {
      navigate("/Home", { state: { number } });
    };
    // Form submission handler
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      console.log('Name:', name);
      console.log('Password:', password);
    
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
          handleButtonClick(number);
      }
    }, [response]);
    
    useEffect(() => {
      if (response === '-1') {
        setname('');
        setPassword('');
      }
    }, [response]);
    
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
