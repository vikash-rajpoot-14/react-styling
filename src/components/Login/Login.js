import React, {  useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{
   if(action.type ==="email_input"){
    return {value : action.val , isValid : action.val.includes("@")}
   }
   if(action.type ==="email_valid"){
    return {value : state.value, isValid : state.value.includes("@")}
   }
}

const passwordReducer = (state, action) =>{
  if(action.type ==="password_input"){
    return {value : action.val , isValid : action.val.length>6}
   }
   if(action.type ==="password_valid"){
    return {value : state.value, isValid : state.value.length>6}
   }
}
const collegeReducer = (state, action) =>{
  if(action.type ==="college_input"){
    return {value : action.val }
   }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail] = useReducer(emailReducer, {value : "", isValid: null})
  const [passwordState,dispatchpassword] = useReducer(passwordReducer, {value : "", isValid: null})
  const [collegeState,dispatchcollege] = useReducer(collegeReducer, {value : ""})



  const emailChangeHandler = (event) => {
    console.log("emailchange")
    dispatchEmail({type : "email_input", val : event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({type : "password_input", val : event.target.value});

  };
  const collegeChangeHandler = (event) => {
    dispatchcollege({type : "college_input", val : event.target.value});
  }

  const validateEmailHandler = () => {
    dispatchEmail({type : "email_valid"});
  };

  const validatePasswordHandler = () => {
    dispatchpassword({type : "password_valid"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState, passwordState,collegeState);
  };

  useEffect(()=>{

    setFormIsValid(
      passwordState.value.trim().length > 6 && emailState.value.includes('@') && collegeState.value.trim().length>3
    );
  },[passwordState.value,emailState.value,collegeState.value])

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="college"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            // onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
