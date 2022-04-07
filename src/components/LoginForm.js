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
                    src="https://res.cloudinary.com/naijakids/image/upload/v1649074599/bbec50b9-6f88-45d4-97c5-9830f2709982_vw7mqg.png"
                    alt="assessify"
                />
            </div>

            <div className={classes.LoginDetail}>
                <h1>Access Bank Entry <br />Level Scheme</h1>
            </div>
            <div className={classes.LoginDetails}>

                <h2>Please Complete all the details on the form below and submit</h2>
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
