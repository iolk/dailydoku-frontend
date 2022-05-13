import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/index.css'
import Router from './router'

const rootElement = document.getElementById('root')

render(
  <React.StrictMode>
    <BrowserRouter basename="/dailydoku-frontend">
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
)
