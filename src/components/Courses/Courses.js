import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import SharedContext from '../../SharedContext'

function Courses(props) {
  const [error, setError] = useState(null)

  useEffect(() => {
    ApiService.getCourses()
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        props.setCourses(await response.json())
      })
      .catch(error => setError(error.message))
  }, [])

  return (
    <SharedContext.Consumer>
      {
        ({ courses, user }) => (
          <section id='courses-section'>
            {!!user && <h2>{`Hi ${user.first_name},`}</h2>}
            <h3>Here are your Courses</h3>
            {error ? <h5>{error}</h5> : void 0}
            <ul>
              {!!courses&&courses.map(course => (
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
    </SharedContext.Consumer>
    /*  <section id='courses-section'>
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
     </section> */
  )
}

export default Courses