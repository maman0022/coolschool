import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ApiService from '../../services/ApiService'
import AddNoteOrEssay from './AddNoteOrEssay'

function SingleCourse(props) {
  const [notesAndEssays, setNotesAndEssays] = useState({ notes: [], essays: [] })
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(false)
  const timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const resourceCapitalized = props.type.charAt(0).toUpperCase() + props.type.substr(1).replace(/s$/, '')

  function handleGoBack() {
    props.history.push('/courses')
  }

  function handleAddResource() {
    setAdding(true)
    setError(null)
  }

  function addResource(resource, type) {
    const newArray = [...notesAndEssays[type], resource]
    setNotesAndEssays({ ...notesAndEssays, [type]: newArray })
  }

  useEffect(() => {
    ApiService.getCourse(props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const { notes, essays } = await response.json()
        setNotesAndEssays({ notes, essays })
      })
      .catch(error => setError(error.message))
  }, [])

  return (
    <section>
      <nav className='full-width flex-row justify-evenly'>
        <Link to='/courses'>&#8592; Courses</Link>
        <NavLink exact to={`/courses/${props.match.params.id}/notes`} activeStyle={{ color: 'red' }}>Notes</NavLink>
        <NavLink exact to={`/courses/${props.match.params.id}/essays`} activeStyle={{ color: 'red' }}>Essays</NavLink>
      </nav>
      {!!error && <h5 className='error-message'>{error}</h5>}
      {!adding && notesAndEssays[props.type].length === 0 && <p>You don't have any {props.type}. Click "Add {resourceCapitalized}" to begin.</p>}
      <ul>
        {notesAndEssays[props.type].map(resource => (
          <li key={resource.id}><Link
            to={{
              pathname: `/courses/${props.match.params.id}/${props.type}/${resource.id}`,
              state: { [props.type]: resource }
            }}>
            {resource.title}
          </Link> - {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(resource.date_created))}</li>
        ))}
      </ul>
      {adding && <AddNoteOrEssay setAdding={setAdding} setError={setError} type={props.type} courseId={props.match.params.id} addResource={addResource} />}
      {!adding && <button onClick={handleAddResource} id='add-resource'>Add {resourceCapitalized}</button>}
    </section>
  )
}

export default SingleCourse