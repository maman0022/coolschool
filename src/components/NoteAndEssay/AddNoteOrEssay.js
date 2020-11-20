import React, { useState } from 'react'
import ApiService from '../../services/ApiService'
import PropTypes from 'prop-types'

function AddNoteOrEssay(props) {
  const [titleError, setTitleError] = useState(null)
  const [contentError, setContentError] = useState(null)

  function handleAddSubmit(e) {
    e.preventDefault()
    if (props.type !== 'notes' && props.type !== 'essays') {
      return props.setError('Invalid resource type')
    }
    if (!Number(props.courseId)) {
      return props.setError('Course ID is required')
    }
    const title = e.target['resource-title'].value
    const content = e.target['resource-content'].value
    if (title.trim() === '') {
      return titleError('Title cannot be blank')
    }
    if (content.trim() === '') {
      return contentError('Content cannot be blank')
    }
    ApiService.addNoteOrEssay(title, content, Number(props.courseId), props.type)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const resource = await response.json()
        props.addResource(resource, props.type)
        props.setAdding(false)
      })
      .catch(error => props.setError(error.message))
  }

  function handleCancel() {
    props.setAdding(false)
    props.setError(null)
    setTitleError(null)
    setContentError(null)
  }

  function validateResource(e, type) {
    const error = type === 'Title' ? setTitleError : setContentError
    if (e.currentTarget.value.trim() === "") {
      return error(`${type} cannot be empty`)
    }
    error(null)
  }

  return (
    <form className='flex-column add-form' onSubmit={handleAddSubmit}>
      <label htmlFor='resource-title'>Title:</label>
      <input type='text' name='resource-title' id='resource-title' onChange={e => validateResource(e, 'Title')} required />
      {!!titleError && <h5 className='error-message form-error'>{titleError}</h5>}
      <label htmlFor='resource-content'>Content:</label>
      <textarea name='resource-content' id='resource-content' onChange={e => validateResource(e, 'Content')} rows={props.type === 'notes' ? 10 : 20} />
      {!!contentError && <h5 className='error-message form-error'>{contentError}</h5>}
      <div className='flex-row justify-end'>
        <input type='reset' value='Cancel' onClick={handleCancel} className='add-resource-btn' />
        <input type='submit' value='Add' className='add-resource-btn' disabled={titleError || contentError} />
      </div>
    </form>
  )
}

AddNoteOrEssay.defaultProps = {
  courseId: 1,
  type: 'notes',
  id: 1,
  setError() { },
  setAdding() { },
  addResource() { }
}

AddNoteOrEssay.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['notes', 'essays']).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setError: PropTypes.func.isRequired,
  setAdding: PropTypes.func.isRequired,
  addResource: PropTypes.func.isRequired
}

export default AddNoteOrEssay