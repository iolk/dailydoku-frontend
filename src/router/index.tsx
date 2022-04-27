import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import Home from '../components/Home'

const Router: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default Router
