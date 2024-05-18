import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserName, setUserMail, setRole, setPromoterId, setRememberMe } from '../../slices/auth/authSlice';
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
  const role = useSelector((state) => state.auth.role);
  const promoterId = useSelector((state) => state.auth.promoterId);
  const userName = useSelector((state) => state.auth.userName);
  const profileImg = useSelector((state) => state.auth.profileImg);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
        dispatch(setRole(''));
        dispatch(setPromoterId(''));
        dispatch(setRememberMe('N'));
        localStorage.removeItem('authToken'); // Limpiar el token en el almacenamiento local
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('role');
        localStorage.removeItem('promoterId');
        localStorage.removeItem('rememberMe');
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

// UseEffect para asegurarse de que el rol se haya actualizado antes de renderizar el menú
useEffect(() => {
  // Aquí puedes realizar cualquier acción que necesite ocurrir después de que el rol se actualice
  // Por ejemplo, aquí puedes hacer cualquier solicitud adicional que necesite el nuevo rol
  console.log("El rol se ha actualizado:", role);
}, [role]);

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
            <Dropdown as={ButtonGroup}>
              <Button variant="secondary" className="d-flex align-items-center">
                <Link to="/profile" className="d-flex align-items-center text-decoration-none text-white">
                  <span className="me-2">{userName}</span>

                  {profileImg === "" ? (
                    <Image src={profileImg} roundedCircle className="profileImgMenu" />
                  ) : (
                    <Image src={ProfileDefaultImage} roundedCircle className="profileImgMenu" />
                  )}
                </Link>
              </Button>

              <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Configuración</Dropdown.Item>
                <Dropdown.Item href="/tickets">Tickets</Dropdown.Item>
{/*                 {promoterId === undefined && <Dropdown.Item href="/promoter">Promotor</Dropdown.Item>}
 */}                {role != 0 && role != undefined && <Dropdown.Item href="/admin">Administración</Dropdown.Item>}
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
};

export default Header;
