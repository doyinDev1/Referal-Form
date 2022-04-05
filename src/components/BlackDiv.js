import React from 'react'
import classes from './BlackDiv.module.css'
const BlackDiv = ({text}) => {
  return (
    <div className={classes.Black}>
      <h3>{text}</h3>
    </div>
  )
}

export default BlackDiv
