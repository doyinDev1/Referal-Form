import React from 'react'
import classes from './Refer.module.css'
import FormBottom from '../../components/FormBottom'
import FormComponent2 from './FormComponent2'
const Refer = () => {
  return (
    <div>
        <>
            <div className={classes.LoginTop}>
                <img
                    className={classes.img}
                    src="https://res.cloudinary.com/naijakids/image/upload/v1654116077/access_350px_1_cio7jy.jpg"
                    alt="assessify"
                />
            </div>

            <div className={classes.LoginDetail}>
                <h1>Access Bank Internal Referral form</h1>
            </div>
            <div className={classes.LoginDetails}>
                <h3>Please complete all the details on the form below and submit</h3>
            </div>
            <div className={classes.LoginWrap}>

                <div className={classes.LoginFormCard}>
                    <FormComponent2 />
                </div>
                <FormBottom />
            </div>
        </>
    </div>
  )
}

export default Refer