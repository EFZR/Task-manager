import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import TaskProvider from './context/TaskProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskProvider>
        <Router />
    </TaskProvider>
  </React.StrictMode>,
)
