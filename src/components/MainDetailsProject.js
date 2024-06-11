import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import style from "../sass/maindetailsproject.module.scss";
import { UserContext } from "../utils/UserContext";
import {PiProjectorScreenChartBold} from 'react-icons/pi';
import {AiFillCaretDown, AiOutlinePaperClip} from 'react-icons/ai'
import bio from '../imgs/biographie.png';
// import AiOutlinePaperClip from 'react-icons/ai';

function DetailsProject() {
  
  const [selectedValuesProject, setSelectedValuesProject] = useState([]);
  const [selectedValuesRessources, setSelectedValuesRessources] = useState([]);
  const idProject = localStorage.getItem('idProject');
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_AllPorject/${idProject}`)
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
  }, [idProject]);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_ressourcesPorject/${idProject}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedValuesRessources(data);
      })
      .catch((error) => console.error(error));
  }, [idProject]);
  return (
    <div className={style.container}>
      <div className={style.containerMoreDetails}>
        <PiProjectorScreenChartBold className={style.icon}/>
        <p className={style.title}>More Details</p>
        <AiFillCaretDown className={style.icon}/>
      </div>
      {selectedValuesProject.length === 0 ? (
      <p style={{ fontSize: '25px', textAlign: 'center' }}>No data available.</p> ) : (
        
      selectedValuesProject.map((item, index) => (
      <div key={index} className={style.join}>
      <div className={style.partOneExplaine}>
      <img src={require(`../imgs/${item.image_project}`)} alt={item.name_project} className={style.img} />
        <p className={style.title}>{item.name_project}</p>
        <p className={style.discription}>{item.description}</p>
        <p className={style.langNeedProject}>{item.languages_used }</p>
      </div>
       
      <div className={style.partTwoResourse}>
            <p className={style.title}>Ressource(s)</p>
            {/* all resourse */}
            <div className={style.allResource}>
            {selectedValuesRessources.map((item, index) => (
              <a href={encodeURIComponent(item.link_resource)}  key={index} className={style.EachResourse} style={{textDecoration:"none"}}>
                    <AiOutlinePaperClip style={{color:"black"}}/>
                    <p>{item.name_ressource }</p>
              </a> 
            ))}
            </div>
            {/* finish all resourse */} 
      </div>
       
      {/* part three */}
      <div className={style.partThreeContext}>
            <p className={style.title}>Context of the project</p>
            <p className={style.decription}>{item.context}</p>
      </div>
      {/* part  foor */}
      <div className={style.partFoorDeliverables}>
        <p className={style.title}>Deliverables</p>
        <p className={style.description}>
          {item.deliverables}
        </p>
      </div>
      {/* part five */}
      <div className={style.partFivePush}>
            <p className={style.title}>Finished Project</p>
            <p className={style.description}>{item.finished_project}</p>
            <Link to="/PushProject" className={style.link}>
            <button className={style.push}>Push</button>
            </Link>
      </div>
      </div>
     )))}
    </div>
  );
}

export default DetailsProject;
