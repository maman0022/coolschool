import './App.css'
import '../flex.css'
import { Route, Switch } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LandingPage from '../components/LandingPage/LandingPage'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import PublicOrPrivateRoute from '../components/PublicOrPrivateRoute/PublicOrPrivateRoute'
import CourseRouter from '../components/Courses/CourseRouter'

function App() {
  return (
    <>
      <Route path='/' component={Header} />
      <main>
        <Switch>
          <PublicOrPrivateRoute exact path='/' component={LandingPage} />
          <PublicOrPrivateRoute exact path='/register' component={Register} />
          <PublicOrPrivateRoute exact path='/login' component={Login} />
          <ProtectedRoute path='/courses' component={CourseRouter} />
        </Switch>
      </main>
      <Switch>
        <Footer exact path={['/', '/register', '/login']} />
      </Switch>
    </>
  )
}

export default App