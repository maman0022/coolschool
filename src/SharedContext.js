import React from 'react'

const SharedContext = React.createContext({
  user: null,
  courses: [],
  notes: [],
  essays: []
})

export default SharedContext