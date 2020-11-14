import React from 'react'
import { Switch } from 'react-router-dom'
import './Courses.css'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import PublicOrPrivateRoute from '../PublicOrPrivateRoute/PublicOrPrivateRoute'
import Courses from './Courses'
import SingleCourse from './SingleCourse'
import NoteOrEssay from './NoteOrEssay'


function CourseRouter(props) {
  return (
      <Switch>
        <ProtectedRoute exact path='/courses' component={Courses} />
        <ProtectedRoute exact path='/courses/:id/notes' render={(props)=><SingleCourse {...props} type='notes'/>} />
        <ProtectedRoute exact path='/courses/:id/essays' render={(props)=><SingleCourse {...props} type='essays'/>}/>
        <ProtectedRoute exact path='/courses/:courseid/notes/:id' render={(props)=><NoteOrEssay {...props} type='note'/>} />
        <ProtectedRoute exact path='/courses/:courseid/essays/:id' render={(props)=><NoteOrEssay {...props} type='essay'/>} />
        <PublicOrPrivateRoute component={Courses} />
      </Switch>
  )
}

export default CourseRouter