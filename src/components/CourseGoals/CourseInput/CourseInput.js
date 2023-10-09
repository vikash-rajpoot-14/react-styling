import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true)

  const goalInputChangeHandler = event => {
    if(enteredValue.trim().length>0){
      setIsValid(!isValid)
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    console.log(event.target.value);
    if(enteredValue.trim().length===0){
      setIsValid(!isValid)
      return ;
    }
    event.preventDefault();
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label >Course Goal</label>
        <input s  type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button isValid={isValid} type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
