import React, { ReactElement } from 'react'
import { Outlet } from 'react-router'

function App(): ReactElement {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
