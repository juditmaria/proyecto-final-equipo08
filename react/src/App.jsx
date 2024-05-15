// App.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './userContext';
import { setAuthToken } from './slices/auth/authSlice';
import './App.scss';
import LoginRegister from './components/auth/LoginRegister';

import Layout from './components/layout/Layout';
import NotFound from './components/app/NotFound';

import Home from './components/app/Home';

import About from './components/app/About';
import Terms from './components/app/Terms';


//User
import User from './components/app/User';
function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    // Comprueba si hay un token en el almacenamiento local al cargar la página
    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken) {
      dispatch(setAuthToken(storedAuthToken));
    }
  }, [dispatch]);

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}>
        {authToken ? (
          <Layout>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/user" element={<User />} />
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
