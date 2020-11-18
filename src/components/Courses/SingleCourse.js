import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ApiService from '../../services/ApiService'
import AddNoteOrEssay from '../NoteAndEssay/AddNoteOrEssay'

function SingleCourse(props) {
  const [course, setCourse] = useState({ notes: [], essays: [], course: {} })
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(false)
  const timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const resourceCapitalized = props.type.charAt(0).toUpperCase() + props.type.substr(1).replace(/s$/, '')

  function handleAddResource() {
    setAdding(true)
    setError(null)
  }

  function addResource(resource, type) {
    const newArray = [...course[type], resource]
    setCourse({ ...course, [type]: newArray })
  }

  useEffect(() => {
    ApiService.getCourse(props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const { notes, essays, course } = await response.json()
        setCourse({ notes, essays, course })
      })
      .catch(error => setError(error.message))
  }, [])

  return (
    <section className='flex-column align-center'>
      <h2 className='signin-header' style={{ color: course.course.color }}>{course.course.title}</h2>
      <nav className='full-width flex-row justify-evenly flex-wrap'>
        <Link to='/courses' id='back-to-courses' className='nav-link'>&#8592; Go Back to Courses</Link>
        <NavLink className='resource-link' exact to={`/courses/${props.match.params.id}/notes`} activeStyle={{ color: '#E60000' }}>Notes</NavLink>
        <NavLink className='resource-link' exact to={`/courses/${props.match.params.id}/essays`} activeStyle={{ color: '#E60000' }}>Essays</NavLink>
      </nav>
      {!!error && <h5 className='error-message'>{error}</h5>}
      {!adding && course[props.type].length === 0 && <p className='resource-content-p instructions'>You don't have any {props.type}. Click "Add {resourceCapitalized}" to begin.</p>}
      {(course[props.type].length > 0 || adding) && <ul>
        {course[props.type].map(resource => (
          <li key={resource.id} className='resource'><Link
            to={{
              pathname: `/courses/${props.match.params.id}/${props.type}/${resource.id}`,
              state: { [props.type.replace(/s$/, '')]: resource }
            }}>
            {resource.title}
          </Link> - {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(resource.date_created))}</li>
        ))}
      </ul>}
      {adding && <AddNoteOrEssay setAdding={setAdding} setError={setError} type={props.type} courseId={props.match.params.id} addResource={addResource} />}
      {!adding && <button onClick={handleAddResource}>Add {resourceCapitalized}</button>}
    </section>
  )
}

export default SingleCourse