import React, { useState } from 'react'
import './Courses.css'
import ApiService from '../../services/ApiService'

function Note(props) {
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [note, setNote] = useState(props.location.state && props.location.state.notes ? props.location.state.notes : null)

  function handleGoBack() {
    props.history.push(`/courses/${props.match.params.courseid}`)
  }

  function handleEdit(e) {
    setEditing(true)
  }

  function handleDelete() {
    ApiService.deleteNote(props.match.params.id)
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
    ApiService.updateNote(props.match.params.id, title, content)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const note = await response.json()
        setEditing(false)
        setNote(note)
      })
      .catch(error => setError(error.message))
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
      </section>
    )
  }

  return (
    <section>
      <button onClick={handleGoBack}>&#8592; Course</button>
      {editing ?
        <form className='flex-column' onSubmit={handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input name='title' id='title' defaultValue={note.title} />
          <label htmlFor='content'>Content:</label>
          <textarea name='content' id='content' defaultValue={note.content} rows='10' />
          <div>
            <button onClick={() => setEditing(false)}>Cancel</button>
            <input type='submit' value='Update' />
          </div>
        </form> : void 0}
      {!editing ? <h2>{note.title}</h2> : void 0}
      {!editing ? <>{note.content.split('\n').map((p, index) => <p key={index}>{p}</p>)}</> : void 0}
      {!editing ? <button onClick={handleEdit}>Edit Note</button> : void 0}
      {!editing ? <button onClick={handleDelete}>Delete Note</button> : void 0}
    </section>
  )

}

export default Note