import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/mainaddusers.module.scss'
import {HiFolderRemove} from 'react-icons/hi'
import karim from '../../imgs/karim.png'

function MainValidate() {
    const [selectOldGroups, setSelectOldGroups] = useState([]);
    const [selectCurrentGroups, setSelectCurrentGroups] = useState([]);
    const [nameSpecific, setNameSpecific] = useState([]);
    const [nameSpecific2, setNameSpecific2] = useState([]);
    const [allStudentGroup, setAllStudentGroup] = useState([]);
    const [allStudentGroup2, setAllStudentGroup2] = useState([]);
    const [allConversationStudent, setAllConversationStudent] = useState([]);
    const [valueSelect1, setValueSelect1] = useState();
    const [valueSelect2, setValueSelect2] = useState();
    const [valueSelect3, setValueSelect3] = useState();
    const [valueSelect4, setValueSelect4] = useState();
    const [valueSelect5, setValueSelect5] = useState();
    const [valueSelect6, setValueSelect6] = useState();
    const [idSpefific, setIdspecific] = useState(null);
    const [idSpefific2, setIdspecific2] = useState(null);
    const [idGroup, setIdGroup] = useState(null);
    const [idGroup2, setIdGroup2] = useState(null);
    const [idProject, setIdProject] = useState(null);
    const [idProject2, setIdProject2] = useState(null);
    const [checkboxes, setCheckboxes] = useState({});
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [count, setCount] = useState(0)
    const [idUser, setIdUser] = useState(0)

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
            setValueSelect5(`${data[0].IdNameSpecific}/${data[0].IdGroup}`)
            setIdspecific(data[0].IdNameSpecific)
            setIdGroup(data[0].IdGroup)
            setIdspecific2(data[0].IdNameSpecific)
            setIdGroup2(data[0].IdGroup)
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
            setSelectAllChecked(false)
            const updatedCheckboxes = {};
            for (let i = 0; i < allStudentGroup.length; i++) {
              updatedCheckboxes[allStudentGroup[i].idOfUser] = false
            }
            setCheckboxes(updatedCheckboxes);
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
            setSelectAllChecked(false)
            const updatedCheckboxes = {};
            for (let i = 0; i < allStudentGroup.length; i++) {
              updatedCheckboxes[allStudentGroup[i].idOfUser] = false
            }
            setCheckboxes(updatedCheckboxes);
        }

        const handelChangeProject = (event) =>
        {
            const selectedValue = event.target.value;
            setValueSelect3(selectedValue)
            setIdProject(selectedValue);
            setSelectAllChecked(false)
            const updatedCheckboxes = {};
            for (let i = 0; i < allStudentGroup.length; i++) {
              updatedCheckboxes[allStudentGroup[i].idOfUser] = false
            }
            setCheckboxes(updatedCheckboxes);
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
                console.log("all student ",data)
              })
              .catch((error) => console.error(error));
          }, [idProject]);
         
  const toggleCheckbox = (id) => {
    console.log("id  ",id)
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
      updatedCheckboxes[allStudentGroup[i].idOfUser] = newSelectAllChecked
    }
    setCheckboxes(updatedCheckboxes);
  };
  
  const handlCklickEachValid = (idUser) => {
    fetch(`http://localhost:8082/api/validEachProject/${parseInt(idUser)}/${parseInt(idProject)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        fetchNewData();
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
      });
  };
  
  const fetchNewData = () => {
    fetch(`http://localhost:8082/api/getStudentsGroup/${idGroup}/${idProject}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllStudentGroup(data);
        console.log("all student ", data);
      })
      .catch((error) => console.error(error));
  };
  
  const handelValidAll = () =>
  {
    const selectedIDs = [];

    for (const id in checkboxes) {
      if (checkboxes[id] === true) {
        selectedIDs.push(id);
      }
    }
    console.log("selectedIDs ",selectedIDs)
    fetch(`http://localhost:8082/api/validAllProject/${parseInt(idGroup)}/${parseInt(idProject)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedIDs)
    })
      .then((response) => response.json())
      .then((responseData) => {
        fetchNewData();
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
      });
  }


  // handel function 2 
  const handelChangeOldGroup2 = (event) =>
  {
      const selectedValue = event.target.value;
      setValueSelect4(selectedValue)
      setIdspecific2(selectedValue.split('/')[0])
      setIdGroup2(selectedValue.split('/')[1])
      setValueSelect5('')
      setValueSelect6('')
  }
  const handelChangeCurruntlyGroup2 = (event) =>
  {
      const selectedValue = event.target.value;
      setValueSelect5(selectedValue)
      setIdspecific2(selectedValue.split('/')[0])
      setIdGroup2(selectedValue.split('/')[1])
      setValueSelect4('')
      setValueSelect6('')
  }

  const handelChangeProject2 = (event) =>
  {
      const selectedValue = event.target.value;
      setValueSelect6(selectedValue)
      setIdProject2(selectedValue)
  }
  // finish function 2 

  useEffect(() => {
    fetch(`http://localhost:8082/api/getStudentsGroup2/${idGroup2}/${idProject2}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllStudentGroup2(data);
        setIdUser(data[0].idOfUser)
      })
      .catch((error) => console.error(error));
  }, [idProject2]);

  useEffect(() => {
    fetch(`http://localhost:8082/api/getProjectSpecific/${idSpefific2}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNameSpecific2(data);
        if (data.length > 0) {
          setIdProject2(data[0].id);
          setValueSelect6(data[0].id)
        }
      })
      .catch((error) => console.error(error));
  }, [idSpefific2]);

  const handelClickUser = (idUser) =>
  {
      setIdUser(idUser)
  }
  useEffect(() => {
    fetch(`http://localhost:8082/api/get_pushProject/${idProject2}/${idUser}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllConversationStudent(data);
      })
      .catch((error) => console.error(error));
  }, [idUser]);

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
                      <button onClick={handelValidAll}>Valid</button>
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
                          <th>select</th>
                          <th className={style.displayNone}>validate FWeek</th>
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
                        <td>
                        <input
                            type="checkbox"
                            className={style.checkBox}
                            checked={checkboxes[item.idOfUser] || false}
                            onChange={() => toggleCheckbox(item.idOfUser)}
                          />
                        </td>
                        <td className={style.displayNone}>
                        {item.valid_project === 1 ? <button>is Valid</button> : <button  onClick={() => handlCklickEachValid(item.idOfUser)}>valid</button> }
                        </td>
                    </tr>    
                    ))}   
                    </tbody>
                </table>
        </div>
        {/* finish container of table */}
        <div className={style.containerLinkProjectValid}>
            {/* start container choose group and project */}
            <div className={style.containerChooseGroupProject}>
                <div className={style.containerTitle}>
                    <HiFolderRemove  className={style.iconFolder}/>
                    <p>Choose User Validate</p>
                </div>
            {/* finish title */}
            {/* start selects */}
            <div className={style.containerInputs}>
                <select value={valueSelect4} onChange={handelChangeOldGroup2}>
                    <option value="Choose Old group" >Choose Old group</option>
                    {selectOldGroups.map((item, index) => (
                    <option key={index} value={`${item.IdNameSpecific}/${item.IdGroup}`}>Group : {item.name_group} {item.name}</option>
                    ))}
                </select>
                <select value={valueSelect5} onChange={handelChangeCurruntlyGroup2}>
                    <option value="Choose Curruntly group">Choose Curruntly group</option>
                    {selectCurrentGroups.map((item,index) => (
                    <option key={index} value={`${item.IdNameSpecific}/${item.IdGroup}`}>Group : {item.name_group} {item.name}</option>
                    ))}
                </select>
                <select value={valueSelect6} onChange={handelChangeProject2}>
                    <option value="Choose Project">Choose Project</option>
                    {nameSpecific2.map((item, index) => (
                    <option key={index} value={item.id}>{item.name_project}</option>
                    ))}
                </select>
            </div>
            {/* finishe selects */}
            </div>
            {/* finish conainer choose goroup and project */}
            {/* start container links */}
            <div className={style.containerLinks}>
                <div className={style.partStudents}>
                    <div className={style.containerTitles}>Choose Student</div>
                    <div className={style.allStudent}>
                      {allStudentGroup2.map((item, index) => (
                        <div key={index} className={index % 2 === 0 ? style.eachStudent : style.eachStudentWhite} onClick={() => handelClickUser(item.idOfUser)}>
                            <div className={style.containerImg}><img src={require(`../../imgs/${item.image}`)}/></div>
                            <div className={style.containerName}><p>{item.firstName} {item.lastName}</p></div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className={style.partLinks}>
                    <div className={style.containerTitles}>Links</div>
                    <div className={style.allLinks}>
                      {allConversationStudent.map((item, index) => (
                      <div key={index}>
                        {item.message_student !== null && (
                       <div className={style.ContainerMessageStudent}>
                        <p className={style.time}>{item.firstName}: {item.time_send_student}</p>
                        <div className={style.message}>
                            <p>{item.message_student}</p>
                        </div>
                       </div>
                      )}
                       {item.message_teacher !== null && (
                       <div className={style.ContainerMessageTeacher}>
                        <p className={style.time2}>{item.first_name}: {item.time_send_teacher}</p>
                        <div className={style.message}>
                            <p>{item.message_teacher}</p>
                        </div>
                       </div>
                       )}
                       </div>
                       ))}
                    </div>
                </div>
            </div>
            {/* finish container links */}
        </div>
    </div>
  );

}

export default MainValidate;
