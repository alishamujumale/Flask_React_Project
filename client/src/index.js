import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log("useEffect running")

    fetch('/recipe/hello')
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data)
        setMessage(data.message)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="app">
      <h1>{message}</h1>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
