import React, { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import {  Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './userContext';
import { setAuthToken, setUserName, setUserMail, setPromoterId, setRole, setRememberMe } from './slices/auth/authSlice';

import LoginRegister from './components/auth/LoginRegister';

import Layout from './components/layout/Layout';
import NotFound from './components/app/NotFound';
import About from './components/app/About';
import MovieList from './components/app/MovieList';
import LocationList from './components/app/LocationList';
import LocationShow from './components/app/LocationShow';
import PassesList from './components/app/PassesList';
import MovieShow from './components/app/MovieShow';
import PassesShow from './components/app/PassesShow';
import Terms from './components/app/Terms';
import RoutesGuest from './routes/RoutesGuest';


import { URL_API } from './constants';
import { Modal, Button } from 'react-bootstrap';
import Profile from './components/app/User/Profile';
import Promoter from './components/app/User/Promoter/PromoterProfile';

function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const error = useSelector((state) => state.auth.error);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');
    const storedUserMail = localStorage.getItem('userMail');
    const storedRole = localStorage.getItem('role');
    const storedPromoterId = localStorage.getItem('promoterId');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedAuthToken) {
      fetch(URL_API + "user", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedAuthToken}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Sesión de usuario expirada o no válida. Prueba de nuevo.');
        }
      })
      .then(data => {
        if (data.is_token_valid) {
          dispatch(setAuthToken(storedAuthToken));
          dispatch(setUserName(storedUserName));
          dispatch(setUserMail(storedUserMail));
          dispatch(setRole(storedRole));
          dispatch(setPromoterId(storedPromoterId));
          dispatch(setRememberMe(storedRememberMe));
        } else {
          throw new Error('Usuario no autenticado o token inválido.');
        }
      })
      .catch(error => {
        console.error('Error al verificar el token:', error.message);

        setErrorMessage(error.message);
        setShowError(true);

        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('role');
        localStorage.removeItem('promoterId');
        localStorage.removeItem('rememberMe');

        dispatch(setAuthToken(''));
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        dispatch(setRole(''));
        dispatch(setPromoterId(''));
        dispatch(setRememberMe('N'));
      });
    }
  }, [dispatch]);

  const handleCloseError = () => {
    setShowError(false);
    setErrorMessage('');
  };

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}>
          {authToken ? (
            <>
              <Layout>
                <Routes>
                    <Route path="/" element={<LocationList />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/movies/:id" element={<MovieShow />} />
                    <Route path="/:id" element={<PassesList />} />
                    <Route path="/:id/passes/:movieid" element={<PassesShow />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/promoter" element={<Promoter />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/notfound" />} />
                  </Routes>
              </Layout>
            </>
          ) : (
            <>
              <Layout>
                <Routes>
                    <Route path="/" element={<LocationList />} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/movies/:id" element={<MovieShow />} />
                    <Route path="/:id" element={<PassesList />} />
                    <Route path="/:id/passes/:movieid" element={<PassesShow />} />
                  </Routes>
              </Layout>
            </>
          )}

      </UserContext.Provider>
 
      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
