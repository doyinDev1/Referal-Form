import React from 'react'
import FormBottom from './FormBottom'
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
                <h2>Access Bank Graduate Placement Scheme Application Form</h2>
            </div>
            <div className={classes.LoginDetails}>

<p>Plese Complete all the details on the form below and submit</p>
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
