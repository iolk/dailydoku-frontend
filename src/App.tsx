import { ReactElement } from 'react'
import { Outlet } from 'react-router'
import { useRegisterSW } from 'virtual:pwa-register/react'
import PWAReloadToast from './components/pwa/PWAReloadToast'

function App(): ReactElement {
  const intervalMS = 60 * 60 * 1000

  const updateServiceWorker = useRegisterSW({
    onRegistered(registration) {
      registration &&
        setInterval(() => {
          registration.update()
        }, intervalMS)
    }
  })

  return (
    <div>
      <PWAReloadToast />
      <Outlet />
    </div>
  )
}

export default App
