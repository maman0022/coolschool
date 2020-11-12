import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function Note(props) {
  return (
    <>
      <h2>{props.note.title}</h2>
      <p>{props.note.content}</p>
      <button>Edit Note</button>
      <button>Delete Note</button>
    </>
  )
}

export default Note