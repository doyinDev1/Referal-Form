import React from 'react'
import classes from './FormSuccess.module.css'
import { BsCheckCircleFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'

const FormSuccess = () => {
  const navigate = useNavigate();

    
  const routeChange = () =>{ 
    // let path = `/`; 
    navigate(-1);
  }

  return (
    <div>
      <div className={classes.LoginTop}>
        <img
          className={classes.img}
          src="https://res.cloudinary.com/naijakids/image/upload/v1649074599/bbec50b9-6f88-45d4-97c5-9830f2709982_vw7mqg.png"
          alt="assessify"
        />
      </div>

      <div className={classes.CardCover}>

        <div className={classes.Card}>
          <div className={classes.SuccessDiv}>
            <BsCheckCircleFill style={{ fontSize: "100px", textAlign: 'center', color: '#87AA4B' }} />

          </div>
          <div className={classes.NoticeCover}>


          <div className={classes.Notice}>
            <p>Application Submitted Successfully!</p>
            
          </div>
          <div className={classes.Back} style={{cursor: "pointer"}}  onClick={routeChange}>
        <div className={classes.Notice2}>
            <p>Go Back</p>
          </div>
        </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FormSuccess
