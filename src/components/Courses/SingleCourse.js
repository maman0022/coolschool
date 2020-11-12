import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import UserService from '../../UserService'
import ApiService from '../../ApiService'
import Note from './Note'

function SingleCourse(props) {
  const defaultState ={
    currentView: 'notes',
    notes: [],
    essays: []
  }
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState('notes')
  const [notesAndEssays, setNotesAndEssays] = useState({})
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
        setNotesAndEssays(await response.json())
      })
      .catch(() => setError('Unable to retrieve course'))
  }, [])

  return (
    <section>
      <nav className='full-width flex-row justify-evenly'>
        <button onClick={handleView}>Notes</button>
        <button onClick={handleView}>Essays</button>
      </nav>
      {error ? <h5>{error}</h5> : void 0}
      <ul>
        {!!notesAndEssays[currentView] && notesAndEssays[currentView].map(resource => (
          <li key={resource.id}><Link to='notes' note={resource}> 
            {resource.title}
          </Link> - {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(resource.date_created))}</li>
        ))}
      </ul>
    </section>
  )
}

export default SingleCourse