import React from 'react';
import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

const LoginRegister = () => {

  const [isLogin, setLogin] = useState(true);

  return (
    <div>
      <h1>Login / Register </h1>
      {isLogin ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  )
}

export default LoginRegister
