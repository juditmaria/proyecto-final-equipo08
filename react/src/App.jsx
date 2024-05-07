import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginRegister from './auth/LoginRegister'
import { Register } from './auth/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LoginRegister /> */}
      <Register />
      
    </>
  )
}

export default App
