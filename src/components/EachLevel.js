import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import style from "../sass/eachlevel.module.scss"
import { UserContext } from "../utils/UserContext";
import karim from '../imgs/karim.png'

function EachLevel() {
    const [selectedValue, setSelectedValue] = useState('');
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const [selectedValue2, setSelectedValue2] = useState('');

    const handleSelectChange2 = (event) => {
      setSelectedValue2(event.target.value);
    };
  return (
    <div className={style.container}>
        <div className={style.containerTransp}>
            <div className={style.containerImg}>
                <img src={karim} alt="" />
            </div>
            <div className={style.containerInfo}>
                <p className={style.name}>Abdelkarim hajji</p>
                <p>@ahajji</p>
                <p>Count Projects: 5</p>
                <p>Count Events: 4</p>
                <p>Count Compitions: 3</p>
            </div>
            <div className={style.containerLevel}>
            <select value={selectedValue} onChange={handleSelectChange} className="select">
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <div className={style.level} >
                <p>level - 2%</p>
            </div>
            </div>
        </div>
    </div>
  );
}

export default EachLevel;
