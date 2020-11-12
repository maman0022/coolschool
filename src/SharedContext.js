import React from 'react'

const SharedContext = React.createContext({
  userInfo: {},
  setUser() { }
})

export default SharedContext