import React from 'react'
import RegistrationSuccess from '../pages/RegistrationSuccess'
import FormBottom from './FormBottom'
// import BasicForm from './BasicForm'
import FormComponent from './FormComponent'
import FormSuccess from './FormSuccess'
// import Form from './FormComponent'
import classes from './LoginForm.module.css'

const LoginForm = () => {
    return (
        <>
            <div className={classes.LoginTop}>
                <img
                    className={classes.img}
                    src="https://res.cloudinary.com/naijakids/image/upload/v1654116077/access_350px_1_cio7jy.jpg"
                    alt="assessify"
                />
            </div>

            <div className={classes.LoginDetail}>
                <h1>Access Bank Entry Level Training Program - Tech</h1>
            </div>
            <div className={classes.LoginDetails}>
                <h3>Please complete all the details on the form below and submit</h3>
            </div>
            <div className={classes.LoginWrap}>

                <div className={classes.LoginFormCard}>
                    <FormComponent />
                </div>
                <FormBottom />
            </div>
        </>
    )
}

export default LoginForm
