import React from 'react'
import style from "../sass/mainsendemail.module.scss"

function MainSendEmails() {
  return (
    <div className={style.container}>
        <div className={style.containerFilter}>

        </div>
        <div className={style.containerBox}>
            <div className={style.containerLeftBox}>
                <select >
                    <option value="Choose Project">Choose Project</option>
                    
                    <option >test</option>
                    
                </select>
            </div>
            <div className={style.containerRightBox}>

            </div>
        </div>
    </div>
  )
}

export default MainSendEmails