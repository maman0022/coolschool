import React from 'react'
import TokenService from '../../TokenService'
import { Route } from 'react-router-dom'
import Courses from '../Courses/Courses'

function ProtectedRoute(props) {
  if (TokenService.verifyToken()) {
    return (
      <Route path={props.path} component={Courses} />
    )
  }
  return (
    <Route {...props} />
  )
}

export default ProtectedRoute