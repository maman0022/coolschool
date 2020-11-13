import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import ApiService from '../../ApiService'
import AddCourse from './AddCourse'
import { SharedContext } from './CourseRouter'

function Courses(props) {
  const context = useContext(SharedContext)
  const [courses, setCourses] = useState(context.courses)
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(false)

  function addCourse(course) {
    setCourses([...courses, course])
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

  useEffect(() => {
    ApiService.getCourses()
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const courses = await response.json()
        context.courses = courses
        setCourses(courses)
      })
      .catch(error => setError(error.message))
  }, [])

  return (
    <section id='courses-section'>
      <h2>{`Hi ${context.user.first_name},`}</h2>
      <h3>Here are your Courses</h3>
      {error ? <h5>{error}</h5> : void 0}
      <ul id='courses-list'>
        {courses.map(course => (
          <li key={course.id} className='flex-row justify-between course'>
            <Link to={`/courses/${course.id}`}>
              {course.title}
            </Link>
            <button data-id={course.id} onClick={handleDeleteCourse}>Delete</button>
          </li>
        ))}
      </ul>
      {adding ? <AddCourse setAdding={setAdding} setError={setError} addCourse={addCourse} /> : void 0}
      {!adding && <button onClick={() => setAdding(true)}>Add Course</button>}
    </section>
  )
}

export default Courses