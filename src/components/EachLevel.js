import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import style from "../sass/eachlevel.module.scss"
import { UserContext } from "../utils/UserContext";
import karim from '../imgs/karim.png'
import {FcApproval} from 'react-icons/fc'
import {FaTimesCircle} from 'react-icons/fa'

function EachLevel({setIdCollectionValue, setId}) {
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueUser, setSelectedValueUser] = useState([]);
    const [selectedNameSpecifics, setSelectedNameSpecifics] = useState([]);
    // setId(localStorage.getItem("idEachProfile"));
    const [idCollection, setIdCollection] = useState(0);
    const [validation, setValidation] = useState(0);
    const userId = localStorage.getItem("userId");
    
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
      // const selectedOption =  event.target.value;
      const selectedOption = selectedNameSpecifics.find((item) => item.name === event.target.value);
      setIdCollectionValue(selectedOption.id)
      setIdCollection(selectedOption.id)
    };
    console.log()
    const location = useLocation();
    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/get_each_user_levle/${localStorage.getItem('idEachProfile')}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setSelectedValueUser(data);
          console.log("data each", data);
        })
        .catch((error) => console.error('Error fetching user level:', error));
        setId(localStorage.getItem("idEachProfile"));
    }, [localStorage.getItem('idEachProfile')]);

    
    const backgroundBlue =
      selectedValueUser.length > 0 && selectedValueUser[0].background
        ? selectedValueUser[0].background
        : 0;
       
    const gradient = `linear-gradient(to right, #02babd ${backgroundBlue}%, #1b1c2312 0%)`;

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/name_specifics/${localStorage.getItem('idEachProfile')}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          data.sort((a, b) => {
            if (a.study_now === 1) return -1;
            if (b.study_now === 1) return 1;
            return 0;
          });
          setSelectedNameSpecifics(data);
          setIdCollectionValue(data[0].id);
          setIdCollection(data[0].id);
          setId(localStorage.getItem("idEachProfile"));
        })
        .catch((error) => console.error('Error fetching name specifics:', error));
    }, [localStorage.getItem('idEachProfile')]);

    // valid specific or no
    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/validation_specific/${localStorage.getItem('idEachProfile')}/${idCollection}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data && data[0] && data[0].validation !== undefined) 
            setValidation(data[0].validation);
        })
        .catch((error) => console.error('Error fetching validation specific:', error));
        setId(localStorage.getItem("idEachProfile"));
    }, [localStorage.getItem('idEachProfile'), idCollection]);

  return (
    <div className={style.container}>
  {selectedValueUser.map((item, index) => (
    <div key={index} className={style.containerTransp}>
      <div className={style.containerImg}>
        {item.phone === "null" ? (
          <img src={item.image} alt={item.firstName}/>
        ) : (
        <img src={require(`../imgs/${item.image}`)} alt={item.firstName}/>
        )}
      </div>
      <div className={style.containerInfo}>
        <p className={style.name}>{item.firstName}</p>
        <p>@{item.lastName} {validation ? <FcApproval /> : <FaTimesCircle className={style.colorx}/>}</p>
        <p>Count Projects: {item.valid_project_count}</p>
        <p>Count Events: {item.valid_event_count}</p>
        <p>Count Compitions: {item.valid_competition_count}</p>
      </div>
      <div className={style.containerLevel}>
        <select value={selectedValue} onChange={handleSelectChange} className="select">
          {selectedNameSpecifics.map((specific, index) => (
            <option key={index} value={specific.name}>{specific.name}</option>
          ))}
        </select>
        <div className={style.level} style={{ backgroundImage: gradient }}>
          {item.level >=  0 ? <p>level - {item.level}%</p> : <p>No level data available</p>}
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default EachLevel;
