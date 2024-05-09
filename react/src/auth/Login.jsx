import React from 'react'

export const Login = ({ setLogin }) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setLogin(false)}>No estoy registrado</button>
    </div>
  )
}

export default Login
