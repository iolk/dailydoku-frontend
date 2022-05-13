import React, { ReactElement } from 'react'
import { Outlet } from 'react-router'
import { useRegisterSW } from 'virtual:pwa-register/react'
import ReloadPrompt from './components/pwa/ReloadPrompt'

function App(): ReactElement {
  const intervalMS = 60 * 60 * 1000

  const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update()
        }, intervalMS)
    }
  })

  return (
    <div>
      <ReloadPrompt />
      <Outlet />
    </div>
  )
}

export default App
