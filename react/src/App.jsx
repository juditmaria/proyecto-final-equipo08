import { useState, useEffect } from 'react'
import './App.css'
import { UserContext } from "./userContext";
import LoginRegister from './components/auth/LoginRegister'
import {Header} from './components/layout/Header';

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
            <Header />
            <h1>Inicio</h1>
          </>
        ) : <LoginRegister />}
      </UserContext.Provider>
    </>
  );
}

export default App;