import React, { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import {  Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './userContext';
import { setAuthToken, setUserId, setUserName, setUserMail, setRole, setRememberMe } from './slices/auth/authSlice';
import { setProfileId, setProfileImg } from './slices/profile/profileSlice';
import { setPromoterId, setPromoterName } from './slices/promoter/promoterSlice';

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

import TicketCreate from './components/app/TicketCreate';
import { URL_API } from './constants';
import { Modal, Button } from 'react-bootstrap';
import Profile from './components/app/User/Profile';
import Promoter from './components/app/User/Promoter/Promoter';
import LocationsAdminList from './components/app/User/Admin/LocationsAdminList';
import LocationsAdminShow from './components/app/User/Admin/LocationsAdminShow';

import TicketShow from './components/app/TicketShow';
import Admin from './components/app/User/Admin/Admin';
import UserList from './components/app/User/Admin/UserList';
import UserShow from './components/app/User/Admin/UserShow';
import PromoterList from './components/app/User/Admin/PromoterList';
import PromoterShow from './components/app/User/Admin/PromoterShow';
import MoviesAdminList from './components/app/User/Admin/MoviesAdminList';
import MoviesAdminShow from './components/app/User/Admin/MoviesAdminShow';
import MoviesAdminCreate from './components/app/User/Admin/MoviesAdminCreate';
import MoviesAdminUpdate from './components/app/User/Admin/MoviesAdminUpdate';
import LocationsPromoterList from './components/app/User/Promoter/LocationsPromoterList';
import LocationsPromoterShow from './components/app/User/Promoter/LocationsPromotersShow';
import LocationsPromoterCreate from './components/app/User/Promoter/LocationsPromoterCreate';
import PassesPromoterList from './components/app/User/Promoter/PassesPromoterList';
import PassesPromoterShow from './components/app/User/Promoter/PassesPromoteShow';
import PassesPromoterCreate from './components/app/User/Promoter/PassesPromoterCreate';
import RoomsPromoterList from './components/app/User/Promoter/RoomsPromoterList';
import RoomsPromoterShow from './components/app/User/Promoter/RoomsPromoterShow';
import RoomsPromoterCreate from './components/app/User/Promoter/RoomsPromoterCreate';
import RoomsPromoterUpdate from './components/app/User/Promoter/RoomsPromoterUpdate';
import PassesPromoterUpdate from './components/app/User/Promoter/PassesPromotersUpdate';

function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const error = useSelector((state) => state.auth.error);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedUserMail = localStorage.getItem('userMail');
    const storedRole = localStorage.getItem('role');
    const storedProfileId = localStorage.getItem('profileId');
    const storedProfileImg = localStorage.getItem('profileImg');
    const storedPromoterId = localStorage.getItem('promoterId');
    const storedPromoterName = localStorage.getItem('promoterName');
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
          dispatch(setUserId(storedUserId));
          dispatch(setUserName(storedUserName));
          dispatch(setUserMail(storedUserMail));
          dispatch(setRole(storedRole));
          dispatch(setProfileId(storedProfileId));
          dispatch(setProfileImg(storedProfileImg));
          dispatch(setPromoterId(storedPromoterId));
          dispatch(setPromoterName(storedPromoterName));
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
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('role');
        localStorage.removeItem('profileId');
        localStorage.removeItem('profileImg');
        localStorage.removeItem('promoterId');
        localStorage.removeItem('promoterName');
        localStorage.removeItem('rememberMe');

        dispatch(setAuthToken(''));
        dispatch(setUserId(''));
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        dispatch(setRole(''));
        dispatch(setProfileId(''));
        dispatch(setProfileImg(''));
        dispatch(setPromoterId(''));
        dispatch(setPromoterName(''));
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
                    <Route path="/select-tickets" element={<TicketCreate />} />
                    <Route path="/tickets" element={<TicketShow />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/promoter" element={<Promoter />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserShow />} />
                    <Route path="/promoters" element={<PromoterList />} />
                    <Route path="/promoters/:id" element={<PromoterShow />} />

                    <Route path="/locations-admin" element={<LocationsAdminList />} />
                    <Route path="/locations-admin/:id" element={<LocationsAdminShow />} />
                    <Route path="/movies-admin" element={<MoviesAdminList />} />
                    <Route path="/movies-admin/:id" element={<MoviesAdminShow />} />
                    <Route path="/movies-admin/:id/update" element={<MoviesAdminUpdate />} />
                    <Route path="/movies-admin/create" element={<MoviesAdminCreate />} />

                    <Route path="/locations-promoter" element={<LocationsPromoterList />} />
                    <Route path="/locations-promoter/:id" element={<LocationsPromoterShow />} />
                    <Route path="/locations-promoter/create" element={<LocationsPromoterCreate/>} />

                    <Route path="/locations-promoter/:id/passes" element={<PassesPromoterList />} />
                    <Route path="/passes-promoter/:id" element={<PassesPromoterShow />} />
                    <Route path="/passes-promoter/create/:id" element={<PassesPromoterCreate />} />
                    <Route path="/passes-promoter/:id/update" element={<PassesPromoterUpdate />} />

                    <Route path="/rooms-promoter" element={<RoomsPromoterList />} />
                    <Route path="/rooms-promoter/:id" element={<RoomsPromoterShow />} />
                    <Route path="/rooms-promoter/:id/update" element={<RoomsPromoterUpdate />} />

                    <Route path="/rooms-promoter/create" element={<RoomsPromoterCreate />} />

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
                    <Route path="/select-tickets" element={<TicketCreate />} />



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
