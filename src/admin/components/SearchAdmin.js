import React, { useState, useEffect } from "react";
import { useLocation, Navigate , Link} from "react-router-dom";
import style from "../../sass/search.module.scss"
import {AiOutlineSearch} from 'react-icons/ai';


function SearchAdmin() {
  
  const [data, setData] = useState([]);
  const [valid, setValid] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);
  const adminId = localStorage.getItem('adminId');
  const [value, setValue] = useState('');
  useEffect(() => {
    // Fetch data from the '/data' endpoint
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/get_admin/${adminId}`)
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
  }, []);
  
  useEffect(() => {
    console.log(value)
    if (value === '') {
      setValid(0)
      setResultSearch([]);
      return;
    }
  
    // Fetch data from the '/data' endpoint
    fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/search/${value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResultSearch(data);
        console.log("get info admin ",data); // Log the data in the frontend console
      })
      .catch(error => console.error(error));
  }, [value]);
  
  const containerClassName = valid === 1 ? style.result : style.result2;
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Add your validation logic here
    setValid(1);
  };
  useEffect(() => {
    // Fetch data from the '/data' endpoint
    console.log(valid)
  }, [valid]);

  
  const get_id = (id) =>
  {
    localStorage.setItem("idEachProfile", id);
    setValid(0)
    setValue('')
    setResultSearch([]);
  }
  return (
    <>
    <div className={style.container}>
        <div className={style.iconSearsh}>
            <AiOutlineSearch />
        </div>
      <input type="search" name="search" placeholder="Search ... " value={value} className={style.search} onChange={handleInputChange}/>
      {/* {data.length > 0 && data[0].first_name ? ( */}
      <div className={style.user}>
        <div className={style.name}>
          {/* <p className="nameUser">{data[0].first_name}</p> */}
          <p className="nameUser">admin</p>
        </div>
        <div className={style.photo}>
          <img src={require('../../imgs/karim.JPG')} alt="" srcset="" />
          {/* <img src={require(`../../imgs/${data[0].image}`)} alt="" className="imgUser" /> */}
        </div>
      </div>
    {/* ) : (
      <p></p>
    )} */}
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
      <Link key={index} to="" style={{ textDecoration: 'none' }}>
        <div className={style.containerEachRsult} onClick={() => get_id(item.id)}>
          <div className={style.containerImgResult}>
            { 
                item.phone === "null" ? (
                  <img src={item.image} alt={item.firstName} />
                ):(
                  <img src={require(`../../imgs/${item.image}`)} alt="" />
                )
            
          }
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

export default SearchAdmin;
