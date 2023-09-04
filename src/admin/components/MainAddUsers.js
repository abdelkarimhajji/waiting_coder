import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/mainaddusers.module.scss'
import {HiFolderRemove} from 'react-icons/hi'

function AddUsers() {
    const [selectOldGroups, setSelectOldGroups] = useState([]);
    const [selectCurrentGroups, setSelectCurrentGroups] = useState([]);
    const [nameSpecific, setNameSpecific] = useState([]);
    const [valueSelect1, setValueSelect1] = useState();
    const [valueSelect2, setValueSelect2] = useState();
    const [idSpefific, setIdspecific] = useState();

    useEffect(() => {
        fetch(`http://localhost:8082/api/getOldGroups`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectOldGroups(data);
          })
          .catch((error) => console.error(error));
      }, []);

      useEffect(() => {
        fetch(`http://localhost:8082/api/getCurrentGroups`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectCurrentGroups(data);
            // setSelectIdGroup(data[0].IdGroup)
            // setDateCreated(data[0].date_created.split("T")[0])
          })
          .catch((error) => console.error(error));
        }, []);

        const handelChangeOldGroup = (event) =>
        {
            const selectedValue = event.target.value;
            setValueSelect1(selectedValue)
            setIdspecific(selectedValue)
            setValueSelect2('')
        }
        const handelChangeCurruntlyGroup = (event) =>
        {
            const selectedValue = event.target.value;
            console.log("selectedValue",selectedValue)
            setValueSelect2(selectedValue)
            setIdspecific(selectedValue)
            setValueSelect1('')
        }

        useEffect(() => {
            fetch(`http://localhost:8082/api/getNameSpecific/${idSpefific}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                setNameSpecific(data);
              })
              .catch((error) => console.error(error));
          }, []);
  return (
    <div className={style.container}>
        <div className={style.containerValidateProject}>
            <div className={style.containerTitle}>
                <HiFolderRemove  className={style.iconFolder}/>
                <p>Choose Group Validate</p>
            </div>
            <div className={style.containerInputs}>
                <select value={valueSelect1} onChange={handelChangeOldGroup}>
                    <option value="Choose Old group" >Choose Old group</option>
                    {selectOldGroups.map((item, index) => (
                    <option key={index} value={item.IdNameSpecific}>Group : {item.name_group} {item.name}</option>
                    ))}
                </select>
                <select value={valueSelect2} onChange={handelChangeCurruntlyGroup}>
                    <option value="Choose Curruntly group">Choose Curruntly group</option>
                    {selectCurrentGroups.map((item,index) => (
                    <option key={index} value={item.IdNameSpecific}>Group : {item.name_group} {item.name}</option>
                    ))}
                </select>
                <select name="" id="">
                    <option value="Choose Project">Choose Project</option>
                    <option value=""></option>
                </select>
            </div>
        </div>
    </div>
  );

}

export default AddUsers;
