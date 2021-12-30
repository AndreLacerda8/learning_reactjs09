import { useState } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  const enteredEmailIsValid = enteredEmail.match(/\S+@\S+\.\S+/)
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  let formIsValid = false

  if(enteredNameIsValid && enteredEmailIsValid){
    formIsValid = true
  }

  function nameInputChangeHandler(event){
    setEnteredName(event.target.value)
  }

  function nameInputBlurHandler(event){
    setEnteredNameTouched(true)
  }

  function emailInputChangeHandler(event){
    setEnteredEmail(event.target.value)
  }

  function emailInputBlurHandler(event){
    setEnteredEmailTouched(true)
  }

  function formSubmissionHandler(event){
    event.preventDefault()
    setEnteredNameTouched(true)
    setEnteredEmailTouched(true)
    if(!enteredNameIsValid || !enteredEmailIsValid){
      return
    }
    setEnteredName('')
    setEnteredNameTouched(false)
    setEnteredEmail('')
    setEnteredEmailTouched(false)
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid': 'form-control'
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid': 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && <p className='error-text'>Please enter a valid email.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
