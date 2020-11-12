import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function Courses(props) {
  const user = UserService.getUser()
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState([])

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
      {error ? <h5>{error}</h5> : void 0}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to='/courses/add'>Add Course</Link>
    </section>
  )
}

export default Courses