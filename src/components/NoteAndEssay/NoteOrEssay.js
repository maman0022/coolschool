import React, { useState } from 'react'
import ApiService from '../../services/ApiService'
import { Link } from 'react-router-dom'
import EditNoteOrEssay from './EditNoteOrEssay'

function NoteOrEssay(props) {
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [resource, setResource] = useState(props.location.state && props.location.state[props.type] ? props.location.state[props.type] : null)
  const resourceCapitalized = props.type.charAt(0).toUpperCase() + props.type.substr(1)

  function handleEdit() {
    setEditing(true)
    setError(null)
  }

  function handleDelete() {
    ApiService['delete' + resourceCapitalized](props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        props.history.push(`/courses/${props.match.params.courseid}/${props.type + 's'}`)
      })
      .catch(error => setError(error.message))
  }

  if (!resource) {
    ApiService['get' + resourceCapitalized](props.match.params.id, props.match.params.courseid)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        if (response.status === 204) {
          throw new Error(`No such ${props.type.replace(/s$/, '')} exists. Please go back to the courses page and try again`)
        }
        const noteOrEssay = await response.json() || null
        setResource(noteOrEssay)
      })
      .catch(error => setError(error.message))
  }

  if (!resource || error) {
    return (
      <section>
        {!!error && <h5 className='error-message'>{error}</h5>}
        <Link to='/courses'>Go Back</Link>
      </section>
    )
  }

  return (
    <section className='flex-column align-center'>
      <nav className='full-width flex-row justify-evenly flex-wrap'>
        <Link className='nav-link' id='back-to-course' to={`/courses/${props.match.params.courseid}/${props.type + 's'}`}>&#8592;Go Back to Course</Link>
      </nav>
      {editing && <EditNoteOrEssay resource={resource} id={props.match.params.id} capitalized={resourceCapitalized} setEditing={setEditing} setError={setError} setResource={setResource} type={props.type} />}
      {!editing && !!resource && <h2 id='resource-header'>{resource.title}</h2>}
      {!editing && !!resource && <>{resource.content.split('\n').map((p, index) => <p className='resource-content-p' key={index}>{p}</p>)}</>}
      <div className='flex-row justify-around full-width'>
        {!editing && !!resource && <button onClick={handleDelete}>Delete {resourceCapitalized}</button>}
        {!editing && !!resource && <button onClick={handleEdit}>Edit {resourceCapitalized}</button>}
      </div>
    </section>
  )
}

NoteOrEssay.defaultProps = {
  match: {
    params: {
      id: 1,
      courseid: 1
    }
  },
  location: {
    state: {}
  },
  type: 'note'
}

export default NoteOrEssay