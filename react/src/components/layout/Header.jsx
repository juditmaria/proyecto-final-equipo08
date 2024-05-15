import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../../slices/auth/authSlice';
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
        localStorage.removeItem('authToken'); // Limpiar el token en el almacenamiento local
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

//   return (
//     <div>
//       <nav>
//         CinemasWEB
//         <a href="/user">User</a>
//         <div>
//           <a onClick={logout}>logout</a>
//         </div>
//       </nav>
//     </div>
//   );
// };


return (
  <Navbar expand="lg" className="bg-body-tertiary body">
    <Container>
      <Navbar.Brand href="#">CINEVERSE</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/link2" className="nav-link">Link</Link>
          <NavDropdown title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ms-auto">
          <Link to="/" className="nav-link">
            USER
          </Link>
          <Link onClick={logout} className="nav-link">
            LOGOUT
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};

export default Header;
