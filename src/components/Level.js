import React, { useState, useEffect } from "react";
import style from "../sass/level.module.scss";
import karim from "../imgs/karim.png";
import { getItem } from "localforage";

function Level({ selectedValues, setSelectedValues, setSelectedValuesTools, setSelectedValuesProject}) {
  const [level, setLevel] = useState([]);
  const [selectedOptionKey, setSelectedOptionKey] = useState(null); // Set default value here
  
  const [selectedValue, setSelectedValue] = useState("");
  const selectLocalStor = localStorage.getItem("selectedOptionKey");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    const selectedOption = data.find((item) => item.name === event.target.value);
    // if (selectedOption) {
      setSelectedOptionKey(selectedOption.id);
      localStorage.setItem("selectedOptionKey", selectedOption.id);
      // // localStorage.setItem("idProject", selectValuePoject[0].id);
      // console.log("test ok so llllllllllll ",localStorage.getItem('idProject'));
    // }
  };
  
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_languages/${selectLocalStor}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSelectedValues(data);
      })
      .catch((error) => console.error(error));
  }, [selectLocalStor, level[0]]);

  const gradient = `linear-gradient(to right, #02babd ${
    level.length > 0 ? level[0].background : 0
  }%, #1b1c2312 0%)`;
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_tools/${selectLocalStor}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setSelectedValuesTools(data);
      })
      .catch((error) => console.error(error));
  }, [selectLocalStor]);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_porject/${selectLocalStor}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          localStorage.setItem("idProject", data[0].id);
          console.log("some peaple ok ", localStorage.getItem("idProject"))
        }
        setSelectedValuesProject(data);
      })
      .catch((error) => console.error(error));
  }, [selectLocalStor]);

  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/name_specifics/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        const firstItemWithStudyNow = data.find((item) => item.study_now === 1);
        // Set the selectedOptionKey to the id of the first item with item.study_now === 1
        if (firstItemWithStudyNow && !localStorage.getItem("selectedOptionKey")) {
          // console.log(firstItemWithStudyNow)
          localStorage.setItem("selectedOptionKey", firstItemWithStudyNow.id);
          setSelectedOptionKey(firstItemWithStudyNow.id);
        }
      })
      .catch((error) => console.error(error));
  }, [userId]);
  
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_levels/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok karim");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        setLevel(data);
      })
      
      .catch((error) => console.error(error));
  }, [userId, selectLocalStor]);
 
  const sortedData = data.sort((a, b) => {
    if (a.study_now === 1 && b.study_now !== 1) {
      return -1; // a comes before b
    } else if (a.study_now !== 1 && b.study_now === 1) {
      return 1; // b comes before a
    } else {
      return 0; // no change in order
    }
  });
  const selectedIndex = sortedData.findIndex((item) => item.id.toString() === selectLocalStor);

  // Move the selected option to the first position if it exists
  if (selectedIndex !== -1) {
    sortedData.unshift(sortedData.splice(selectedIndex, 1)[0]);
  }
const [countExp, setCountExp] = useState(0);
  // i try to fetch data to see if i improve in my level
  useEffect(() => {
    var data2;
    fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/get_count_exp/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        try {
          const requestData = {
            exp: data.length > 0 && data[0].exp ? data[0].exp  || 0 : 0,
            id_user: userId,
            background: data.length > 0 && data[0].exp ? data[0].exp.toString().split(".")[1] || 0 : 0,
            // Add more key-value pairs as needed
          };
      // console.log("test ok ",data.length > 0 ? data[0].exp.toString().split(".")[1] : 1);
          fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/update_level/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
        } catch (error) {
          console.error('Error in useEffect:', error);
        }
      })
      .catch((error) => console.error(error));
      console.log("fchkel ",data2);
      
  }, [userId, setCountExp]);

// console.log("test", countExp[0].exp)

//   i try to update level of user



  return (
    <div className={style.container}>
      <div className={style.contLevel}>
        <img src={karim} alt="" className={style.photoPhon} />
        <select value={selectedValue} onChange={handleSelectChange} className="select">
          {sortedData.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div className={style.level} style={{ backgroundImage: gradient }}>
          {level.length > 0 ? <p>level - {level[0].level}%</p> : <p>No level data available</p>}
        </div>
      </div>
    </div>
  );
}

export default Level;
