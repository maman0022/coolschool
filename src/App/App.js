import './App.css'
import '../flex.css'
import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import SharedContext from '../SharedContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LandingPage from '../components/LandingPage/LandingPage'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import Courses from '../components/Courses/Courses'
import SingleCourse from '../components/Courses/SingleCourse'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import PublicOrPrivateRoute from '../components/PublicOrPrivateRoute/PublicOrPrivateRoute'

function App() {
  return (
    <>
      <Route path='/' component={Header} />
      <main>
          <Switch>
            <PublicOrPrivateRoute exact path='/' component={LandingPage} />
            <PublicOrPrivateRoute exact path='/register' component={Register} />
            <PublicOrPrivateRoute exact path='/login' component={Login} />
            <ProtectedRoute exact path='/courses' component={Courses}/>
            <ProtectedRoute exact path='/courses/:id' component={SingleCourse}/>
            <ProtectedRoute exact path='/courses/add' component={Courses}/>
          </Switch>
      </main>
      <Footer />
    </>
  )
}

export default App