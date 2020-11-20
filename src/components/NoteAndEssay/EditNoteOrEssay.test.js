import React from 'react'
import ReactDOM from 'react-dom'
import EditNoteOrEssay from './EditNoteOrEssay'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <EditNoteOrEssay />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})