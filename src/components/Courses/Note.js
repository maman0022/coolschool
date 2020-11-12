import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function Note(props) {

  const note = props.sharedState.notes.find(note => note.id === Number(props.match.params.id))

  if(!note){
    return (
      <h5>No such note exists. Please go back to the course page and try again</h5>
    )
  }

  return (
    <>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button>Edit Note</button>
      <button>Delete Note</button>
    </>
  )
}

export default Note