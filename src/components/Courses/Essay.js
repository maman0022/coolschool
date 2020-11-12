import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function Essay(props) {

  const essay = props.sharedState.essays.find(essay => essay.id === Number(props.match.params.id))

  if(!essay){
    return (
      <h5>No such essay exists. Please go back to the course page and try again</h5>
    )
  }

  return (
    <>
      <h2>{essay.title}</h2>
      <p>{essay.content}</p>
      <button>Edit essay</button>
      <button>Delete essay</button>
    </>
  )
}

export default Essay