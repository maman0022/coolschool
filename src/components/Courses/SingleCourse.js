import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'

function SingleCourse(props) {

  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState('notes')
  const timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  function handleView(e) {
    setCurrentView(e.currentTarget.innerHTML.toLowerCase())
  }

  useEffect(() => {
    ApiService.getCourse(props.match.params.id)
      .then(async response => {
        if (!response.ok) {
          throw new Error((await response.json()).message)
        }
        const {notes, essays} = await response.json()
        props.sharedState.setNotesAndEssays(notes, essays)
      })
      .catch(error=>setError(error.message))
  }, [])

  return (
    <section>
      <nav className='full-width flex-row justify-evenly'>
        <button onClick={handleView}>Notes</button>
        <button onClick={handleView}>Essays</button>
      </nav>
      {error ? <h5>{error}</h5> : void 0}
      <ul>
        {!!props.sharedState[currentView] && props.sharedState[currentView].map(resource => (
          <li key={resource.id}><Link to={`/courses/${props.match.params.id}/${currentView}/${resource.id}`} note={resource}>
            {resource.title}
          </Link> - {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(resource.date_created))}</li>
        ))}
      </ul>
    </section>
  )
}

export default SingleCourse