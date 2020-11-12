import React, { useEffect, useState } from 'react'
import { Link, Switch } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Courses from './Courses'
import SingleCourse from './SingleCourse'
import Note from './Note'
import Essay from './Essay'
import SharedContext from '../../SharedContext'

function CourseRouter(props) {
  const user = UserService.getUser()

  const initialState = {
    user,
    courses: [],
    notes: [],
    essays: []
  }

  function setCourses(courses) {
    setSharedState({ ...sharedState, courses })
  }

  const [sharedState, setSharedState] = useState({ initialState })

  const context = {
    user: sharedState.user,
    courses: sharedState.courses,
    notes: sharedState.notes,
    essays: sharedState.essays
  }

  return (
    <SharedContext.Provider value={context}>
      <Switch>
        <ProtectedRoute exact path='' component={Courses} setCourses={setCourses}/>
        {/* <ProtectedRoute exact path='/:id' component={SingleCourse} /> */}
        <ProtectedRoute exact path='/notes/:id' component={Note} />
        <ProtectedRoute exact path='/essays/:id' component={Essay} />
      </Switch>
    </SharedContext.Provider>
  )
}

export default CourseRouter