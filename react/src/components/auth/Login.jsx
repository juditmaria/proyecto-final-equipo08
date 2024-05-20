import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setUserId, setUserName, setUserMail, setRole, setRememberMe, setError } from '../../slices/auth/authSlice';
import { setProfileId, setProfileImg } from '../../slices/profile/profileSlice';
import { setPromoterId, setPromoterName } from '../../slices/promoter/promoterSlice';
import { URL_API } from '../../constants';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

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

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckboxChange = () => {
    dispatch(setRememberMe('Y')); 
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);


  const handleLogin = async (data) => {
    const { email, password } = data;

    const storedAuthToken = localStorage.getItem('authToken');

    try {
      const responseLogin = await fetch(URL_API + 'login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const responseLoginData = await responseLogin.json();

      if (!responseLogin.ok) {
        throw new Error(responseLoginData.message || 'Usuario y/o contraseña incorrectos');
      }

      // const { authToken, userId, userName, userMail, role } = responseLoginData;

      const authToken = responseLoginData.authToken;
      const userId = responseLoginData.userId;
      const userName = responseLoginData.userName;
      const userMail = responseLoginData.userMail;
      const role = responseLoginData.role;
     
      // Guardar el authToken en el almacenamiento local del navegador y en el estado
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userMail', userMail);
      localStorage.setItem('role', role);
      localStorage.setItem('rememberMe', rememberMe);
      dispatch(setAuthToken(authToken)); // Actualizamos el estado del token en el slice de autenticación
      dispatch(setUserId(userId));
      dispatch(setUserName(userName));
      dispatch(setUserMail(userMail));
      dispatch(setRole(role));
      dispatch(setRememberMe(rememberMe));
      
      console.log('Login exitoso:', authToken, userId, userName, userMail, role, rememberMe);
      // console.log("Role loging:", role);

      const responseProfiles = await fetch(URL_API + 'profiles', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedAuthToken}`
        }
      });

      const responseProfilesData = await responseProfiles.json();

      if (!responseProfiles.ok) {
        throw new Error(responseProfilesData.message || 'Error en los datos de los perfiles');
      }  

      const profilesArray = responseProfilesData.data;

      //Devuelve true o false si encuentra el user_id o no
      const userExists = profilesArray.some(profile => profile.user_id === userId);

      if (userExists) {
        // Encontrar el perfil correspondiente al userId y devuelve el primer elemento que cumpla la condición
      const userProfile = profilesArray.find(profile => profile.user_id === userId);
      /*       console.log("responseProfilesData", responseProfilesData.data);
       */
             // Acceder a la propiedad 'data' que contiene el array de perfiles
      
            // Uso en tu código
            // try {
            //   const userProfile = handleUserProfile(profilesArray, userId);
             
              /* console.log("userProfile", userProfile);
              console.log("userProfile id: ", userProfile.id); */ 
      
              //Guarda en una variable el codigo que extrae el valor
              const profileId = userProfile.id;
              const profileImg = userProfile.image;
      
              // Guardar en el almacenamiento local del navegador y en el estado
              localStorage.setItem('profileId', profileId);
              localStorage.setItem('profileImg', profileImg);
              // Actualizamos el estado en el slice
              dispatch(setProfileId(profileId));
              dispatch(setProfileImg(profileImg));
            // } catch (error) {
            //   // Manejo del error
            //   console.error(error.message);
            //   // Muestra el mensaje de error en la UI o realiza otras acciones necesarias
            // }
      } else{
        console.error('Perfil no encontrado para el usuario actual');
      }

      //Promoter
      const responsePromoters = await fetch(URL_API + 'promoters', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedAuthToken}`
        }
      });

      const responsePromotersData = await responsePromoters.json();

      if (!responsePromoters.ok) {
        throw new Error(responsePromotersData.message || 'Usuario y/o contraseña incorrectos');
      }  
/*       console.log("responseProfilesData", responseProfilesData.data);
 */
       // Acceder a la propiedad 'data' que contiene el array de perfiles
       const promotersArray = responsePromotersData.data;

      // Encontrar el perfil correspondiente al userId
      const userPromoter = promotersArray.find(promoter => promoter.user_id === userId);
      
      console.log("userPromoter", userPromoter);
      /* console.log("userProfile", userProfile);
      console.log("userProfile id: ", userProfile.id); */ 

      //Guarda en una variable el codigo que extrae el valor
      const promoterId = userPromoter.id;
      const promoterName = userPromoter.name;
      // Guardar en el almacenamiento local del navegador y en el estado
      localStorage.setItem('promoterId', promoterId);
      localStorage.setItem('promoterName', promoterName);
      // Actualizamos el estado en el slice
      dispatch(setPromoterId(promoterId));
      dispatch(setPromoterName(promoterName));

      navigate('/');
    } catch (error) {
      console.error('Error de login:', error);
      dispatch(setError(error.message || 'Usuario y/o contraseña incorrectos')); // Despachamos la acción setError con el mensaje de error
      setErrorMessage(error.message);
      setShowErrorModal(true);
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

        <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error de inicio de sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseErrorModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

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
