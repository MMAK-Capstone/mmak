import React from 'react'

import {Navbar, Homepage, Dashboard} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes/>
    </div>
  )
}

export default App
