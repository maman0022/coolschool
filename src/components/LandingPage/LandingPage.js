import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <section className='flex-column full-height justify-evenly align-center'>
      <h2>
        Welcome to CoolSchool
      </h2>
      <p>This is an awesome app that lets you organize all the courses you are taking in one place.</p>
      <p>You can create notes and write essays right within the app.</p>
      <p>Everything you create is timestamped so you can easily find exactly what you are looking for.</p>
      <p>So create an account and try how easy it is ace your courses.</p>
      <Link to='/register' id='get-started-link'>Get Started!!!</Link>
    </section>
  )
}

export default LandingPage