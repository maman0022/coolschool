import React from 'react'
import ReactDOM from 'react-dom'
import SingleCourse from './SingleCourse'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <SingleCourse />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})