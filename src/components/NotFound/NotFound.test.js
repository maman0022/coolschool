import React from 'react'
import ReactDOM from 'react-dom'
import NotFound from './NotFound'
import { BrowserRouter } from 'react-router-dom'

it('renders to the DOM', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})