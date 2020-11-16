import React, { useState } from 'react'
import ApiService from '../../services/ApiService'
import { Link } from 'react-router-dom'

function NoteOrEssay(props) {
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [resource, setResource] = useState(props.location.state && props.location.state[props.type] ? props.location.state[props.type] : null)
  const resourceCapitalized = props.type.charAt(0).toUpperCase() + props.type.substr(1)

  function handleGoBack() {
    props.history.push(`/courses/${props.match.params.courseid}/${props.type + 's'}`)
  }

  function handleEdit(e) {
    setEditing(true)
    setError(null)
  }

  function handleCancel() {
    setEditing(false)
    setError(null)
  }

  function handleDelete() {
    ApiService['delete' + resourceCapitalized](props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        handleGoBack()
      })
      .catch(error => setError(error.message))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = e.target['title'].value
    const content = e.target['content'].value
    if (title.trim() === '') {
      return setError('Title cannot be blank')
    }
    if (content.trim() === '') {
      return setError('Content cannot be blank')
    }
    ApiService['update' + resourceCapitalized](props.match.params.id, title, content)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const resource = await response.json()
        setEditing(false)
        setResource(resource)
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
    <section>
      <button onClick={handleGoBack}>&#8592; Course</button>
      {editing &&
        <form className='flex-column' onSubmit={handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input name='title' id='title' defaultValue={resource.title} />
          <label htmlFor='content'>Content:</label>
          <textarea name='content' id='content' defaultValue={resource.content} rows={props.type === 'note' ? 10 : 20} />
          <div>
            <button onClick={handleCancel}>Cancel</button>
            <input type='submit' value='Update' />
          </div>
        </form>}
      {!editing && !!resource && <h2>{resource.title}</h2>}
      {!editing && !!resource && <>{resource.content.split('\n').map((p, index) => <p key={index}>{p}</p>)}</>}
      {!editing && !!resource && <button onClick={handleEdit}>Edit {resourceCapitalized}</button>}
      {!editing && !!resource && <button onClick={handleDelete}>Delete {resourceCapitalized}</button>}
    </section>
  )

}

export default NoteOrEssay