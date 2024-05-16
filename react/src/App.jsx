// App.jsx

import { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './userContext';
import { setAuthToken, setUserName, setUserMail } from './slices/auth/authSlice';

import LoginRegister from './components/auth/LoginRegister';

import Layout from './components/layout/Layout';
import NotFound from './components/app/NotFound';
import Home from './components/app/Home';
import About from './components/app/About';
import MovieList from './components/app/MovieList';
import LocationList from './components/app/LocationList';
import LocationShow from './components/app/LocationShow';
import PassesList from './components/app/PassesList';
import MovieShow from './components/app/MovieShow';
import PassesShow from './components/app/PassesShow';

import { URL_API } from './constants';



function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const userName = useSelector((state) => state.auth.userName);
  const userMail = useSelector((state) => state.auth.userMail);

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
        dispatch(setAuthToken('')); // Limpiar el token en el estado del slice de autenticación
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        
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
              <Route path="/" element={<LocationList />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/movies" element={<MovieList />} /> */}
              <Route path="/movies/:id" element={<MovieShow />} />
              <Route path="/:id" element={<PassesList />} />
              <Route path="/:id/passes/:movieid" element={<PassesShow />} />


            </Routes>
          </Layout>          
        ) : (
          <>
            <LoginRegister />
            {/* <Routes>
              <Route path="/terms" element={<Terms />} />
            </Routes> */}
          </>
          
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
