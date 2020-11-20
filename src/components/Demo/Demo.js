import React, { useState } from 'react'
import TokenService from '../../services/TokenService'
import ApiService from '../../services/ApiService'
import './Demo.css'
import PropTypes from 'prop-types'

function Demo(props) {
  const [error, setError] = useState(null)

  function handleFormSubmit(e) {
    e.preventDefault()
    const { email, password } = e.target
    const userData = {
      email: email.value, password: password.value
    }
    ApiService.login(userData)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        TokenService.saveToken((await response.json()).token)
        props.history.push('/courses')
      })
      .catch(error => setError(error.message))
  }

  return (
    <section className='flex-column align-center'>
      <h2 className='signin-header'>Demo</h2>
      <form className='flex-column align-center' onSubmit={handleFormSubmit}>
        {!!error && <h5 className='error-message'>{error}</h5>}
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' defaultValue='jd@123.com' required></input>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' defaultValue='password' required></input>
        </div>
        <input type='submit' value='Login'></input>
      </form>
      <p className='instructions'>The demo credentials have been pre-populated. Click login to start the demo.</p>
    </section>
  )
}

Demo.defaultProps = {
  history: {
    push() { }
  }
}

Demo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default Demo