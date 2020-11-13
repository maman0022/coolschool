import React from 'react'
import ApiService from '../../services/ApiService'

function AddCourse(props){
  
  function handleAddCourse(e){
    e.preventDefault()
    const title = e.target['course-name'].value
    if(title.trim()===''){
      return props.setError('Title cannot be blank')
    }
    ApiService.addCourse(title)
      .then(async response => {
        if(!response.ok){
          throw new Error((await response.json()).message)
        }
        const course = await response.json()
        props.addCourse(course)
        props.setAdding(false)
      })
      .catch(error=>props.setError(error.message))
  }

  return(
    <form className='flex-column' onSubmit={handleAddCourse}>
      <label htmlFor='course-name'>Title:</label>
      <input type='text' name='course-name' id='course-name' required></input>
      <div>
        <button onClick={()=>props.setAdding(false)} className='add-course-btn'>Cancel</button>
        <input type='submit' value='Add' className='add-course-btn'></input>
      </div>
    </form>
  )
}

export default AddCourse