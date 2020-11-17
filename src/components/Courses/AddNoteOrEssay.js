import React from 'react'
import ApiService from '../../services/ApiService'

function AddNoteOrEssay(props) {
  function handleAddNoteOrEssay(e) {
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
      return props.setError('Title cannot be blank')
    }
    if (content.trim() === '') {
      return props.setError('Content cannot be blank')
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
  }

  return (
    <form className='flex-column add-form' onSubmit={handleAddNoteOrEssay}>
      <label htmlFor='resource-title'>Title:</label>
      <input type='text' name='resource-title' id='resource-title' required></input>
      <label htmlFor='resource-content'>Content:</label>
      <textarea name='resource-content' id='resource-content' rows={props.type === 'notes' ? 10 : 20}></textarea>
      <div className='flex-row justify-end'>
        <button onClick={handleCancel} className='add-resource-btn'>Cancel</button>
        <input type='submit' value='Add' className='add-resource-btn'></input>
      </div>
    </form>
  )
}

export default AddNoteOrEssay