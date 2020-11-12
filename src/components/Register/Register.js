import React, { useState } from 'react'
import './Register.css'
import ApiService from '../../ApiService'

function Register(props) {
  const [error, setError] = useState(null)
  const [fNameError, setFNameError] = useState()
  const [lNameError, setLNameError] = useState()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const [confirmError, setConfirmError] = useState()

  function handleFormSubmit(e) {
    e.preventDefault()
    const { fname, lname, email, password } = e.target
    const userData = {
      fname: fname.value, lname: lname.value, email: email.value, password: password.value
    }
    const headers = {
      'content-type': 'application/json'
    }
    ApiService.register({ method: 'POST', headers, body: JSON.stringify(userData) })
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        props.history.push('/login')
      })
      .catch(error => setError(error.message))
  }

  function validateFName(e) {
    if (e.currentTarget.value.trim() === '' || e.currentTarget.value.trim() !== e.currentTarget.value) {
      return setFNameError(`First name cannot be blank or contain leading or trailing spaces`)
    }
    setFNameError()
  }

  function validateLName(e) {
    if (e.currentTarget.value.trim() === '' || e.currentTarget.value.trim() !== e.currentTarget.value) {
      return setLNameError(`Last name cannot be blank or contain leading or trailing spaces`)
    }
    setLNameError()
  }

  function validateEmail(e) {
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.currentTarget.value)) {
      return setEmailError(`Invalid email format`)
    }
    setEmailError()
  }

  function validatePassword(e) {
    if (e.currentTarget.value.trim().length < 6 || e.currentTarget.value.trim().length > 72) {
      return setPasswordError('Password must be between 6 and 72 characters and cannot contain leading or trailing spaces')
    }
    setPasswordError()
  }

  function validateConfirm(e) {
    if (e.currentTarget.value !== document.getElementById('password').value) {
      return setConfirmError('Passwords do not match')
    }
    setConfirmError()
  }

  function checkAllAccurate() {
    return (fNameError || lNameError || emailError || passwordError || confirmError)
  }

  return (
    <section>
      <form className='flex-column' onSubmit={handleFormSubmit}>
        {error ? <h5>{error}</h5> : void 0}
        <div>
          <label htmlFor='fname'>First Name:</label>
          <input type='fname' id='fname' name='fname' required onChange={validateFName}></input>
          {<h5 className='validation-error'>{fNameError}</h5>}
        </div>
        <div>
          <label htmlFor='lname'>Last Name:</label>
          <input type='lname' id='lname' name='lname' required onChange={validateLName}></input>
          {<h5 className='validation-error'>{lNameError}</h5>}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required onChange={validateEmail}></input>
          {<h5 className='validation-error'>{emailError}</h5>}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required onChange={validatePassword}></input>
          {<h5 className='validation-error'>{passwordError}</h5>}
        </div>
        <div>
          <label htmlFor='confirm-password'>Confirm Password:</label>
          <input type='password' id='confirm-password' name='confirm-password' required onChange={validateConfirm}></input>
          {<h5 className='validation-error'>{confirmError}</h5>}
        </div>
        <input type='submit' value='Create Account' id='create-acc-btn' disabled={checkAllAccurate()}></input>
      </form>
    </section>
  )
}

export default Register