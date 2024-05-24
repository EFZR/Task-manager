import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import TaskProvider from './context/TaskProvider'
import UiProvider from './context/UiProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskProvider>
      <UiProvider>
        <Router />
      </UiProvider>
    </TaskProvider>
  </React.StrictMode>,
)
