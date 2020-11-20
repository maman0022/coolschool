import React from 'react'
import ReactDOM from 'react-dom'
import Courses from './Courses'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Courses />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})