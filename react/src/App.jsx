import React, { useState, useEffect } from 'react';

import { Prueba } from './auth/Prueba';
import { UserContext } from './userContext';
import LoginRegister from './auth/LoginRegister';

function App() {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    // Obtener el token de autenticación del almacenamiento local
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Actualizar el token de autenticación en el estado local
      setAuthToken(storedToken);
    }
  }, []);
  console.log('authtoken', authToken)
  return (
    <UserContext.Provider value={{ authToken }}>
      {authToken !== "" ? (
        <>
          <Prueba />
          
        </>
      ) : <LoginRegister />}
    </UserContext.Provider>
  );
}

export default App;
