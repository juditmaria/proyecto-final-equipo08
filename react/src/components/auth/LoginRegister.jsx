import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { setIsLogin } from '../../slices/auth/authSlice'; // Importamos la acción setIsLogin del authSlice

const LoginRegister = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin); // Obtenemos el estado isLogin del authSlice

  const handleToggleLogin = () => {
    dispatch(setIsLogin(!isLogin)); // Cambiamos el estado isLogin al valor opuesto
  };

  return (
    <div>
      <h1>Login / Register </h1>
      {isLogin ? <Login setLogin={handleToggleLogin} /> : <Register setLogin={handleToggleLogin} />}
    </div>
  )
}

export default LoginRegister;
