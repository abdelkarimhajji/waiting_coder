import React, { useState , useEffect} from 'react'
import style from "../sass/mainsendemail.module.scss"
import {BiMailSend } from 'react-icons/bi'
import { TbPasswordUser } from "react-icons/tb";
import { IoIosHappy } from "react-icons/io";


function MainSendEmails() {
    
    const divsToRender = [1, 2, 3, 4, 5, 6, 7];
    const [valueTitle, setValueTitle] = useState();
    const [valudeDesc, setValueDesc] = useState();
    const [currentGroup, setCurrentGroup] = useState();
    const [oldGroup, setOldGroup] = useState();
    const [idGroup, setIdGroup] = useState(null);
    const [selectedDefaultValue, setSelectedDefaultValue] = useState();
    const [selectedDefaultValueOld, setSelectedDefaultValueOld] = useState();
    const [users, setUsers] = useState();
    const tileWelcom = "Welcome";
    const descWelcom = `This page is still in development ... `;

    function callWelcome(){
        setValueDesc(descWelcom)
        setValueTitle(tileWelcom)
    }
    function callPassword()
    {
        setValueDesc("Send Password")
        setValueTitle("Send Password")
    }
    function callGoodBy()
    {
        setValueDesc("GoodBy")
        setValueTitle("GoodBy")
    }
    useEffect(() => {
        setValueDesc(descWelcom)
        setValueTitle(tileWelcom)
        
    }, []);


    // useEffect(() => {
    //     fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getCurrentGroups`)
    //         .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //         })
    //         .then((data) => {
    //         setSelectCurrentGroups(data);
    //         setSelectIdGroup(data[0].IdGroup)
    //         setDateCreated(data[0].date_created.split("T")[0])
    //         setSelectedOption2(`${data[0].IdGroup}*${data[0].date_created}`)
    //         })
    //         .catch((error) => console.error(error));
    //     }, [valueGroupFinished, addSucces]);


    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getCurrentGroups`)
        .then((response) => 
        {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data)=>{
            setCurrentGroup(data);
            setSelectedDefaultValue(`${data[0].IdGroup}*${data[0].date_created}`)
            setIdGroup(data[0].IdGroup);
            // ale
            // ${item.IdGroup}*${item.date_created}
        })
        .catch((error) => console.error(error))
    }, [])


    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/getOldGroups`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setOldGroup(data);
        })
        .catch((error) => console.error(error))
    }, [])

    useEffect(() =>
    {
        if (idGroup !== null) {
        fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/usersAndSpecifics/${idGroup}`)
        .then((response) =>{
            if(!response.ok)
                throw new Error("Network response was not ok");
            return response.json();
        })
        .then((data) =>{
            console.log("data of users ok ",data);
            setUsers(data);
        })
        .catch((error) => console.error(error))
    }
    }, [idGroup])

function handelValueCurrentGroup(event)
{
    console.log("event.target.value", event.target.value)
    const target = event.target.value;
    const idGroup_ = target.split("*")[0];
    setSelectedDefaultValue(target)
    setIdGroup(idGroup_);
    setSelectedDefaultValueOld("")
}

function handelValueOldGroup(event)
{
    console.log("event.targert.value", event.target.value);
    const target = event.target.value;
    const idGroup_ = target.split("*")[0];
    setIdGroup(idGroup_);
    setSelectedDefaultValueOld(target)
    setSelectedDefaultValue("")
}

return (
    <div className={style.containerResponcive}>
        <div className={style.container}>
            <div className={style.containerFilter}>
            <select value={selectedDefaultValue} onChange={handelValueCurrentGroup}>
                    <option value="Choose Project" >Choose Current Group</option>
                    {(currentGroup && currentGroup.length > 0)?
                        currentGroup.map((item, index) => (
                            <option key={index} value={`${item.IdGroup}*${item.date_created}`}>Group {item.name_group} {item.name}</option>
                        )):( <option disabled>No groups available</option>)
                    }
                </select>
                <select value={selectedDefaultValueOld} onChange={handelValueOldGroup}>
                    <option value="Choose Project">Choose Old Group</option>
                    {
                    oldGroup && oldGroup.length > 0 ? 
                        oldGroup.map((item, index) => {
                        return (
                            <option key={index} value={`${item.IdGroup}*${item.date_created}&${item.date_finished}`}>
                            Group {item.name_group} {item.name}
                            </option>
                        );
                        }) : 
                        (<option disabled>No groups available</option>)
                    }
                </select>
                <div className={style.containerSelectALl}>
                    <input type="checkbox"  />
                    <label >Sellect All</label>
                </div>
            </div>
            {/* start all box */}
            <div className={style.containerBox}>
                {/* start left box */}
                <div className={style.containerLeftBox}>
                    {/* start make one box */}
                {
                users && users.length > 0 ?
                users.map((item, index) => (
                    <div key={index} className={style.boxUser}>
                        {/* start make top part of boxUser profile */}
                        <div className={style.topPartProfile}>
                            {/* start make  part left of img */}
                                <div className={style.containerImg}>
                                    <img src={require(`../../imgs/ahajji.jpg`)} alt="" className={style.img} />
                                </div>
                            {/* finish make  part left of img */}
                            {/* start make part to have name user */}
                                <div className={style.containerName}>
                                    <span className={style.name}>{item.firstName} {item.lastName}</span>
                                    <span className={style.specific}>{item.name}</span>
                                </div>  
                            {/* finish make part to have name user */}
                        </div>
                        {/* finish make top part of boxUser profile */}

                        {/* start make bottom part of boxUser profile */}
                        <div className={style.bottomPartProfile}>
                            {/* start make  part left of icon */}
                                <div className={style.containerImg}>
                                <BiMailSend className={style.icon}/>
                                </div>
                            {/* finish make  part left of icon */}
                            {/* start make part to have desc user */}
                                <div className={style.containerDesctiption}>
                                    <span className={style.desc}>
                                        {item.email}
                                    </span>
                                </div>
                            {/* finish make part to have desc user */}
                        </div>
                        {/* finish make bottom part of boxUser profile */}
                    </div>
                    
                    )):(<p>NO USERS</p>)
                }
                    
                    {/* finish make one box */}
                </div>
                {/* finish left box */}

                {/* start right box */}
                <div className={style.containerRightBox}>
                    {/* start inside container */}
                    <div className={style.insideContainerRight}>
                        {/* start titel */}
                        <div className={style.containerTitel}>
                            <div className={style.containerImg}>
                                <img src={require(`../../imgs/ahajji.jpg`)} alt="" className={style.img} />
                            </div>

                            <div className={style.containerName}>
                                <span className={style.name}>Abdelkarim Hajji</span>
                                <span className={style.specific}>Devlopement web Front-end</span>
                            </div>
                        </div>
                        {/* finish titel */}

                        {/* start container title of message */}
                            <div className={style.containerTitleMessage}>
                                <h1>Examples Messages</h1>
                                <div className={style.containerExamples}>
                                    {/* start box exmaples */}
                                    <div className={style.boxExample} onClick={callWelcome}>
                                        <div className={style.containerIcon}>
                                            <IoIosHappy className={style.icon}/>
                                        </div>
                                        <div className={style.containerType}>
                                            <p>Welcome</p>
                                        </div>
                                    </div>
                                    {/* finish box examples */}

                                    {/* start box exmaples */}
                                    <div className={style.boxExample} onClick={callPassword}>
                                        <div className={style.containerIcon}>
                                            <TbPasswordUser className={style.icon}/>
                                        </div>
                                        <div className={style.containerType}>
                                            <p>Send Password</p>
                                        </div>
                                    </div>
                                    {/* finish box examples */}


                                    {/* start box exmaples */}
                                    <div className={style.boxExample} onClick={callGoodBy}>
                                        <div className={style.containerIcon}>
                                            <TbPasswordUser className={style.icon}/>
                                        </div>
                                        <div className={style.containerType}>
                                            <p>GoodBy</p>
                                        </div>
                                    </div>
                                    {/* finish box examples */}

                                </div>
                            </div>
                        {/* finish container title of message */}
                        {/* start container message */}
                        <div className={style.messageForm}>
                            <div className={style.title}>
                                <textarea defaultValue={valueTitle} type='text' maxLength="20"/>
                            </div>
                            <div className={style.discreption}>
                                <textarea  maxLength="1050" defaultValue={valudeDesc} type='text'/>
                            </div>
                            <div className={style.sendEmail}>
                                <button>Send Message</button>
                            </div>
                        </div>
                        {/* finish container message */}
                    </div>
                    {/* finish inside container */}
                </div>
                {/* finish right box */}
            </div>
            {/* finish all box */}
        </div>
    </div>
  )
}

export default MainSendEmails
