// App.jsx

import { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './userContext';
import { setAuthToken, setUserName, setUserMail, setRememberMe } from './slices/auth/authSlice';

import LoginRegister from './components/auth/LoginRegister';
import Layout from './components/layout/Layout';
import NotFound from './components/app/NotFound';
import Home from './components/app/Home';
import About from './components/app/About';
import MovieList from './components/app/MovieList';
import Location from './components/app/LocationList';
import MovieShow from './components/app/MovieShow';

import { URL_API } from './constants';



function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const userName = useSelector((state) => state.auth.userName);
  const userMail = useSelector((state) => state.auth.userMail);
  const rememberMe = useSelector((state) => state.auth.rememberMe);

  useEffect(() => {
    // Comprueba si hay un token en el almacenamiento local al cargar la página
    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken) {
      // Hacer la solicitud para verificar la validez del token
      fetch(URL_API + "user", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Usuario no autenticado o token inválido.');
        }
      })
      .then(data => {
        if (data.is_token_valid) {
          // Si el token es válido, establecer el token en el estado
          dispatch(setAuthToken(storedAuthToken));
        } else {
          throw new Error('Usuario no autenticado o token inválido.');
        }
      })
      .catch(error => {
        console.error('Error al verificar el token:', error.message);

        // Si el token no es válido, borrarlo del almacenamiento local
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('rememberMe');
  
        dispatch(setAuthToken('')); // Limpiar el token en el estado del slice de autenticación
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        dispatch(setRememberMe('N'));
        
        // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
      });
    }
  }, [dispatch]);

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}>
        {authToken ? (
          <Layout>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<Location />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/movies" element={<MovieList />} /> */}
              <Route path="/movies/:id" element={<MovieShow />} />
              <Route path="/:id" element={<MovieList />} />

            </Routes>
          </Layout>          
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
