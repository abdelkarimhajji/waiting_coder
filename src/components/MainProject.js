import React, {useEffect , useState} from 'react';
import { Link } from "react-router-dom";
import style from "../sass/mainproject.module.scss";

import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown} from 'react-icons/ai';

function MainProject() {
  const [setSelectValuesProjects, setSetSelectValuesProjects] = useState([]);
  let  selectedOptionKey = localStorage.getItem("selectedOptionKey");
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_porject/${localStorage.getItem("selectedOptionKey")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSetSelectValuesProjects(data); 
      })
      .catch((error) => console.error(error));
  }, [selectedOptionKey]);
  
  const getIdProject = (id) => {
    localStorage.setItem('idProject', id);
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
            <div className={style.containerSingleDiscription}>
              <p className={style.description}>{item.description}</p>
            </div>
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
