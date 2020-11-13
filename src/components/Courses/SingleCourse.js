import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Courses.css'
import ApiService from '../../services/ApiService'
import AddNoteOrEssay from './AddNoteOrEssay'

function SingleCourse(props) {
  const [notesAndEssays, setNotesAndEssays] = useState({ notes: [], essays: [] })
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState('notes')
  const [adding, setAdding] = useState(false)
  const timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  function handleChangeView(e) {
    setCurrentView(e.currentTarget.innerHTML.toLowerCase())
  }

  function handleGoBack() {
    props.history.push('/courses')
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
        <button onClick={handleGoBack}>&#8592; Courses</button>
        <button onClick={handleChangeView}>Notes</button>
        <button onClick={handleChangeView}>Essays</button>
      </nav>
      {error ? <h5>{error}</h5> : void 0}
      <ul>
        {notesAndEssays[currentView].map(resource => (
          <li key={resource.id}><Link
            to={{
              pathname: `/courses/${props.match.params.id}/${currentView}/${resource.id}`,
              state: { [currentView]: resource }
            }}>
            {resource.title}
          </Link> - {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(resource.date_created))}</li>
        ))}
      </ul>
      {adding ? <AddNoteOrEssay setAdding={setAdding} setError={setError} type={currentView} courseId={props.match.params.id} addResource={addResource} /> : void 0}
      {!adding && <button onClick={() => setAdding(true)}>Add {currentView.charAt(0).toUpperCase() + currentView.substr(1).replace(/s$/, '')}</button>}
    </section>
  )
}

export default SingleCourse