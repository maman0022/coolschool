import React from 'react'
import ApiService from '../../ApiService'

function AddNoteOrEssay(props){
  
  function handleAddNoteOrEssay(e){
    e.preventDefault()
    const title = e.target['resource-name'].value
    if(title.trim()===''){
      return props.setError('Title cannot be blank')
    }
    ApiService.addNoteOrEssay(title)
      .then(async response => {
        if(!response.ok){
          throw new Error((await response.json()).message)
        }
        const note = await response.json()
        props.addNoteOrEssay(note)
        props.setAdding(false)
      })
      .catch(error=>props.setError(error.message))
  }

  return(
    <form className='flex-column' onSubmit={handleAddNoteOrEssay}>
      <label htmlFor='resource-name'>Title:</label>
      <input type='text' name='resource-name' id='resource-name' required></input>
      <div>
        <button onClick={()=>props.setAdding(false)} className='add-resource-btn'>Cancel</button>
        <input type='submit' value='Add' className='add-resource-btn'></input>
      </div>
    </form>
  )
}

export default AddNoteOrEssay