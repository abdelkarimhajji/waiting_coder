import React from 'react'
import style from "../sass/mainsendemail.module.scss"
import {BiMailSend } from 'react-icons/bi'

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
            {divsToRender.map((item, index) => (
                <>
                {/* start make one box */}
                <div className={style.boxUser}>
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
                </>
                ))}
                {/* finish make one box */}
            </div>
            {/* finish left box */}

            {/* start right box */}
            <div className={style.containerRightBox}>

            </div>
            {/* finish right box */}
        </div>
        {/* finish all box */}
    </div>
  )
}

export default MainSendEmails
