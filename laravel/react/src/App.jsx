import React, { useState } from 'react';
import { LoginRegister } from './auth/LoginRegister';
// import { UserContext } from './userContext';
/* import { Routes, Route } from 'react-router-dom'; */

function App() {
  const [usuari, setUsuari] = useState("");
  const [authToken, setAuthToken] = useState("");

  // Obtener el token de autenticación del almacenamiento local
  /* const storedToken = JSON.parse(localStorage.getItem('authToken')) || "";
  setAuthToken(storedToken); */

  return (
    <>
     <LoginRegister />
{/*       <UserContext.Provider value={{ usuari, setUsuari, authToken, setAuthToken }}>
        {authToken !== "" ? (
          <>
          <h1>paginas de usuario registrado pendientes</h1>
            <Header />
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </>
        ) : <LoginRegister />}
      </UserContext.Provider> */}
    </>
  );
}

export default App;