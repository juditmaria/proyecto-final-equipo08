import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserId, setUserName, setUserMail, setRole, setRememberMe } from '../../slices/auth/authSlice';
import { setProfileId, setProfileImg } from '../../slices/profile/profileSlice';
import { setPromoterId } from '../../slices/promoter/promoterSlice';
import { URL_API } from '../../constants';

//STYLE
import '../../App.scss';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


import Image from 'react-bootstrap/Image';
import ProfileDefaultImage from '../../assets/profileDefault.jpg';
 
const Header = () => {
  const authToken = useSelector(state => state.auth.authToken);
  const userName = useSelector((state) => state.auth.userName);
  const profileImg = useSelector((state) => state.profile.profileImg);
  
  const role = localStorage.getItem('role');
    const promoterId = localStorage.getItem('promoterId');

  const dispatch = useDispatch();

  const navigate = useNavigate();
/*   console.log("profileImg", profileImg);
  console.log("role", role); */

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
        dispatch(setUserId(''));
        dispatch(setUserName(''));
        dispatch(setUserMail(''));
        dispatch(setRole(''));
        dispatch(setProfileId(''));
        dispatch(setProfileImg(''));
        dispatch(setPromoterId(''));
        dispatch(setRememberMe('N'));
        localStorage.removeItem('authToken'); // Limpiar el token en el almacenamiento local
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('role');
        localStorage.removeItem('profileId');
        localStorage.removeItem('profileImg');
        localStorage.removeItem('promoterId');
        localStorage.removeItem('rememberMe');
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    // console.log("Role logout:", role);
    navigate('/');
  };

  // Determinar el borde del Card
  let buttonBorder = 'info';
  let itemPromoter = null;
  let itemAdmin = null;

  if (role === '1') {
      buttonBorder = 'danger';
      itemAdmin = (
        <Dropdown.Item href="/admin">Administración</Dropdown.Item>
      );
  } else if (promoterId && promoterId !== '' && role !== '1') {
      buttonBorder = 'primary';
  } 
  
  if (promoterId && promoterId !== '') {
    itemPromoter = (
      <Dropdown.Item href="/promoter">Promotor</Dropdown.Item>
    );
  }

return (
  <Navbar expand="lg" className="bg-body-tertiary body">
    <Container>
      <Navbar.Brand>
        <Link to="/" className="text-decoration-none text-dark">
          CINEVERSE
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
          <Link to="/link2" className="nav-link">Link</Link>
          <NavDropdown title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="ms-auto">
          {authToken ? (
            <Dropdown as={ButtonGroup} style={{ border: `3px solid var(--bs-${buttonBorder})`, borderRadius: '10px' }}>
              <Button variant="secondary" className="d-flex align-items-center">
                <Link to="/profile" className="d-flex align-items-center text-decoration-none text-white w-100">
                  <span className="me-2">{userName}</span>

                  {profileImg != "" ? (
                    <Image src="https://i.imgur.com/YcP0tik.jpeg" roundedCircle className="profileImgMenu" />
                  ) : (
                    <Image src={ProfileDefaultImage} roundedCircle className="profileImgMenu" />
                  )}
                </Link>
              </Button>

              <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Configuración</Dropdown.Item>
                <Dropdown.Item href="/tickets">Tickets</Dropdown.Item>
{/*             {promoterId == undefined && <Dropdown.Item href="/promoter">Promotor</Dropdown.Item>}*/}
                {/* {role == "1" && <Dropdown.Item href="/admin">Administración</Dropdown.Item>}   */}
                {itemPromoter}
                {itemAdmin}
                <Dropdown.Item onClick={logout} >Cierra sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate('/login')} variant="outline-primary">Inicia Sesión</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
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
