import { useState, useEffect } from 'react'
import './App.css'
import { UserContext } from "./userContext";
import { Routes, Route } from 'react-router-dom';

import LoginRegister from './components/auth/LoginRegister'

import Layout from './components/layout/Layout';
import NotFound from './components/app/NotFound';
import Home from './components/app/Home';
import About from './components/app/About';


function App() {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    // Comprueba si hay un token en el almacenamiento local al cargar la página
    const storedAuthToken = localStorage.getItem("authToken");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  const handleSetAuthToken = (token) => {
    // Guarda el token en el almacenamiento local y en el estado
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken: handleSetAuthToken }}  >
        
        {authToken !== "" ? (
          <>
            <Layout>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>          
          </>
        ) : <LoginRegister />}
      </UserContext.Provider>
    </>
  );
}

export default App;