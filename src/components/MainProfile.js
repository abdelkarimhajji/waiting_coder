import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {AiFillCaretDown} from 'react-icons/ai';
import style from "../sass/mainprofile.module.scss";
import {GiTopPaw} from 'react-icons/gi';
import {FiUsers} from 'react-icons/fi';

function MainProfile() {
    const [selectedValuesUser, setSelectedValuesUser] = useState([]);
    const [next, setNext] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [items, setItems] = useState([]);
    const [clickPage, setClickPage] = useState(1);
    const get_id = (id) =>
    {
      localStorage.setItem("idEachProfile", id);
    }
    

    function nextPages()
    {
      if(nextPage <= totalPages - 3)
        setNextPage(nextPage + 3);
    }
    function pervPage()
    {
      if(nextPage > 0)
        setNextPage(nextPage - 3);
    }

    function calculateNumberPagesDisplay(pages)
    {
      
        const array = []
        if(pages % 3 != 0)
        {
          pages++;
          if(pages % 3 != 0)
            pages++;
          if(pages % 3 != 0)
            pages++;
        }
        let i = 1;
        while(i <= pages)
        {
          array.push(i);
          i++;
        }
        setItems([...array]);
  }
  function updatePage(numberPage)
  {
    setClickPage(numberPage);
    if(numberPage != clickPage)
      setNext((numberPage - 1) * 5);
  }
  useEffect(() => {
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_user_levle/${next}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSelectedValuesUser(data);
          
        })
        .catch((error) => console.error(error));
        // alert(next);
    }, [next]);

      useEffect(() => {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_user_count`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const pages = data.count / 5;
            if(pages.toString().includes('.'))
            {
              setTotalPages(parseInt(pages + 1));
              calculateNumberPagesDisplay(parseInt(pages + 1));
            }
            else
              calculateNumberPagesDisplay(parseInt(pages));
            console.log("Data received: ", data.count, pages);
          })
          .catch((error) => console.error(error));
      }, [next]);
     
      useEffect(() => {
        console.log("kdkdkdkd itwms", items);
      }, [items]);
  return (
    <>
    <div className={style.container}>
        <div className={style.containerTitlePage}>
            <FiUsers className={style.iconEvent}/>
            <p>Profile(s)</p>
            <AiFillCaretDown className={style.iconDown}/>
        </div>
        {/* start card */}
        {selectedValuesUser.length !== 0 ? (
          selectedValuesUser.map((userItem, userIndex) => (
            <Link key={userIndex} to="/EachProfile" className={style.link} onClick={() => get_id(userItem.id)}>
              <div className={style.containerProfile}>
                <div className={style.containerImg}>
                  {
                    userItem.phone === "null" ? (
                      <img src={userItem.image} alt={userItem.firstName} className="imgUser" />
                    ):(
                      <img src={require(`../imgs/${userItem.image}`)} alt={userItem.firstName} className="imgUser" />
                    )
                  }
                  
                </div>
                <div className={style.containerInfo}>
                  <p className={style.name}>{userItem.firstName} {userItem.lastName}</p>
                  <p className={style.login}>@{userItem.lastName}</p>
                  {/* {selectedValuesCount.map((countItem, countIndex) => ( */}
                    <div className={style.rectangul}>
                      <div className={style.countProjects}>
                        <p className={style.title}>Projects</p>
                        <p>{userItem.valid_project_count}</p>
                      </div>
                      <div className={style.countCopitions}>
                        <p className={style.title}>Compitions</p>
                        <p>{userItem.valid_competition_count}</p>
                      </div>
                      <div className={style.countEvents}>
                        <p className={style.title}>Eventes</p>
                        <p>{userItem.valid_event_count}</p>
                      </div>
                    </div>
                  {/* ))} */}
              <div className={style.conainerLevel}>
                <GiTopPaw className={style.icon} />
                <p className={style.title}>Level: {userItem.level}</p>
              </div>
            </div>
          </div>
        </Link>
      ))
      ) : (
        
          <p className={style.noUsers}>No users found</p>
        
        
)}
{/* finish card */} 
<div  className={style.chooseNumber}>
  <div className={style.beforeButton} onClick={pervPage}style={nextPage <= 0? {backgroundColor: "#d9d9d9"}:{} } >
      <p>&lt;&lt;</p>
  </div>
      {Array.from({ length: 3 }, (_, index) => (
       <div key={index} className={style.button} style={clickPage === items[index + nextPage] ? {backgroundColor: "#d9d9d9"}:{}} onClick={() => updatePage(items[index + nextPage])}>
          <p>{items[index + nextPage] ? items[index + nextPage] : items[index + nextPage]} </p>
      </div>
      ))}
  {/* start button go right */}
  <div className={style.nextButton} onClick={nextPages} style={nextPage > totalPages - 3 ? {backgroundColor: "#d9d9d9"}:{} }>
        <p>&gt;&gt;</p>
  </div>
  </div>
</div>

    </>
  );
}

export default MainProfile;
