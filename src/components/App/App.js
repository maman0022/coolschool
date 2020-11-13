import './App.css'
import './flex.css'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import LandingPage from '../LandingPage/LandingPage'
import Register from '../Register/Register'
import Login from '../Login/Login'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import PublicOrPrivateRoute from '../PublicOrPrivateRoute/PublicOrPrivateRoute'
import CourseRouter from '../Courses/CourseRouter'
import NotFound from '../NotFound/NotFound'

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
          <PublicOrPrivateRoute component={NotFound} />
        </Switch>
      </main>
      <Switch>
        <Footer exact path={['/', '/register', '/login']} />
      </Switch>
    </>
  )
}

export default App