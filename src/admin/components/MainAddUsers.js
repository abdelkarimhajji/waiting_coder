import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/mainaddusers.module.scss'
import {HiFolderRemove} from 'react-icons/hi'

function AddUsers() {
    const [selectOldGroups, setSelectOldGroups] = useState([]);
    const [selectCurrentGroups, setSelectCurrentGroups] = useState([]);
    const [nameSpecific, setNameSpecific] = useState([]);
    const [allStudentGroup, setAllStudentGroup] = useState([]);
    const [valueSelect1, setValueSelect1] = useState();
    const [valueSelect2, setValueSelect2] = useState();
    const [valueSelect3, setValueSelect3] = useState();
    const [idSpefific, setIdspecific] = useState(null);
    const [idGroup, setIdGroup] = useState(null);
    const [idProject, setIdProject] = useState(null);
    const [checkboxes, setCheckboxes] = useState({});
    const [selectAllChecked, setSelectAllChecked] = useState(false);

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
            // console.log("just test ok ",)
            setValueSelect2(`${data[0].IdNameSpecific}/${data[0].IdGroup}`)
            setIdspecific(data[0].IdNameSpecific)
            setIdGroup(data[0].IdGroup)
          })
          .catch((error) => console.error(error));
        }, []);

        const handelChangeOldGroup = (event) =>
        {
            const selectedValue = event.target.value;
            setValueSelect1(selectedValue)
            setIdspecific(selectedValue.split('/')[0])
            setIdGroup(selectedValue.split('/')[1])
            setValueSelect2('')
            setValueSelect3('')
            setAllStudentGroup([]);
        }
        const handelChangeCurruntlyGroup = (event) =>
        {
            const selectedValue = event.target.value;
            console.log("selectedValue",selectedValue)
            setValueSelect2(selectedValue)
            setIdspecific(selectedValue.split('/')[0])
            setIdGroup(selectedValue.split('/')[1])
            setValueSelect1('')
            setValueSelect3('')
            setAllStudentGroup([]);
        }

        const handelChangeProject = (event) =>
        {
            const selectedValue = event.target.value;
            setValueSelect3(selectedValue)
            setIdProject(selectedValue);
        }

        useEffect(() => {
            fetch(`http://localhost:8082/api/getProjectSpecific/${idSpefific}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                setNameSpecific(data);
                // console.log(data)
                if (data.length > 0) {
                  setIdProject(data[0].id);
                  setValueSelect3(data[0].id)
                }
              })
              .catch((error) => console.error(error));
          }, [idSpefific]);

          useEffect(() => {
            fetch(`http://localhost:8082/api/getStudentsGroup/${idGroup}/${idProject}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                setAllStudentGroup(data);
                console.log(data)
              })
              .catch((error) => console.error(error));
          }, [idProject]);

  const [count, setCount] = useState(0)
  const toggleCheckbox = (id) => {
    let updatedCheckboxes = {...checkboxes};
    let keys = Object.keys(allStudentGroup)
    for(let i = 0; i < allStudentGroup.length; i++)
        updatedCheckboxes[id] = !updatedCheckboxes[id];
    
  setCheckboxes(updatedCheckboxes)
  };

  useEffect(() => {
    let counts = 0
    for(let item in checkboxes)
    {
        if (checkboxes[item] === true)
          counts++;
    }
    if (counts === 3)
    {
      setSelectAllChecked(true)
      counts = 0;
    }
    else
      setSelectAllChecked(false)
  }, [checkboxes]);
  
  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    const updatedCheckboxes = {};
    
    for (let i = 0; i < allStudentGroup.length; i++) {
      updatedCheckboxes[allStudentGroup[i].id] = newSelectAllChecked
    }
    setCheckboxes(updatedCheckboxes);
  };
  return (
    <div className={style.container}>
        <div className={style.containerValidateProject}>
            <div className={style.containerTitle}>
                <HiFolderRemove  className={style.iconFolder}/>
                <p>Choose Group Validate</p>
            </div>
            {/* start container inputs */}
            <div className={style.containerInputs}>
                <select value={valueSelect1} onChange={handelChangeOldGroup}>
                    <option value="Choose Old group" >Choose Old group</option>
                    {selectOldGroups.map((item, index) => (
                    <option key={index} value={`${item.IdNameSpecific}/${item.IdGroup}`}>Group : {item.name_group} {item.name}</option>
                    ))}
                </select>
                <select value={valueSelect2} onChange={handelChangeCurruntlyGroup}>
                    <option value="Choose Curruntly group">Choose Curruntly group</option>
                    {selectCurrentGroups.map((item,index) => (
                    <option key={index} value={`${item.IdNameSpecific}/${item.IdGroup}`}>Group : {item.name_group} {item.name}</option>
                    ))}
                </select>
                <select value={valueSelect3} onChange={handelChangeProject}>
                    <option value="Choose Project">Choose Project</option>
                    {nameSpecific.map((item, index) => (
                    <option key={index} value={item.id}>{item.name_project}</option>
                    ))}
                </select>
            </div>
            {/* finish container inputs */}
        </div>
        {/* sellect all and valid */}
        <div className={style.containerSellectAll}>
                <div className={style.select}>
                      <p>Select ALL </p>
                      <input type="checkbox" checked={selectAllChecked} onChange={handleSelectAll}/>
                </div>
                <div className={style.valid}>
                      <button>Valid</button>
                </div>
          </div>
          {/* finishe sellect all and vlaid */}
        {/* start container of table */}
        <div className={style.containerTable}>
        <table>
                  <thead>
                      <tr>
                          <th>Image</th>
                          <th>Student(s)</th>
                          <th>payemnt</th>
                          <th>update</th>
                          <th >select</th>
                          <th>validate FWeek</th>
                      </tr>
                    </thead>
                    <tbody>
                        {allStudentGroup.map((item, index) => (
                    <tr key={index} className={style.trHover}>
                       <td><img
                        src={item.image ? require(`../../imgs/${item.image}`) : 'fallback-image-url.jpg'}
                        alt={item.firstName}
                        className={style.img}
                        />
                        </td>
                        <td>{item.firstName}</td>
                        <td>{item.payment} DH</td>
                        <td><button>edit</button></td>
                        <th >
                        <input
                            type="checkbox"
                            className={style.checkBox}
                            checked={checkboxes[item.id] || false}
                            onChange={() => toggleCheckbox(item.id)}
                          
                          />
                        </th>
                        <td className={style.displayNone}>
                        {item.valid_project === 1 ? (
                            <button>is Valid</button>
                          ) : (
                            // <button onClick={(event) => handelValidate(event, item.id_user)}>validate</button>
                            <button>valid</button>
                          )}
                          {/* {console.log("valid week ===> ",item.validate_week)} */}
                        </td>
                    </tr>    
                    ))}   
                    </tbody>
                </table>
        </div>
        {/* finish container of table */}
    </div>
  );

}

export default AddUsers;
