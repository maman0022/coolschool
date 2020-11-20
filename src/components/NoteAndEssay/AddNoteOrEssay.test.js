import React from 'react'
import ReactDOM from 'react-dom'
import AddNoteOrEssay from './AddNoteOrEssay'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AddNoteOrEssay />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})