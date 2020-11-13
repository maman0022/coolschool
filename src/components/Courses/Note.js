import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function Note(props) {
  const [error, setError] = useState(null)
  const [note, setNote] = useState(null)
  props.location.state && props.location.state.notes ? setNote(props.location.state.notes) : setNote(null)


  if (!note) {
    ApiService.getNote(props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        setNote(await response.json())
      })
      .catch(error => setError(error.message))
  }

  if (!note || error) {
    return (
      <>
        {error ? <h5>{error}</h5> : void 0}
        <h5>No such note exists. Please go back to the course page and try again</h5>
      </>
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