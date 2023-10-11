import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import { useRef } from 'react';


const AddUser = (props) => {
  const inputnameref = useRef()
  const inputageref = useRef()
  const inputcollegeref = useRef()
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    let enteredUsername = inputnameref.current.value
    let enteredAge = inputageref.current.value
    let enteredcollege = inputcollegeref.current.value
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0||enteredcollege.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age oor college name(non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge,enteredcollege);
    inputnameref.current.value = "";
    inputageref.current.value = "";
    inputcollegeref.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={inputnameref}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={inputageref}
          />
          <label htmlFor="college">college name</label>
          <input
            id="college"
            type="text"
            ref={inputcollegeref}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
