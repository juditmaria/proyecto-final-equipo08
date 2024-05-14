import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../../slices/auth/authSlice';
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
        localStorage.removeItem('authToken'); // Limpiar el token en el almacenamiento local
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
        <a href="/user">User</a>
        <div>
          <a onClick={logout}>logout</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
