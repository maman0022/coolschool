import React, { useState } from 'react'
import ApiService from '../../services/ApiService'

function AddCourse(props) {
  const [titleError, setTitleError] = useState(null)

  function handleAddCourse(e) {
    e.preventDefault()
    const title = e.target['course-name'].value
    if (title.trim() === '') {
      return setTitleError('Title cannot be blank')
    }
    ApiService.addCourse(title)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const course = await response.json()
        props.addCourse(course)
        props.setAdding(false)
      })
      .catch(error => props.setError(error.message))
  }

  function handleCancel() {
    props.setAdding(false)
    props.setError(null)
    setTitleError(null)
  }

  function validateCourse(e) {
    if (e.currentTarget.value.trim() === "") {
      return setTitleError(`Title cannot be empty`)
    }
    setTitleError(null)
  }

  return (
    <form className='flex-column add-form full-width' onSubmit={handleAddCourse}>
      <label htmlFor='course-name'>Title:</label>
      <input type='text' name='course-name' id='course-name' onChange={validateCourse} required />
      {!!titleError && <h5 className='error-message form-error'>{titleError}</h5>}
      <div className='flex-row justify-end'>
        <input type='reset' value='Cancel' onClick={handleCancel} className='add-resource-btn' />
        <input type='submit' value='Add' className='add-resource-btn' disabled={titleError} />
      </div>
    </form>
  )
}

AddCourse.defaultProps = {
  addCourse() { },
  setAdding() { },
  setError() { }
}

export default AddCourse