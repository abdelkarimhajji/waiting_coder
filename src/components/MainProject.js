import React, { useContext, useEffect , useState} from 'react';
import { useLocation, Navigate , Link } from "react-router-dom";
import style from "../sass/mainproject.module.scss";
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "./FormSignIn";
import { UserContext } from '../utils/UserContext';
import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown} from 'react-icons/ai';
import biographie from '../imgs/biographie.png';

function MainProject() {
  const [setSelectValuesProjects, setSetSelectValuesProjects] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/get_porject/${localStorage.getItem("selectedOptionKey")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("siiiiiiiiiiiiiiii ", localStorage.getItem("selectedOptionKey"));
        setSetSelectValuesProjects(data); 
      })
      .catch((error) => console.error(error));
  }, [localStorage.getItem("selectedOptionKey")]);
  
  const getIdProject = (id) => {
    localStorage.setItem('idProject', id);
    console.log('Button clicked!', id);
    // You can perform any actions you want here
  };
  return (
    <div className={style.container}>
        <div className={style.containTitle}>
            <PiProjectorScreenChartBold className={style.PiProjectorScreenChartBold}/>
            <p className={style.title}>Projects</p>
            <AiFillCaretDown className={style.AiFillCaretDown} />
        </div>
        
        <div  className={style.containProject}>
        {setSelectValuesProjects.length !== 0 ? (
  setSelectValuesProjects.map((item, index) => (
   
      <Link to="/DetailsProject" key={index} className={style.Link} onClick={() => getIdProject(item.id)}>
        <div className={style.project}>
          <div className={style.containImg}>
            <img src={require(`../imgs/${item.image_project}`)} alt={item.name_project} className={style.img} />
          </div>
          <div className={style.containerDiscreption}>
            <p className={style.titleProject}>{item.name_project}</p>
            <p className={style.description}>{item.description}</p>
          </div>
          <button className={style.moreDetails}>More Details</button>
        </div>
      </Link>

  ))
    ) : (
      <p>No Project now</p>
    )}

        </div>
    </div>
  );
}

export default MainProject;
