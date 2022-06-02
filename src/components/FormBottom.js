import React from 'react'
import classes from './LoginForm.module.css'

const FormBottom = () => {
    return (
        <>

<div className={classes.LoginTop2}>
                <img
                    className={classes.img2}
                    src="https://res.cloudinary.com/naijakids/image/upload/v1654116083/Access_Test_Assessify_1_kyrhrv.png"
                    alt="assessify"
                />
            </div>
        <div>
            <p style={{textAlign: 'center', color: 'gray', paddingTop: "20px"}}>
                Please add ayo@testassessify.com as a contact in your email address book to ensure that messages about your application do not end up in your SPAM box.</p>
        </div>
        
        </>
    )
}

export default FormBottom
