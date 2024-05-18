import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'; // Importa useSelector
import { setAuthToken, setUserName, setUserMail, setRole, setPromoterId, setRememberMe, setError } from '../../slices/auth/authSlice'; // Importa setError del slice de autenticación
import { URL_API } from '../../constants';
import { useNavigate } from 'react-router-dom';

//STYLE
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Login = ({ setLogin }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const rememberMe = useSelector((state) => state.auth.rememberMe);
  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    dispatch(setRememberMe('Y')); 
  };

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch(URL_API + 'login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Usuario y/o contraseña incorrectos');
      }

      const authToken = responseData.authToken;
      const userName = responseData.userName;
      const userMail = responseData.userMail;
      const role = responseData.role;
      const promoterId = responseData.promoterId;
     
      // Guardar el authToken en el almacenamiento local del navegador y en el estado
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userMail', userMail);
      localStorage.setItem('role', role);
      localStorage.setItem('promoterId', promoterId);
      localStorage.setItem('rememberMe', rememberMe);
      dispatch(setAuthToken(authToken)); // Actualizamos el estado del token en el slice de autenticación
      dispatch(setUserName(userName));
      dispatch(setUserMail(userMail));
      dispatch(setRole(role));
      dispatch(setPromoterId(promoterId));
      dispatch(setRememberMe(rememberMe));
      
      console.log('Login exitoso:', authToken, userName, userMail, role, promoterId, rememberMe);
      navigate('/');

    } catch (error) {
      console.error('Error de login:', error);
      dispatch(setError(error.message || 'Usuario y/o contraseña incorrectos')); // Despachamos la acción setError con el mensaje de error
    }
  };
  return (
    <>
      <Container>
        <header>Iniciar sesión</header>
        <Form onSubmit={handleSubmit(handleLogin)} className='p-3'>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
              {...register('email', {
                required: 'Por favor, introduce tu correo electrónico',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Por favor, introduce un correo electrónico válido',
                },
              })}
              type="email"
              placeholder="Correo electrónico"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              {...register('password', { 
                required: 'Por favor, introduce la contraseña'
              })}
              type="password"
              placeholder="Contraseña"
            />
            {/* <Form.Text>
              Mínimo 8 caracteres
            </Form.Text> */}
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

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox"
              label={
                <span>
                  Al iniciar sesión aceptas nuestros {' '}
                  <a href='#' target="_blank" rel="noopener noreferrer">
                    Términos
                  </a>
                  {' '}
                  y
                  {' '}
                  <a href='#' target="_blank" rel="noopener noreferrer">
                    Política de Privacidad
                  </a>
                </span>
              }
            />
          </Form.Group> */}

          <Button variant="dark" type="submit">
            Inicia sesión
          </Button>
        </Form>

        <hr className='p-2'/>

        <Card border="info" className='p-1'>
          <Card.Body>
            <Card.Text>¿No tienes cuenta? <Card.Link onClick={() => setLogin(false)}>Regístrate</Card.Link></Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
