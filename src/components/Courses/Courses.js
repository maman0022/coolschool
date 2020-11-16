import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../services/ApiService'
import AddCourse from './AddCourse'
import UserService from '../../services/UserService'

function Courses(props) {
  const user = UserService.getUser()
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(false)

  function addCourse(course) {
    setCourses([...courses, course])
    setError(null)
  }

  function handleDeleteCourse(e) {
    const id = e.currentTarget.dataset.id
    if (!Number(id)) {
      return setError('Unable to determine course ID')
    }
    ApiService.deleteCourse(Number(id))
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        setCourses(courses.filter(course => course.id !== Number(id)))
      })
      .catch(error => setError(error.message))
  }

  function handleAddCourse() {
    setAdding(true)
    setError(null)
  }

  function handleUpdateCourse(e) {
    const color = e.currentTarget.value
    const id = Number(e.currentTarget.dataset.id)
    ApiService.updateCourse(id, color)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        let course = courses.find(course => course.id === id)
        course = { ...course, color }
        const index = courses.findIndex(course => course.id === id)
        const coursesCopy = [...courses]
        coursesCopy.splice(index, 1, course)
        setCourses(coursesCopy)
      })
      .catch(error => setError(error.message))
  }

  useEffect(() => {
    ApiService.getCourses()
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        setCourses(await response.json())
      })
      .catch(error => setError(error.message))
  }, [])

  return (
    <section id='courses-section'>
      <h2>{`Hi ${user.first_name},`}</h2>
      <h3>Here are your Courses</h3>
      {error && <h5 className='error-message'>{error}</h5>}
      {courses.length === 0 && <p>You don't have any courses. Click "Add Course" to begin.</p>}
      <ul id='courses-list'>
        {courses.map(course => (
          <li key={course.id} className='flex-row justify-between align-center course' style={{ backgroundColor: course.color }}>
            <Link to={`/courses/${course.id}/notes`}>
              {course.title}
            </Link>
            <button data-id={course.id} onClick={handleDeleteCourse}>Delete</button>
            <input data-id={course.id} type='color' onChange={handleUpdateCourse} defaultValue={course.color}></input>
          </li>
        ))}
      </ul>
      {adding && <AddCourse setAdding={setAdding} setError={setError} addCourse={addCourse} />}
      {!adding && <button onClick={handleAddCourse} className='add-course-btn'>Add Course</button>}
    </section>
  )
}

export default Courses