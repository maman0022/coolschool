import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import ApiService from '../../ApiService'
import AddCourse from './AddCourse'

function Courses(props) {
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    ApiService.getCourses()
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        props.sharedState.setCourses(await response.json())
      })
      .catch(() => setError('Unable to retrieve courses'))
  }, [])

  return (
    <section id='courses-section'>
      <h2>{`Hi ${props.sharedState.user.first_name},`}</h2>
      <h3>Here are your Courses</h3>
      {error ? <h5>{error}</h5> : void 0}
      <ul>
        {props.sharedState.courses.map(course => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
      {adding ? <AddCourse setAdding={setAdding} setError={setError} addCourse={props.sharedState.addCourse}/> : void 0}
      {!adding && <button onClick={() => setAdding(true)}>Add Course</button>}
    </section>
  )
}

export default Courses