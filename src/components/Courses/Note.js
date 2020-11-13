import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function Note(props) {
  const [error, setError] = useState(null)
  const [note, setNote] = useState(props.location.state && props.location.state.notes ? props.location.state.notes : null)

  function handleGoBack() {
    props.history.push(`/courses/${props.match.params.courseid}`)
  }

  if (!note) {
    ApiService.getNote(props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const note = await response.json()
        if (!note) {
          throw new Error('No such note exists. Please go back to the course page and try again')
        }
        setNote(note)
      })
      .catch(error => setError(error.message))
  }

  if (!note || error) {
    return (
      <section>
        {error ? <h5>{error}</h5> : void 0}
        <h5>No such note exists. Please go back to the course page and try again</h5>
      </section>
    )
  }

  return (
    <section>
      <button onClick={handleGoBack}>&#8592; Course</button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button>Edit Note</button>
      <button>Delete Note</button>
    </section>
  )

}

export default Note