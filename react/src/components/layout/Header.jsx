import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserName, setUserMail, setRememberMe } from '../../slices/auth/authSlice';
import { URL_API } from '../../constants';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../App.scss';

const Header = () => {
  const authToken = useSelector(state => state.auth.authToken);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false); // Estado para controlar la expansión del Navbar

  const logout = async () => {
    try {
      const response = await fetch(URL_API + 'logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        dispatch(setAuthToken('')); // Limpiar el token en el estado del slice de autenticación
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        dispatch(setRememberMe('N'));
        localStorage.removeItem('authToken'); // Limpiar el token en el almacenamiento local
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('rememberMe');
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded); // Alternar el estado de expansión del Navbar
  };

  const handleSelect = () => {
    setExpanded(false); // Plegar el Navbar al seleccionar un elemento
  };

  return (
    <Navbar expand="lg"  expanded={expanded}>
      <Container >
        <Navbar.Brand href="#" className="text-white">CINEVERSE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggle} />
        <Container className={`navbar-custom mt-2 p-4 ${expanded ? 'expanded' : ''}`}>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Link to="/" className="nav-link text-white" onClick={handleSelect}>HOME</Link>
            </Nav>
            <Nav className="ms-auto">
              <Link to="/" className="nav-link text-white" onClick={handleSelect}>
                USER
              </Link>
              <Link onClick={() => { logout(); handleSelect(); }} className="nav-link text-white">
                LOGOUT
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;
