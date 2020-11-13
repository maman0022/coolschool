import './Header.css'
import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/TokenService'

function Header(props) {
  function checkIfLoggedIn() {
    if (TokenService.verifyToken()) {
      return (
        <nav>
          <button onClick={logout}>Logout</button>
        </nav>
      )
    }
    return (
      <nav>
        <Link to='/login' className='nav-link'>Login</Link>
        <Link to='/register' className='nav-link'>Register</Link>
      </nav>
    )
  }

  function logout(){
    TokenService.clearToken()
    props.history.push('/')
  }

  return (
    <header className='flex-row justify-between align-center full-width'>
      <Link to='/' id='main-header'>
        <h1>CoolSchool</h1>
      </Link>
      {checkIfLoggedIn()}
    </header>
  )
}

export default Header