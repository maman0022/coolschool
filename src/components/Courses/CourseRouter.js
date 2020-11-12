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

function CourseRouter(props) {
  const user = UserService.getUser()

  function setCourses(courses) {
    setSharedState({ ...sharedState, courses })
  }

  function setNotesAndEssays(notes, essays) {
    setSharedState({ ...sharedState, notes, essays })
  }

  function addCourse(course) {
    const courses = [...sharedState.courses, course]
    console.log(sharedState);
    /* setSharedState({ ...sharedState, courses: [] }) */
  }

  const initialState = {
    user,
    courses: [],
    notes: [],
    essays: [],
    setCourses,
    setNotesAndEssays,
    addCourse
  }

  const [sharedState, setSharedState] = useState(initialState)

  return (
    <Switch>
      <ProtectedRoute exact path='/courses' render={(props) => <Courses {...props} sharedState={sharedState} />} />
      <ProtectedRoute exact path='/courses/:id' render={(props) => <SingleCourse {...props} sharedState={sharedState} />} />
      <ProtectedRoute exact path='/courses/:courseid/notes/:id' render={(props) => <Note {...props} sharedState={sharedState} />} />
      <ProtectedRoute exact path='/courses/:courseid/essays/:id' render={(props) => <Essay {...props} sharedState={sharedState} />} />
    </Switch>
  )
}

export default CourseRouter