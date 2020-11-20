import React from 'react'
import ReactDOM from 'react-dom'
import NoteOrEssay from './NoteOrEssay'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <NoteOrEssay />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})