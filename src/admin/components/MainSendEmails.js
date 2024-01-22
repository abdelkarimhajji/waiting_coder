import React from 'react'
import style from "../sass/mainsendemail.module.scss"
import {BiMailSend } from 'react-icons/bi'
import { TbPasswordUser } from "react-icons/tb";
import { IoIosHappy } from "react-icons/io";

function MainSendEmails() {
    
    const divsToRender = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className={style.container}>
        <div className={style.containerFilter}>
            <select >
                <option value="Choose Project">Choose Project</option>
                <option >test</option>
            </select>
            <select >
                <option value="Choose Project">Choose Project</option>
                <option >test</option>
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
            {divsToRender.map((item, index) => (
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
                                <span className={style.name}>Abdelkarim hajji</span>
                                <span className={style.specific}>Devlopement front-end</span>
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
                                <span className={style.desc}>Abdelkarim hajji Abdelkarim hajji
                                Abdelkarim hajji
                                Abdelkarim hajji Abdelkarim hajji Abdelkarim hajji
                                Abdelkarim hajji Abdelkarim hajji Abdelkarim hajji
                                Abdelkarim hajji Abdelkarim hajji Abdelkarim hajji
                                </span>
                            </div>
                        {/* finish make part to have desc user */}
                    </div>
                    {/* finish make bottom part of boxUser profile */}
                </div>
                ))}
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
                                <div className={style.boxExample}>
                                    <div className={style.containerIcon}>
                                        <IoIosHappy className={style.icon}/>
                                    </div>
                                    <div className={style.containerType}>
                                        <p>Welcome</p>
                                    </div>
                                </div>
                                {/* finish box examples */}

                                 {/* start box exmaples */}
                                 <div className={style.boxExample}>
                                    <div className={style.containerIcon}>
                                        <TbPasswordUser className={style.icon}/>
                                    </div>
                                    <div className={style.containerType}>
                                        <p>Send Password</p>
                                    </div>
                                </div>
                                {/* finish box examples */}


                                 {/* start box exmaples */}
                                 <div className={style.boxExample}>
                                    <div className={style.containerIcon}>
                                        <TbPasswordUser className={style.icon}/>
                                    </div>
                                    <div className={style.containerType}>
                                        <p>Send Password</p>
                                    </div>
                                </div>
                                {/* finish box examples */}

                            </div>
                        </div>
                    {/* finish container title of message */}
                    {/* start container message */}
                    <div className={style.messageForm}>
                        <div className={style.title}>
                            <textarea defaultValue="Send Password" type='text'/>
                        </div>
                        <div className={style.discreption}>
                            <textarea  placeholder=''defaultValue='Send Password idididi dididid dididid iodidid ididi diodidid  ididod idii ' type='text'/>
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
  )
}

export default MainSendEmails
