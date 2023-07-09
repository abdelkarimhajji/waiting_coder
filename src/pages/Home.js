import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import Searsh from "../components/Searsh"
import Level from "../components/Level"
import style from "../sass/home.module.scss"

function Home() {
  const location = useLocation();
  const { state } = location;
  const number = state && state.number ? state.number : 0;
  // Set a default value or handle it based on your requirement
  
  useEffect(() => {
    console.log(number);
  }, []);
  const [updatedNumber, setUpdatedNumber] = useState(number);

  // Redirect to SignIn component if number is not 1
  if (updatedNumber !== 1) {
    return <Navigate to="/" replace />;
  }
  
  const handleButtonClick = () => {
    // Update the number state when the button is clicked
    setUpdatedNumber(updatedNumber + 1);
  };

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={style.nextNav}>
        <Searsh />
        <Level />
        {/* <button onClick={handleButtonClick}>Update Number</button> */}
      </div>
    </div>
  );
}

export default Home;
