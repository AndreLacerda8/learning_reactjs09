import { useInput } from '../hooks/use-input'

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => value.match(/\S+@\S+\.\S+/)

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName
  } = useInput(isNotEmpty)

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName
  } = useInput(isNotEmpty)

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(isEmail)

  let formIsValid = false

  if(firstNameIsValid && lastNameIsValid && emailIsValid){
    formIsValid = true
  }

  function submitHandler(event){
    event.preventDefault()
    if(!formIsValid){
      return
    }
    resetFirstName()
    resetLastName()
    resetEmail()
  }

  const firstNameClasses = firstNameHasError ? 'form-control invalid': 'form-control'
  const lastNameClasses = lastNameHasError ? 'form-control invalid': 'form-control'
  const emailClasses = emailHasError ? 'form-control invalid': 'form-control'

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p>Please enter a first name</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
        </div>
        {lastNameHasError && <p>Please enter a last name</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='text'
          id='email'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p>Please enter a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
