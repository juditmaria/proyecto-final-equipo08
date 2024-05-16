import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserName, setUserMail, setRememberMe } from '../../slices/auth/authSlice';
import { URL_API } from '../../constants';

const Header = () => {
  const authToken = useSelector(state => state.auth.authToken);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const response = await fetch(URL_API + 'logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        dispatch(setAuthToken('')); // Limpiar el token en el estado del slice de autenticación
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        dispatch(setRememberMe('N'));
        localStorage.removeItem('authToken'); // Limpiar el token en el almacenamiento local
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('rememberMe');
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      <nav>
        CinemasWEB
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href="/movies">Movie</a></li>
          <li><a href="/">Home</a></li>
        </ul>
        <div>
          <a onClick={logout}>logout</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
