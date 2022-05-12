import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import GameInterface from '../components/GameInterface'

const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<GameInterface />} />
      </Route>
    </Routes>
  )
}

export default Router
