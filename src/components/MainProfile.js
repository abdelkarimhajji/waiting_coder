import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {AiFillCaretDown} from 'react-icons/ai';
import style from "../sass/mainprofile.module.scss";
import { UserContext } from "../utils/UserContext";
import {GiTopPaw} from 'react-icons/gi';
import {FiUsers} from 'react-icons/fi';
import karim from '../imgs/karim.png';

function MainProfile() {
    const userId = localStorage.getItem("userId");
    const [selectedValuesUser, setSelectedValuesUser] = useState([]);
    const [selectedValuesCount, setSelectedValuesCount] = useState([]);
    const [now, setNow] = useState(0);
    const [next, setNext] = useState(3);
    const [valid, setValid] = useState(0);

      const function_next = (e) =>
      {
          if (e === 0)
          {
            if (now > 0)
            {
              setNow(now - 3)
              setNext(next - 3);
              window.scrollTo({top :0, left: 0, behavior: 'smooth'});
            }
          }else if (valid === 0){
            setNow(now + 3)
            setNext(next + 3);
            window.scrollTo({top :0, left: 0, behavior: 'smooth'});
          }
      }
      const get_id = (id) =>
      {
        localStorage.setItem("idEachProfile", id);
      }
    useEffect(() => {
        fetch(`http://localhost:8081/get_user_levle/${now}/${next}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesUser(data);
            if (data.length === 0) {
              setValid(1)
            }
            else
              setValid(0);
          })
          .catch((error) => console.error(error));
          
      }, [now, next]);

  return (
    <>
    <div className={style.container}>
        <div className={style.containerTitlePage}>
            <FiUsers className={style.iconEvent}/>
            <p>Profile(s)</p>
            <AiFillCaretDown className={style.iconDown}/>
        </div>
        {/* start card */}
        {Array.isArray(!selectedValuesUser) ? (
            <p className={style.noUsers}>No users found</p>
          ) : (
        selectedValuesUser.map((userItem, userIndex) => (
      <Link key={userIndex} to="/EachProfile" className={style.link} onClick={() => get_id(userItem.id)}>
        <div className={style.containerProfile}>
          <div className={style.containerImg}>
            <img src={require(`../imgs/${userItem.image}`)} alt="" className="imgUser" />
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
)}
{/* finish card */}   
</div>
    <div className={style.containerOfContainerPagination}>
        <div className={style.containerPagination}>
          <button onClick={() => function_next(0)}>return</button>
          <button onClick={() => function_next(1)}>next</button>
        </div>
    </div>
    </>
  );
}

export default MainProfile;
