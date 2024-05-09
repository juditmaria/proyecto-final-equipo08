import React, { useState, useEffect } from 'react';

import { Prueba } from './auth/Prueba';
import { UserContext } from './userContext';
import LoginRegister from './auth/LoginRegister';

function App() {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    // Comprueba si hay un token en el almacenamiento local al cargar la página
    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  const handleSetAuthToken = (token) => {
    // Guarda el token en el almacenamiento local y en el estado
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken: handleSetAuthToken }}>
        {authToken !== '' ? (
          <>
            <Prueba />
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;