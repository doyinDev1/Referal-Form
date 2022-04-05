import React from 'react'
// import BasicForm from './BasicForm'
import FormComponent from './FormComponent'
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
                <h2>Create new candidate account</h2>
            </div>

            <div className={classes.LoginWrap}>

                <div className={classes.LoginFormCard}>
                    <FormComponent />
                </div>
                {/* <BasicForm/> */}
            </div>
        </>
    )
}

export default LoginForm
