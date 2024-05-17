import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserName, setUserMail, setFormData, clearFormData, setRememberMe, setError } from '../../slices/auth/authSlice';
import { URL_API } from '../../constants';

//STYLE
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Register = ({ setLogin }) => {
  const dispatch = useDispatch();
  const { formData, error } = useSelector(state => state.auth);
  const rememberMe = useSelector((state) => state.auth.rememberMe);

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
      const userName = responseData.userName;
      const userMail = responseData.userMail;
      // Guardar el authToken en el almacenamiento local del navegador y en el estado
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userMail', userMail);
      localStorage.setItem('rememberMe', rememberMe);
      // Actualizar el estado en el slice de autenticación  
      dispatch(setAuthToken(authToken));
      dispatch(setUserName(userName));
      dispatch(setUserMail(userMail));
      dispatch(setRememberMe(rememberMe));

      // Limpiar el formData después del registro exitoso
      dispatch(clearFormData());

      // Maneja la respuesta como desees
      console.log("Usuario registrado con éxito", formData, authToken, userName, userMail, rememberMe);
      //console.log("Token de autenticación:", authToken);

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

          <Button onClick={() => navigate('/')} variant="dark" type="submit">
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
