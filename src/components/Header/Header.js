import './Header.css'
import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/TokenService'

function Header(props) {
  function checkIfLoggedIn() {
    if (TokenService.verifyToken()) {
      return (
        <nav id='header-nav'>
          <Link to='' onClick={logout} className='nav-link'>Logout</Link>
        </nav>
      )
    }
    return (
      <nav id='header-nav'>
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
    <header className='flex-row align-center full-width flex-wrap'>
      <Link to='/' id='main-header'>
        <h1>CoolSchool</h1>
      </Link>
      {checkIfLoggedIn()}
    </header>
  )
}

export default Header