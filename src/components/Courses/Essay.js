import React, { useState } from 'react'
import './Courses.css'
import ApiService from '../../ApiService'

function Essay(props) {
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [essay, setEssay] = useState(props.location.state && props.location.state.essays ? props.location.state.essays : null)

  function handleGoBack() {
    props.history.push(`/courses/${props.match.params.courseid}`)
  }

  function handleEdit(e) {
    setEditing(true)
  }

  function handleDelete() {
    ApiService.deleteEssay(props.match.params.id)
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
    ApiService.updateEssay(props.match.params.id, title, content)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const essay = await response.json()
        setEditing(false)
        setEssay(essay)
      })
      .catch(error => setError(error.message))
  }

  if (!essay) {
    ApiService.getEssay(props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const essay = await response.json()
        if (!essay) {
          throw new Error('No such essay exists. Please go back to the course page and try again')
        }
        setEssay(essay)
      })
      .catch(error => setError(error.message))
  }

  if (!essay || error) {
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
          <input name='title' id='title' defaultValue={essay.title} />
          <label htmlFor='content'>Content:</label>
          <textarea name='content' id='content' defaultValue={essay.content} rows='20' />
          <div>
            <button onClick={() => setEditing(false)}>Cancel</button>
            <input type='submit' value='Update' />
          </div>
        </form> : void 0}
      {!editing ? <h2>{essay.title}</h2> : void 0}
      {!editing ? <p>{essay.content}</p> : void 0}
      {!editing ? <button onClick={handleEdit}>Edit Essay</button> : void 0}
      {!editing ? <button onClick={handleDelete}>Delete Essay</button> : void 0}
    </section>
  )

}

export default Essay