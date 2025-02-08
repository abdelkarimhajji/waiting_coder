import React, { useState, useEffect } from "react";
import style from "../sass/level.module.scss";
import karim from "../imgs/karim.png";

function Level({ selectedValues, setSelectedValues, setSelectedValuesTools, setSelectedValuesProject}) {
  const [level, setLevel] = useState([]);
  
  const [selectedValue, setSelectedValue] = useState("");
  const selectLocalStor = localStorage.getItem("selectedOptionKey");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    const selectedOption = data.find((item) => item.name === event.target.value);
      localStorage.setItem("selectedOptionKey", selectedOption.id);
      
  };
  
  const firstLevel = level[0];
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

  }, [selectLocalStor, firstLevel, setSelectedValues]);

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
        
        if (firstItemWithStudyNow && !localStorage.getItem("selectedOptionKey")) {
    
          localStorage.setItem("selectedOptionKey", firstItemWithStudyNow.id);
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
     
        setLevel(data);
      })
      
      .catch((error) => console.error(error));
  }, [userId, selectLocalStor]);
 
  const sortedData = data.sort((a, b) => {
    if (a.study_now === 1 && b.study_now !== 1) {
      return -1; 
    } else if (a.study_now !== 1 && b.study_now === 1) {
      return 1; 
    } else {
      return 0; 
    }
  });
  const selectedIndex = sortedData.findIndex((item) => item.id.toString() === selectLocalStor);

  if (selectedIndex !== -1) {
    sortedData.unshift(sortedData.splice(selectedIndex, 1)[0]);
  }

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
            
          };
     
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
      
  }, [userId]);




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
