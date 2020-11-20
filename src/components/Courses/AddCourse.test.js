import React from 'react'
import ReactDOM from 'react-dom'
import AddCourse from './AddCourse'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AddCourse />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})