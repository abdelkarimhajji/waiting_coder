import React, { useState , useEffect} from 'react'
import style from "../sass/mainsendemail.module.scss"
import {BiMailSend } from 'react-icons/bi'
import { TbPasswordUser } from "react-icons/tb";
import { IoIosHappy } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

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
    const [checked, setChecked] = useState(false);
    const [userCheckedAlone, setUserCheckedAlone] = useState(false);
    const [userCheckedAloneName, setUserCheckedAloneName] = useState('');
    const [userCheckedAloneImage, setUserCheckedAloneImage] = useState('');
    const [userCheckedAloneSpecific, setUserCheckedAloneSpecific] = useState('');
    const [userCheckedAlonePhone, setUserCheckedAlonePhone] = useState('')
    const [userCheckedAlone2, setUserCheckedAlone2] = useState(0);
    const [userCheckedAloneName2, setUserCheckedAloneName2] = useState('');
    const [userCheckedAloneImage2, setUserCheckedAloneImage2] = useState('');
    const [userCheckedAloneSpecific2, setUserCheckedAloneSpecific2] = useState('');
    const [userCheckedAlonePhone2, setUserCheckedAlonePhone2] = useState('')
    const [usersChecked, setUsersChecked] = useState([]);
    const [valueSubject, setValueSubject] = useState('');
    const [valueMessage, setValueMessage] = useState('');
    const tileWelcom = "Welcome to the Waiting Coder!";
    const descWelcom = `Hello everyone,
    I just wanted to introduce myself. I’m Abdelkarim hajji, and I’ll be working with you during your programming journey. If you have any questions or need help, feel free to reach out to me anytime.
    Looking forward to working with you all!
    Best regards,
    Abdelkarim hajji\n`;

    const passwordTitle = `Password for the app`;
    const passwordDesc = `Hello [Student's Name],

            I hope you're doing well! I'm happy to share your account details with you.

            If you ever have any questions or need help, feel free to reach out. Wishing you all the best in your learning journey!

            Now, here are your login details:
            \n\n`

    const goodByTitle = `Farewell and Best Wishes`;
    const goodByDesc = `Hello,
                        It’s time for me to say goodbye. I just wanted to take a moment to thank you personally for all the great moments we’ve shared during our time working together. It’s truly been a pleasure seeing you grow and develop your skills.
                        I hope you continue to push forward in your programming journey, and I have no doubt that you’ll do amazing things in the future.
                        Remember, stay curious, keep learning, and don’t hesitate to reach out if you ever need anything. I’m always here if you have any questions or need support.
                        Goodbye, and take care!
                        Best wishes,\nAbdelkarim hajji`

    function callWelcome(){
        setValueDesc(descWelcom)
        setValueTitle(tileWelcom)
    }
    function callPassword()
    {
        setValueTitle(passwordTitle)
        setValueDesc(passwordDesc)
        setValueSubject(passwordTitle)
        setValueMessage(passwordDesc)
    }
    function callGoodBy()
    {
        setValueTitle(goodByTitle)
        setValueDesc(goodByDesc)
        setValueSubject(goodByTitle)
        setValueMessage(goodByDesc)
    }
    useEffect(() => {
        setValueDesc(descWelcom)
        setValueTitle(tileWelcom)
        setValueSubject(descWelcom)
        setValueMessage(tileWelcom)
    }, []);


   


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

        // setValueMessage("Welcome");
        // setValueSubject("This page is still in development ...");
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
            setUsers(data);
            if(data.length > 0)
            {
                setUserCheckedAlone(data[0].id)
                setUserCheckedAloneImage(data[0].image)
                setUserCheckedAloneName(`${data[0].firstName} ${data[0].lastName}`)
                setUserCheckedAloneSpecific(data[0].name)
                setUserCheckedAlonePhone(data[0].phone)

                setUserCheckedAlone2(data[0].id)
                setUserCheckedAloneImage2(data[0].image)
                setUserCheckedAloneName2(`${data[0].firstName} ${data[0].lastName}`)
                setUserCheckedAloneSpecific2(data[0].name)
                setUserCheckedAlonePhone2(data[0].phone)
            }
        })
        .catch((error) => console.error(error))
    }
    }, [idGroup])

function handelValueCurrentGroup(event)
{
    const target = event.target.value;
    const idGroup_ = target.split("*")[0];
    setSelectedDefaultValue(target)
    setIdGroup(idGroup_);
    setSelectedDefaultValueOld("")
}

function handelValueOldGroup(event)
{
    const target = event.target.value;
    const idGroup_ = target.split("*")[0];
    setIdGroup(idGroup_);
    setSelectedDefaultValueOld(target)
    setSelectedDefaultValue("")
}

function selectAll()
{
    if(!checked)
    {
        let array = [];
        let i = 0;
        while(i < users.length){
            array.push(users[i].id)
            i++;
        }
        setUsersChecked([...array])
        // alert(array)
    }
    
    setChecked(!checked);
    if(checked)
    {
        setUsersChecked([]);
        setUserCheckedAlone(userCheckedAlone2);
        setUserCheckedAloneImage(userCheckedAloneImage2);
        setUserCheckedAloneName(userCheckedAloneName2);
        setUserCheckedAloneSpecific(userCheckedAloneSpecific2);
        setUserCheckedAlonePhone(userCheckedAlonePhone2);
    }
    
    
}

function clickOnCard(idUser, firstName, lastName, image ,nameSpecific, phone)
{
    if(usersChecked.length !== 0 && checked && !usersChecked.includes(idUser))
    {
        // alert(1)
        const newArray = usersChecked;
        newArray.push(idUser);
        // alert(newArray);
        setUsersChecked([...newArray]);
        setUserCheckedAlone(0)
    }
    else if(usersChecked.length !== 0 && checked && usersChecked.includes(idUser))
    {
        const newArray = usersChecked.filter(item => item != idUser);
        setUsersChecked([...newArray]);
        if(newArray.length === 0 && checked)
            setChecked(!checked)
        setUserCheckedAlone(0)
        if(newArray.length === 0)
            setUserCheckedAlone(userCheckedAlone2);
    }
    
    if(usersChecked.length === 0 && checked === false )
    {
        if(idUser !== userCheckedAlone)
        {
            setUserCheckedAlone(idUser);
            setUserCheckedAloneImage(image)
            setUserCheckedAloneName(`${firstName} ${lastName}`)
            setUserCheckedAloneSpecific(nameSpecific)
            setUserCheckedAlonePhone(phone)
        }
    }
}


async function sendMessage()
{
    alert("Confirme")
    let emails;
    if(usersChecked.length === 0)
        emails = userCheckedAlone2;
    else
        emails = usersChecked;
    try{
        const response = await fetch(`http://${process.env.REACT_APP_ADMIN_HOST}:${process.env.REACT_APP_ADMIN_PORT}/api/sendEmails/`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({emails, valueSubject, valueMessage}),
        })
        const data = await response.json();
        console.log("Emails sent:", data);
    }catch(error){
        console.log("error sending emails:", error);
    }
}



// setUsersChecked(prev => [...prev, newUser]); 
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
                    <input checked={checked} type="checkbox" onChange={selectAll}/>
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
                    <div key={index} className={style.boxUser}  style={(usersChecked.includes(item.id) && checked && usersChecked.length !== 0) || (userCheckedAlone === item.id && usersChecked.length === 0)? { backgroundColor: '#2a2d38', color: 'white' }: {}} onClick={() => clickOnCard(item.id, item.firstName, item.lastName, item.image ,item.name, item.phone)}>
                        {/* start make top part of boxUser profile */}
                        <div className={style.topPartProfile}>
                            {/* start make  part left of img */}
                                <div className={style.containerImg}>
                                {item.phone === "null" ? (
                                    <img src={item.image} alt={item.firstName} className={style.img} />
                                ):(
                                  
                                  <img src={require(`../../imgs/${item.image}`)} alt={item.firstName} className={style.img} />
                              )}
                                </div>
                            {/* finish make  part left of img */}
                            {/* start make part to have name user */}
                                <div className={style.containerName} >
                                    <span className={style.name} style={(usersChecked.includes(item.id) && checked && usersChecked.length !== 0) || (userCheckedAlone === item.id && usersChecked.length === 0)? { color: 'white' }: {}} >{item.firstName} {item.lastName}</span>
                                    <span className={style.specific} style={(usersChecked.includes(item.id) && checked && usersChecked.length !== 0) || (userCheckedAlone === item.id && usersChecked.length === 0)? { color: 'white' }: {}} >{item.name}</span>
                                </div>  
                            {/* finish make part to have name user */}
                        </div>
                        {/* finish make top part of boxUser profile */}

                        {/* start make bottom part of boxUser profile */}
                        <div className={style.bottomPartProfile}>
                            {/* start make  part left of icon */}
                                <div className={style.containerImg} >
                                <BiMailSend className={style.icon} style={(usersChecked.includes(item.id) && checked && usersChecked.length !== 0) || (userCheckedAlone === item.id && usersChecked.length === 0)? { color: 'white' }: {}} />
                                </div>
                            {/* finish make  part left of icon */}
                            {/* start make part to have desc user */}
                                <div className={style.containerDesctiption}>
                                    <span className={style.desc} style={(usersChecked.includes(item.id) && checked && usersChecked.length !== 0) || (userCheckedAlone === item.id && usersChecked.length === 0) ? { color: 'white' }: {}} >
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
                                {
                                    userCheckedAlonePhone ? (
                                    !checked ? (  
                                        userCheckedAlonePhone === "null" ? (
                                            <img src={userCheckedAloneImage} alt={userCheckedAloneName} className={style.img} />
                                        ) : (
                                            <img src={require(`../../imgs/${userCheckedAloneImage}`)} alt={userCheckedAloneName} className={style.img} />
                                        )
                                    ):(<FaPeopleGroup style={{fontSize: '30px'}}/>)
                                    ):(
                                        <p style={{fontSize:'12px'}}>No image</p>
                                    )
                                }
                            </div>

                            <div className={style.containerName}>
                                <span className={style.name}>{
                                !checked ? (
                                        userCheckedAloneName 
                                        ? userCheckedAloneName : 'No user'
                                    ):(<p>Group</p>)
                                }</span>
                                <span className={style.specific}>{userCheckedAloneSpecific ? userCheckedAloneSpecific : 'No specific'}</span>
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
                                <textarea defaultValue={valueTitle} type='text' maxLength="20" onChange={(e) => setValueSubject(e.target.value)}/>
                            </div>
                            <div className={style.discreption}>
                                <textarea  maxLength="1050" defaultValue={valudeDesc} type='text' onChange={(e) => setValueMessage(e.target.value)}/>
                            </div>
                            <div className={style.sendEmail}>
                                <button onClick={sendMessage}>Send Message</button>
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
