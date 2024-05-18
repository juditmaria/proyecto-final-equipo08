import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserId, setUserName, setUserMail, setRole, setPromoterId, setFormData, clearFormData, setRememberMe, setError } from '../../slices/auth/authSlice';
import { setProfileImg } from '../../slices/profile/profileSlice';
import { setPromoterId } from '../../slices/promoter/promoterSlice';
import { URL_API } from '../../constants';
import { useNavigate } from 'react-router-dom';

//STYLE
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Register = ({ setLogin }) => {
  const dispatch = useDispatch();
  const { formData, error } = useSelector(state => state.auth);
  const rememberMe = useSelector((state) => state.auth.rememberMe);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    dispatch(setRememberMe('Y')); 
  };


  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verifica si las contraseñas coinciden
    if (formData.password !== formData.password2) {
      dispatch(setError("Las contraseñas no coinciden"));
      return;
    }

    try {
      const response = await fetch(URL_API + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rememberMe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          // Error de correo electrónico duplicado
          dispatch(setError("El correo electrónico ya está registrado"));
        } else if (response.status === 422) {
          // Error de contraseña no válida
          dispatch(setError("La contraseña debe tener al menos 6 caracteres"));
        } else {
          // Otro error de red
          dispatch(setError("Ha ocurrido un error en la red. Inténtalo de nuevo más tarde."));
        }
        return;
      }

      const responseData = await response.json();

      const authToken = responseData.authToken;
      const userId = responseData.userId;
      const userName = responseData.userName;
      const userMail = responseData.userMail;
      const role = responseData.role;
      const promoterId = responseData.promoterId;
      // Guardar el authToken en el almacenamiento local del navegador y en el estado
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userMail', userMail);
      localStorage.setItem('role', role);
      localStorage.setItem('promoterId', promoterId);
      localStorage.setItem('rememberMe', rememberMe);
      // Actualizar el estado en el slice de autenticación 
      dispatch(setAuthToken(authToken)); // Actualizamos el estado del token en el slice de autenticación
      dispatch(setUserId(userId));
      dispatch(setUserName(userName));
      dispatch(setUserMail(userMail));
      dispatch(setRole(role));
      dispatch(setPromoterId(promoterId));
      dispatch(setRememberMe(rememberMe));

      // Limpiar el formData después del registro exitoso
      dispatch(clearFormData());

      // Maneja la respuesta como desees
      console.log("Usuario registrado con éxito", formData, authToken, userName, userMail, rememberMe);
      //console.log("Token de autenticación:", authToken);

      setLogin(true);
      navigate('/');
    } catch (error) {
      // Error de red
      dispatch(setError("Ha ocurrido un error en la red. Inténtalo de nuevo más tarde."));
    }
  };

  return (
    <>
      <Container>
        <header>Crear cuenta</header>
        <Form onSubmit={handleRegister} className='p-3'>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />       
        </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRepeatPassword">
            <Form.Control
              type="password"
              name="password2"
              placeholder="Repite la contraseña"
              value={formData.password2}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCheckRememberMe">
          <Form.Check
            type="checkbox"
            label={
              <span>
                Recuerda la sesión de mi cuenta por 30 días
              </span>
            }
            onChange={handleCheckboxChange}
          />
          </Form.Group>

          <Button variant="dark" type="submit">
            Crea la cuenta
          </Button>
        </Form>

        <hr className='p-2'/>

        <Card border="info" className='p-1'>
          <Card.Body>
            <Card.Text>¿Ya tienes cuenta? <Card.Link onClick={() => setLogin(true)}>Inicia sesión</Card.Link></Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Register;
