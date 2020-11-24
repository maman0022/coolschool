import React, { useState } from 'react'
import ApiService from '../../services/ApiService'
import PropTypes from 'prop-types'

function AddCourse(props) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleAddCourse(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const title = e.target['course-name'].value
    if (title.trim() === '') {
      return setError('Title cannot be blank')
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
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))
  }

  function handleCancel() {
    props.setAdding(false)
    setError(null)
    setLoading(false)
  }

  function validateCourse(e) {
    if (e.currentTarget.value.trim() === "") {
      return setError(`Title cannot be empty`)
    }
    setError(null)
  }

  return (
    <form className='flex-column add-form full-width' onSubmit={handleAddCourse}>
      <label htmlFor='course-name'>Title:</label>
      <input type='text' name='course-name' id='course-name' onChange={validateCourse} required />
      {!!error && <h5 className='error-message form-error'>{error}</h5>}
      {loading && !error && <h3 className='loading-message'>Loading</h3>}
      <div className='flex-row justify-end'>
        <input type='reset' value='Cancel' onClick={handleCancel} className='add-resource-btn' />
        <input type='submit' value='Add' className='add-resource-btn' disabled={error} />
      </div>
    </form>
  )
}

AddCourse.defaultProps = {
  addCourse() { },
  setAdding() { },
  setError() { }
}

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
  setAdding: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default AddCourse