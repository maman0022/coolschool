import React from 'react'
import { Switch } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
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
        <ProtectedRoute exact path='/courses' render={(props) => <Courses {...props} />} />
        <ProtectedRoute exact path='/courses/:id' render={(props) => <SingleCourse {...props} />} />
        <ProtectedRoute exact path='/courses/:courseid/notes/:id' render={(props) => <Note {...props} />} />
        <ProtectedRoute exact path='/courses/:courseid/essays/:id' render={(props) => <Essay {...props} />} />
      </Switch>
    </SharedContext.Provider>
  )
}

export default CourseRouter