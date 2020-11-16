import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <section className='flex-column full-height justify-evenly'>
      <h2 id='lp-header'>
        Welcome to CoolSchool
      </h2>
      <p className='lp-paragraph'>This is an awesome app that lets you organize all the courses you are taking in one place.</p>
      <p className='lp-paragraph'>You can create notes and write essays right within the app.</p>
      <p className='lp-paragraph'>Everything you create is time-stamped so you can easily find exactly what you are looking for.</p>
      <p className='lp-paragraph'>So create an account and try how easy it is ace your courses.</p>
      <p className='lp-paragraph'>For a demo of how this app works, click <Link to='/demo'>here</Link>.</p>
    </section>
  )
}

export default LandingPage