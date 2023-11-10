import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searsh from "../components/Searsh";
import Level from "../components/Level";
import Footer from "../components/Footer";
import style from "../sass/mainpushproject.module.scss";
import { UserContext } from "../utils/UserContext";
import {TbSend} from 'react-icons/tb'
import {MdLibraryAddCheck} from 'react-icons/md'
import {MdNumbers} from 'react-icons/md';

function MainPushProject() {
    const [selectedValuesProject, setSelectedValuesProject] = useState([]);
    const [selectedValuesProjectPush, setSelectedValuesProjectPush] = useState([]);
    const [keepValueTeacher, setKeepValueTeacher] = useState();
    const [seletedIdTeacher, setSeletedIdTeacher] = useState();
    const [inputValue, setInputValue] = useState('');
    const [idProject, SetidProject] = useState(localStorage.getItem('idProject'));
    const userId = localStorage.getItem("userId");
    const selectedOptionKey = localStorage.getItem("selectedOptionKey");
    const divRef = useRef();
    const [currentTime, setCurrentTime] = useState(new Date());


    const goDown = () =>
    {
      setTimeout(() => {
        // Scroll to the bottom of the div after adding the new message
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }, 100);
    }

    const update_id_of_project = (id) => {
        localStorage.setItem('idProject', id);
        SetidProject(id); // You can still update the state for subsequent renders if needed
        goDown()
      };
      useEffect(() => {
        setTimeout(() => {
          // Scroll to the bottom of the div after adding the new message
          divRef.current.scrollTop = divRef.current.scrollHeight;
        }, 100);
      }, []);

    const getTime = () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Months are 0-indexed, so add 1
        const year = now.getFullYear();
        const timeString = `${day}/${month}/${year}`;
        return timeString;
      };
      const fetchNewData = () =>
      {
        fetch(`http://localhost:8081/api/get_pushProject/${idProject}/${userId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesProjectPush(data);
          })
          .catch((error) => console.error(error));
      }
      const push_project = () => {
        const trimmedValue = inputValue.trim();
        setInputValue('');
        if (trimmedValue !== '')
        {
            const data = { 
            message: inputValue,
            idUser: userId,
            idTeacher: seletedIdTeacher[0].id_teacher,
            timeSendMessage: getTime(),
            idProject: idProject,
            };

        fetch('http://localhost:8081/api/push_project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setInputValue('');
        setTimeout(() => {
            // Scroll to the bottom of the div after adding the new message
            divRef.current.scrollTop = divRef.current.scrollHeight;
          }, 100);
          fetchNewData();
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
      });
    }
      };
    
    useEffect(() => {
        fetch(`http://localhost:8081/api/get_porject/${selectedOptionKey}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesProject(data);
          })
          .catch((error) => console.error(error));
      }, [selectedOptionKey]);

      useEffect(() => {
        fetch(`http://localhost:8081/api/get_pushProject/${idProject}/${userId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectedValuesProjectPush(data);
            console.log(data)
          })
          .catch((error) => console.error(error));
      }, [userId, idProject]);

      useEffect(() => {
        fetch(`http://localhost:8081/api/get_idTeacher/${userId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSeletedIdTeacher(data);
          })
          .catch((error) => console.error(error));
      }, [userId]);
      
  return (
    <div className={style.container}>
      <div className={style.containerPush}>
        {/* containerProjectLink */}
        <div className={style.containerProjectLink}>
             <div className={style.chooseProject}>
                <div className={style.containerTitle}>
                    <p className={style.title}>Project(s)</p>
                </div>
                <div className={style.allProjects}>
                {selectedValuesProject.map((item, index) => (
                    <div key={index} className={style.porject} onClick={() => update_id_of_project(item.id)}>
                        <div className={style.containerIcon}>
                            <MdNumbers  className={style.icon}/>
                        </div>
                        <p>{item.name_project}</p>
                    </div>
                ))}
                </div>
                
            </div>
            <div className={style.displayLink}>
                <div className={style.containerTitle}>
                    <p className={style.title}>Link(s)</p>
                </div>
                <div  className={style.allMessages} ref={divRef}> 
                    {selectedValuesProjectPush.map((item, index) => ( 
                    <div key={index}>
                    {/* all Messages */}
                    {item.message_student !== null && ( 
                    <div className={style.containerSendLink}>
                        <p className={style.nameSend}>{item.firstName}: {item.time_send_student}</p>
                        <div className={style.sendLink}>
                            <p>{item.message_student}</p>
                        </div>
                    </div>
                    )}
                    {item.message_teacher !== null && ( 
                    <div className={style.containerResLink}>
                        <p className={style.nameRes}>{item.first_name}: {item.time_send_teacher}</p>
                        <div className={style.resLink}>
                            <p>{item.message_teacher}</p>
                        </div>
                    </div>
                     )}
                    </div>
                    ))}
                    {/* finsh Messages */}
                </div>
            </div>
        </div> 
        {/* finish containerProjectLink */}
        {/* start push */}
      <div className={style.push}>
            <p className={style.title}>Put the link here:</p>
            {/* conatainer Input */}
            <div className={style.containerInput}>
                <input type="text" className={style.inputPush}  placeholder="hello i am ok that" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <div className={style.containerAllIcon}>
                    <div className={style.containerIcon} onClick={() => push_project()}>
                        <TbSend className={style.icon}/>
                    </div>
                </div>
            </div>
            {/* finsh container input */}
        </div>
        {/* finish push */}
      </div>
    </div>
  );
}

export default MainPushProject;
