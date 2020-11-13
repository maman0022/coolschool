import React from 'react'
import { Switch } from 'react-router-dom'
import './Courses.css'
import UserService from '../../services/UserService'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Courses from './Courses'
import SingleCourse from './SingleCourse'
import Note from './Note'
import Essay from './Essay'

export const SharedContext = React.createContext()

function CourseRouter(props) {
  const user = UserService.getUser()

  const initialState = {
    user,
    courses: [],
    notes: [],
    essays: []
  }

  return (
    <SharedContext.Provider value={initialState}>
      <Switch>
        <ProtectedRoute exact path='/courses' component={Courses} />
        <ProtectedRoute exact path='/courses/:id' component={SingleCourse} />
        <ProtectedRoute exact path='/courses/:courseid/notes/:id' component={Note} />
        <ProtectedRoute exact path='/courses/:courseid/essays/:id' component={Essay} />
      </Switch>
    </SharedContext.Provider>
  )
}

export default CourseRouter