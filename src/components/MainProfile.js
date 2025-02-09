import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {AiFillCaretDown} from 'react-icons/ai';
import style from "../sass/mainprofile.module.scss";
import {GiTopPaw} from 'react-icons/gi';
import {FiUsers} from 'react-icons/fi';

function MainProfile() {
    const [selectedValuesUser, setSelectedValuesUser] = useState([]);
    const [next, setNext] = useState(0);
    const [numbers, setnumbers] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPagesDisplay, setTotalPagesDisplay] = useState(0);
    const [count, setCount] = useState(1);
    const [valid, setValid] = useState(0);
    const [items, setItems] = useState([]);
      
    const get_id = (id) =>
    {
      localStorage.setItem("idEachProfile", id);
    }
    // function callNextUsers(count, i) {
    //   if (count === 1)
    //   {
    //     setNext(0);
    //     if(i !== valid)
    //     {
    //       window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"  // for smooth scrolling
    //       });
    //     }
    //   }
    //   else
    //   {
    //     setNext(7 * (count));
    //     if(i !== valid)
    //     {
    //       window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"  // for smooth scrolling
    //       });
    //     }
    //   }
    //   setValid(i);
    // }
    // function nextNumbers() 
    // {
    //     if (numbers + 4 > totalPages) {
    //       let i = 0;
    //       let j = numbers;
    //       while(j < totalPages)
    //       {
    //         i++;
    //         j++;
    //       }
    //       setnumbers(i);
    //       setCount(count + i + 1);
    //       setValid(-1);
    //     }
    // }
    // function beforeNumbers()
    // {
    //     if (numbers < 4)
    //     {
    //       setnumbers(4);
    //       setValid(-1);
    //     }
    //     if(count > 4)
    //     {
    //       setCount(count - 4);
    //       setValid(-1);
    //     }
    // }
    // function getLastUsers() 
    // {
    //   setNext(7 * totalPages);
    //   setValid(-2);
    // }

    function storeItems(totalPagesDisplayValue)
    {
        let i = 1;
        const array = []
        while(i <= totalPagesDisplayValue)
        {
          const newItem = i;
          array.push(newItem);
          i++;
        }
        setItems([...array]);
    }

    function calculateNumberPagesDisplay(pages) {
      const numberPagesTostring = pages.toString();
      let totalPagesDisplayValue = parseInt(pages) >= 4 ? 4 : parseInt(pages);
      
      if (numberPagesTostring.includes('.')) {
          totalPagesDisplayValue += 1;
      }
  
      setTotalPagesDisplay(totalPagesDisplayValue);
      storeItems(totalPagesDisplayValue)
      console.log("totalPagesDisplay", totalPagesDisplayValue);
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
            const pages = data.count / 7;
            setTotalPages(pages); 
            console.log("Data received: ", data.count, pages);
            calculateNumberPagesDisplay(pages)
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
  <div className={style.beforeButton} /*onClick={beforeNumbers}*/>
      <p>&lt;&lt;</p>
  </div>
{/* {Array.from({ length: numbers }, (_, i) => (
    <div key={i} className={valid === i ? style.buttonActive : style.button} onClick={() => callNextUsers(count+i, i)}>
        <p>{count + i}</p>
    </div>
  ))} */}

  {items.map((item, index) => (
    <div key={index} className={style.button} >
        <p>{item}</p>
    </div>
  ))}

  {/* start button go right */}
  <div className={style.nextButton} /*onClick={nextNumbers}*/>
        <p>&gt;&gt;</p>
  </div>
  {/* finish button go right */}
    {/* <div className={valid === -2 ? style.buttonActive : style.lastButton} onClick={getLastUsers}>
        <p>{totalPages}</p>
    </div> */}
  </div>
</div>

    </>
  );
}

export default MainProfile;
