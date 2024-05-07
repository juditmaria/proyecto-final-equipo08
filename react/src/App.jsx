import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginRegister from './auth/LoginRegister'
import Register from './auth/Register'

import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()
  return (
    <>
     {authToken !== "" ? (
          <>
            < Register />
          </>
        ) : <LoginRegister />}
  </>
  );
}

export default App
