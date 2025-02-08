import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import style from "../sass/search.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';


function Searsh() {
  
  const [data, setData] = useState([]);
  const [valid, setValid] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);
  const userId = localStorage.getItem('userId');
  const [value, setValue] = useState('');
  useEffect(() => {
    // Delay the fetch request by 2 seconds
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/get_user/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
        })
        .catch(error => console.error(error));

  }, [userId]);
  
  useEffect(() => {
    if (value === '') {
      setValid(0)
      setResultSearch([]);
      return;
    }
  
    // Fetch data from the '/data' endpoint
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/search/${value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResultSearch(data);
      })
      .catch(error => console.error(error));
  }, [value]);
  
  let containerClassName = valid === 1 ? style.result : style.result2;
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Add your validation logic here
    setValid(1);
  };
  useEffect(() => {

  }, [valid]);

  
  const get_id = (id) =>
  {
    localStorage.setItem("idEachProfile", id);
    setValid(0)
    setValue('')
    setResultSearch([]);
  }
  useEffect(() => {
    const handleWindowClick = (event) => {
      const className = event?.target?.className;
      if(className === "search_underResultTrue__iVLD8")

      {
        setValid(0);
      }
      
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [valid]);
  return (
    <>
    <div className={valid === 1 ? style.underResultTrue : style.underResultFlase}>

    </div>
    <div className={style.container}>
        <div className={style.iconSearsh}>
            <AiOutlineSearch />
        </div>
      <input type="search" name="search" placeholder="Search ... " value={value} className={style.search} onChange={handleInputChange}/>
      {data.length > 0 && data[0].firstName ? (
      <div className={style.user}>
        <div className={style.name}>
          <p className="nameUser">{data[0].firstName}</p>
        </div>
        <div className={style.photo}>
          
          {data[0].phone === "null" ? (
            <img src={data[0].image} alt={data[0].firstName} className="imgUser" style={{objectFit: 'cover'}}/>
          ) : (
            <img src={require(`../imgs/${data[0].image}`)} alt="" className="imgUser" style={{objectFit: 'cover'}}/>
          )}
        </div>
      </div>
    ) : (
      <p>No user data available</p>
    )}
    </div>
    <div className={containerClassName}>
    {resultSearch.length === 0 ? (
      <div className={style.containerEachRsult}>
         <div className={style.containerFirstName}>
              <p>No results found</p>
          </div>
      </div>
      ) : (
        <div>
          {resultSearch.map((item, index) => (
            <Link key={index} to="/EachProfile" style={{textDecoration: 'none'}}>
            <div  className={style.containerEachRsult} onClick={() => get_id(item.id)}>
              <div className={style.containerImgResult}>
              {item.phone === "null" ? (
                  <img src={item.image} alt={item.image} className="imgUser" style={{objectFit: 'cover'}}/>
                ) : (
                  <img src={require(`../imgs/${item.image}`)} alt={item.firstName} style={{objectFit: 'cover'}}/>
                )}
                  
              </div>
              <div className={style.containerFirstName}>
                  <p>{item.firstName} {item.lastName}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Searsh;
