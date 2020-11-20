import React, { useState } from 'react'
import ApiService from '../../services/ApiService'
import PropTypes from 'prop-types'

function EditNoteOrEssay(props) {
  const [titleError, setTitleError] = useState(null)
  const [contentError, setContentError] = useState(null)

  function handleEditCancel() {
    props.setEditing(false)
    props.setError(null)
    setTitleError(null)
    setContentError(null)
  }

  function handleEditSubmit(e) {
    e.preventDefault()
    const title = e.target['resource-title'].value
    const content = e.target['resource-content'].value
    if (title.trim() === '') {
      return setTitleError('Title cannot be empty')
    }
    if (content.trim() === '') {
      return setContentError('Content cannot be empty')
    }
    ApiService['update' + props.capitalized](props.id, title, content)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const resource = await response.json()
        props.setEditing(false)
        props.setResource(resource)
      })
      .catch(error => props.setError(error.message))
  }

  function validateResource(e, type) {
    const error = type === 'Title' ? setTitleError : setContentError
    if (e.currentTarget.value.trim() === "") {
      return error(`${type} cannot be empty`)
    }
    error(null)
  }

  return (
    <form className='flex-column full-width add-form' onSubmit={handleEditSubmit}>
      <label htmlFor='resource-title'>Title:</label>
      <input name='resource-title' id='resource-title' onChange={e => validateResource(e, 'Title')} defaultValue={props.resource.title} />
      {!!titleError && <h5 className='error-message form-error'>{titleError}</h5>}
      <label htmlFor='resource-content'>Content:</label>
      <textarea name='resource-content' id='resource-content' onChange={e => validateResource(e, 'Content')} defaultValue={props.resource.content} rows={props.type === 'note' ? 10 : 20} />
      {!!contentError && <h5 className='error-message form-error'>{contentError}</h5>}
      <div className='flex-row justify-end'>
        <input type='reset' value='Cancel' onClick={handleEditCancel} className='add-resource-btn' />
        <input type='submit' value='Update' className='add-resource-btn' disabled={titleError || contentError} />
      </div>
    </form>
  )
}

EditNoteOrEssay.defaultProps = {
  resource: {
    title: '',
    content: ''
  },
  type: 'notes',
  capitalized: '',
  id: 1,
  setError() { },
  setEditing() { }
}

EditNoteOrEssay.propTypes = {
  resource: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  type: PropTypes.oneOf(['notes', 'essays']).isRequired,
  capitalized: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setError: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired
}

export default EditNoteOrEssay