import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from '../sass/maingroupsandusers.module.scss'
import {BsCalendarDateFill} from 'react-icons/bs'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCalendarXFill} from 'react-icons/bs'
import {HiFolderRemove} from 'react-icons/hi'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { MdOutlineGppBad } from 'react-icons/md'

function MainGroupsAndUsers() {
  
    const [selectInfoGroups, setSelectInfoGroups] = useState([]);
    const [selectUserInfo, setSelectUserInfo] = useState([]);
    const [selectOldGroups, setSelectOldGroups] = useState([]);
    const [selectCurrentGroups, setSelectCurrentGroups] = useState([]);
    const [selectIdGroup, setSelectIdGroup] = useState();
    const [selectCountGroupsWorking, setSelectCountGroupsWorking] = useState();
    const [isCheckAllChecked, setIsCheckAllChecked] = useState(false);
    const [updatedIds, setUpdatedIds] = useState([]);
    const [dateCreated, setDateCreated] = useState();
    const [getALLSpecific, setGetALLSpecific] = useState([]);
    const [getALLTeachers, setGetALLTeachers] = useState([]);
    const [valueGroupFinished, setValueGroupFinished] = useState('');
    const [dateFinished, setDateFinished] = useState(0);
    const [addSucces, setAddSucces] = useState(2);

    useEffect(() => {
        fetch(`http://35.180.127.147:8082/api/getMoreInfoGroups`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectInfoGroups(data);
            console.log("groups ", data);
          })
          .catch((error) => console.error(error));
      }, []);
    
      useEffect(() => {
        fetch(`http://35.180.127.147:8082/api/getGroupsWorking`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectCountGroupsWorking(data);
          })
          .catch((error) => console.error(error));
      }, []);

      useEffect(() => {
        fetch(`http://35.180.127.147:8082/api/getUserSpecificPayment/${selectIdGroup}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectUserInfo(data);
          })
          .catch((error) => console.error(error));
      }, [selectIdGroup, isCheckAllChecked,updatedIds, selectIdGroup]);

      useEffect(() => {
        fetch(`http://35.180.127.147:8082/api/getOldGroups`)
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
        fetch(`http://35.180.127.147:8082/api/getCurrentGroups`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSelectCurrentGroups(data);
            setSelectIdGroup(data[0].IdGroup)
            setDateCreated(data[0].date_created.split("T")[0])
            setSelectedOption2(`${data[0].IdGroup}*${data[0].date_created}`)
          })
          .catch((error) => console.error(error));
        }, [valueGroupFinished, addSucces]);
        
        const [checkedItems, setCheckedItems] = useState({});
        const [checkedIds, setCheckedIds] = useState({});
  
  const handleCheckboxChange = (event, index, id_user) => {
    // Update the checkedItems state
    const newCheckedItems = {
      ...checkedItems,
      [index]: event.target.checked,
    };
    setCheckedItems(newCheckedItems);
  
    console.log("ffff", event.target.checked)
    // Update the checkedIds state
    const newCheckedStudentIds = [...checkedStudentIds]; // Create a copy of the array

  if (event.target.checked) {
    newCheckedStudentIds.push(id_user); // Add the ID to the array
  } else {
    const indexToRemove = newCheckedStudentIds.indexOf(id_user);
    if (indexToRemove !== -1) {
      newCheckedStudentIds.splice(indexToRemove, 1); // Remove the ID from the array
    }
  }

  setCheckedStudentIds(newCheckedStudentIds);
  };
  
  
  
  const [checkedStudentIds, setCheckedStudentIds] = useState([]);

  const handleCheckAll = (event) => {
    if(event.target.checked === true)
    {
      const allChecked = Object.fromEntries(
        selectUserInfo.map((_, index) => [index, true])
      );
      setCheckedItems(allChecked);
      setIsCheckAllChecked(true);
    }
    else
    {
      const allChecked = Object.fromEntries(
        selectUserInfo.map((_, index) => [index, false])
      );
      setCheckedItems(allChecked);
      setIsCheckAllChecked(false);
    }

    if (event.target.checked === true) {
      const allCheckedIds = selectUserInfo.map((item) => item.id_user);
      setCheckedStudentIds(allCheckedIds);
    } else {
      setCheckedStudentIds([]);
    }
   
  };
  

  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');


  const handleSelect1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);
    setSelectedOption2(selectedValue);
    setSelectIdGroup(parseInt(selectedValue.split('*')[0]))
    setIsCheckAllChecked(false)
    const allChecked = Object.fromEntries(
      selectUserInfo.map((_, index) => [index, false])
    );
    if(selectedValue !== 'Choose another Year')
    {
      setDateCreated(selectedValue.split('*')[1].split('T')[0]);
      setDateFinished(selectedValue.split('&')[1].split('T')[0])
    }
    // setDateCreated(selectedValue)
    setCheckedItems(allChecked);
  };

  const handleSelect2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
    setSelectedOption1(selectedValue); // Synchronize both selects
    setSelectIdGroup(parseInt(selectedValue.split('*')[0]))
    setIsCheckAllChecked(false)
    const allChecked = Object.fromEntries(
      selectUserInfo.map((_, index) => [index, false])
    );
    if(selectedValue !== 'Choose another Year')
    {
      setDateCreated(selectedValue.split('*')[1].split('T')[0]);
      setDateFinished(0);
    }
    // setDateCreated(selectedValue)
    setCheckedItems(allChecked);
  };
  useEffect(() => {
    console.log("SelectIdGroup ===> ", selectIdGroup)
  }, [selectIdGroup]);
  const handelValidateAll = () =>
  { 
    if(isCheckAllChecked === true)
    {
      const requestData = {
        checkedStudentIds: checkedStudentIds,
        selectIdGroup: selectIdGroup,
      };
    fetch('http://35.180.127.147:8082/api/validateWeekAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((responseData) => {
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
    });
    const allChecked = Object.fromEntries(
      selectUserInfo.map((_, index) => [index, false])
    );
    setCheckedItems(allChecked);
    setIsCheckAllChecked(false);
  }
  }
  
  const handelValidate = (event, id_user) =>
  {
    fetch('http://35.180.127.147:8082/api/updateValidationWeek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user }), // Sending the user ID in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        setUpdatedIds([...updatedIds, id_user]); 
      })
      .catch((error) => {
        console.error('Error updating validation_week:', error);
      });
  }


  useEffect(() => {
    fetch(`http://35.180.127.147:8082/api/getAllNameSpecifics`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetALLSpecific(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://35.180.127.147:8082/api/getAllTeachers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGetALLTeachers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [idSpecific, setIdSpecific] = useState('Choose Specifics');
  const [idTeacher, setIdTeacher] = useState('Choose Teacher');
  const [inputValueName, setInputValueName] = useState("");
  const [nameAlreadExist, setNameAlreadExist] = useState(0);

  const  handleSelectChooseSpicific = (event) =>
  {
    const selectedValue = event.target.value;
    setSelectedOption3(selectedValue);
    setIdSpecific(parseInt(selectedValue))
  }

  const  handleSelectChooseTeacher = (event) =>
  {
    const selectedValue = event.target.value;
    
    setSelectedOption4(selectedValue);
    setIdTeacher(parseInt(selectedValue))
  }
  const handleGetValueInput =  (event) =>
  {
    const selectedValue = event.target.value;
    setInputValueName(selectedValue);
  }


  useEffect(() => {
  }, [inputValueName]);


  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');
  const [notNumber, setNotNumber] = useState(0);
  const [notChoose, setNotChoose] = useState(0);
 

  const createGroup = () => 
  {   
    const requestData = {
      idSpecific: idSpecific,
      idTeacher: idTeacher,
      inputValueName: inputValueName,
    };
    if(!isNaN(inputValueName)  && inputValueName !== '' && selectedOption3 !== 'Choose Specifics'
    && idSpecific !== 'Choose Specifics' && idSpecific !== '' && selectedOption4 !== 'Choose Teacher'
    && idTeacher !== 'Choose Teacher' && idTeacher !== '')
    {
    fetch('http://35.180.127.147:8082/api/createGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
  
      .then((responseData) => {
        console.log('Data from the server:', responseData.message);
        if(responseData.message === 'Name of this group alredy exist')
        {
          setAddSucces(0);
          setNameAlreadExist(1)
        }
        else
        {
          setNameAlreadExist(0)
          setAddSucces(1)
        }
        // Name of this group alredy exist
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
    });
    console.log('setSelectedOption3 ===> ',selectedOption3)
    setInputValueName('')
    setSelectedOption3('');
    setSelectedOption4('');
    setNotNumber(0);
    setNotChoose(0);
    setIdSpecific('Choose Specifics')
    setIdTeacher('Choose Teacher')
  }
  else
  {
    if(isNaN(inputValueName) || inputValueName === '')
    {
      setNotNumber(1);
      setNotChoose(0);
    }
    else
    {
      setNotChoose(1);
      setNotNumber(0);
    }
  }
  }
useEffect(() => {
 
}, [notNumber]);


const [selectedIdGroupFinish, setSelectedIdGroupFinish] = useState(null);
const [finishGroup, setFinishGroup] = useState(2);


const handleSelectGroupsFinish =  (event) =>
{
  const selectedValue = event.target.value;
  setValueGroupFinished(selectedValue)
  setSelectedIdGroupFinish(selectedValue);
}

const finisheGroup = () =>
{
  if (selectedIdGroupFinish !== null 
    && selectedIdGroupFinish !== 'Choose Group to Finishe')
  {
    fetch(`http://35.180.127.147:8082/api/updateGroups/${parseInt(selectedIdGroupFinish)}`, {
      method: 'PUT',  // This should be 'PUT' since you're updating the resource.
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // You can add code here to handle the response data if needed.
      })
      .catch((error) => {
        console.error('Error pushing data:', error);
      });
      setFinishGroup(1)
      setValueGroupFinished('')
      setSelectedIdGroupFinish(null)
  }
}
  return (
    <div className={style.container}>
      <div className={style.containerDivsInfo}>
          {/* start one div */}
          {selectInfoGroups.map((item, index) => (
            <div key={index} className={style.oneDiv}>
              <div className={style.insidedOneDivContent}>
                  <div className={style.total}>
                      <p>{item.specific_name}</p>
                  </div>
                  <div className={style.description}>
                      <p>Total of Groups : {item.group_count} </p>
                      <p>Group(s) working now are(is) : {item.unfinished_group_count} </p>
                  </div>
              </div>
              <div className={style.insdeOneDivUnder}></div>
            </div>
          ))}
          {/* finish one div */}
          {/* start one div */}
            <div className={style.oneDiv}>
              <div className={style.insidedOneDivContent}>
                  <div className={style.total}>
                      <p>Groups Working</p>
                  </div>
                  <div className={style.description}>
                        {selectCountGroupsWorking && selectCountGroupsWorking.length > 0 ? (
                            <p>Total groups working: {selectCountGroupsWorking[0].unfinished_group_count}</p>
                        ) : (
                            <p>Loading or no data available</p>
                        )}
                    </div>
              </div>
              <div className={style.insdeOneDivUnder}></div>
            </div>
          {/* finish one div */}
        </div>
        {/* container about groups start */}
        <div className={style.containerListUsers}>
            <div className={style.containerSelect}>
            <select value={selectedOption1} onChange={handleSelect1Change}>
              <option value="Choose another Year">Choose Old Group</option>
              {selectOldGroups.map((item, index) => (
              <option key={index} value={`${item.IdGroup}*${item.date_created}&${item.date_finished}`}>Group {item.name_group} {item.name}</option>
              ))}
            </select>
          <select value={selectedOption2} onChange={handleSelect2Change}>
            <option value="Choose another Year">Choose Current Group</option>
            {selectCurrentGroups.map((item, index) => (
            <option key={index} value={`${item.IdGroup}*${item.date_created}`}>Group {item.name_group} {item.name}</option>
            ))}
          </select>
            </div>
            <div className={style.selectAll}>
              <div className={style.containerAll}>
                <div className={style.containerChecked}>
                  <label >Checked All</label>
                  <input
                    type="checkbox"
                    style={{ marginLeft: '20px' }}
                    onChange={handleCheckAll}
                    checked={isCheckAllChecked}
                  />
                  </div>
              </div>
              <div className={style.containerValidate} >
                  <button onClick={handelValidateAll}>validate Week</button>
                  {/* <button onClick={handleCheckAll}>Check All</button> */}
              </div>
             
            </div>
            <div className={style.cantainerTable}>
              <div className={style.containerTitles}>
                <div className={style.containerDateCreate}>
                <BsCalendarDateFill  className={style.iconDate}/>
                <p> Created At : {dateCreated}</p>
                </div>
                {dateFinished !== 0 && 
                <div className={style.containerDateCreate}>
                <BsFillCalendarXFill  className={style.iconDate}/>
                <p> Finished At : {dateFinished}</p>
                </div>
                }
              </div>
            
                <table>
                  <thead>
                      <tr>
                          <th>Image</th>
                          <th>Student(s)</th>
                          <th>payemnt</th>
                          <th className={style.displayNone}>update</th>
                          <th >select</th>
                          <th className={style.displayNone}>validate FWeek</th>
                      </tr>
                    </thead>
                    <tbody>
                    {selectUserInfo.map((item, index) => (
                    <tr key={index} className={style.trHover}>
                        <td>
                          {item.phone === "null" ? (
                              <img src={item.image} alt={item.firstName} className={style.img} />
                            ):(
                              
                              <img src={require(`../../imgs/${item.image}`)} alt={item.firstName} className={style.img} />
                          )}
                        </td>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.payment} DH</td>
                        <td className={style.displayNone}><button>edit</button></td>
                        <th >
                        <input
                            type="checkbox"
                            className={style.checkBox}
                            checked={checkedItems[index] || false}
                            onChange={(event) => handleCheckboxChange(event, index, item.id_user)}
                          />
                        </th>
                        <td className={style.displayNone}>
                        {item.validation_week === 1 ? (
                            <button>is Valid</button>
                          ) : (
                            <button onClick={(event) => handelValidate(event, item.id_user)}>validate</button>
                          )}
                          {console.log("valid week ===> ",item.validate_week)}
                        </td>
                    </tr>       
                    ))} 
                    </tbody>
                </table>
            </div>
            {/* finish container table */}
        </div>
        {/* create groups */}
        <div className={style.containerGroups}>
              <div className={style.containerTitle}>
                <MdCreateNewFolder  className={style.iconFolder}/>
                <p>Create New Group</p>
              </div>
              <div className={style.containerCreateGroups}>
                    <div className={style.containerInputs}>
                      <input type="text" placeholder="Enter Number Of gorup" value={inputValueName} onChange={handleGetValueInput}/>
                      <select value={selectedOption3} onChange={handleSelectChooseSpicific}>
                        <option value="Choose Specifics">Choose Specifics</option>
                        {getALLSpecific.map((item, index) => (
                        <option key={index} value={item.id} >Group {item.name}</option>
                      ))}
                      </select>
                    <select value={selectedOption4} onChange={handleSelectChooseTeacher}>
                      <option value="Choose Teacher">Choose Teacher</option>
                      {getALLTeachers.map((item, index) => (
                      <option key={index} value={item.id}>Teacher : {item.first_name} {item.last_name}</option>
                      ))}
                    </select>
                    </div>
                    <div className={style.containerInputCreate}>
                    {notNumber === 1 && <p>The Name should be Number!!!</p>}
                    {notChoose === 1 && <p>Must Choose Option!!!</p>}
                    {nameAlreadExist == 1 && <p>This name already exist!!!</p>}
                      <input type="button" value="Create" onClick={createGroup} />
                      {addSucces === 1 ? (
                        <HiOutlineBadgeCheck className={style.create}/>
                        ) : addSucces === 0 ? (
                        <MdOutlineGppBad  className={style.nCreate}/>
                      ) : null}
                    </div>
              </div>
        </div>
        {/* finish create groups */}

        {/* start group finish */}
        <div className={style.containerFinishGroup}>
              <div className={style.containerTitle}>
                <HiFolderRemove  className={style.iconFolder}/>
                <p>Finish Group</p>
              </div>
              <div className={style.conatinerInputs}>
                    <div className={style.containerSelect}>
                    <select value={valueGroupFinished} onChange={handleSelectGroupsFinish}>
                        <option value="Choose Group to Finishe">Choose Group to Finishe</option>
                        {selectCurrentGroups.map((item, index) => (
                        <option key={index} value={item.IdGroup}>Group {item.name_group} {item.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className={style.containerValid}>
                          <button onClick={finisheGroup}>Submit</button>
                          {finishGroup === 1 ? <HiOutlineBadgeCheck className={style.create2}/>: null}
                    </div>
              </div>
        </div>
        {/* finish group finish */}
    </div>
  );

}

export default MainGroupsAndUsers;
