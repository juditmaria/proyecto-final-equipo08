import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'; // Importa useSelector
import { setAuthToken, setError } from '../../slices/auth/authSlice'; // Importa setError del slice de autenticación
import { URL_API } from '../../constants';

//STYLE
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Login = ({ setLogin }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Obtén el error del estado global utilizando useSelector
  const error = useSelector((state) => state.auth.error);

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch(URL_API + 'login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Usuario y/o contraseña incorrectos');
      }

      const authToken = responseData.authToken;

      // Guardar el authToken en el almacenamiento local del navegador y en el estado
      localStorage.setItem('authToken', authToken);
      dispatch(setAuthToken(authToken)); // Actualizamos el estado del token en el slice de autenticación

      console.log('Login exitoso:', authToken);
    } catch (error) {
      console.error('Error de login:', error);
      dispatch(setError(error.message || 'Usuario y/o contraseña incorrectos')); // Despachamos la acción setError con el mensaje de error
    }
  };

  return (
    <>
      <header>Inicio de sesión</header>
      <Form onSubmit={handleSubmit(handleLogin)} className='p-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control required type="email" placeholder="Correo electrónico" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control required type="password" placeholder="Contraseña" />
          <Form.Text>
            Mínimo 8 cáracteres
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
        </Form.Group>

        <Button variant="dark" type="submit">
          Iniciar sesión
        </Button>
      </Form>

      <Card border="info">
        <Card.Body>
          <Card.Text>¿No tienes cuenta? <Card.Link href="#">Registrate</Card.Link></Card.Text></Card.Body>
      </Card>
    
    
    <section className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
      <div className="space-y-4">
        <header className="mb-3 text-2xl font-bold">Log in</header>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="Email or username"
              {...register('email', {
                required: 'Por favor, introduce tu correo electrónico',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Por favor, introduce un correo electrónico válido',
                },
              })}
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          {errors.email && <p className="text-red-600 bg-yellow-200 p-2">{errors.email.message}</p>}
          <div className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Por favor, introduce la contraseña' })}
              className="my-3 w-full border-none bg-transparent outline-none"
            />
            <a href="#" className="font-medium text-gray-400 hover:text-gray-500">
              FORGOT?
            </a>
          </div>
          {errors.password && <p className="text-red-600 bg-yellow-200 p-2">{errors.password.message}</p>}
          <button
            type="submit"
            className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
          >
            LOG IN
          </button>
        </form>
      </div>

      {error && <p className="text-red-600 bg-yellow-200 p-2">{error}</p>} {/* Renderizamos el error desde el estado global */}

      <footer>
        <div className="mt-8 text-sm text-gray-400">
          By signing in to ****, you agree to our
          <a href="#" className="font-medium text-gray-500">
            Terms
          </a>{' '}
          and
          <a href="#" className="font-medium text-gray-500">
            Privacy Policy
          </a>
          .
        </div>
        <div className="mt-8 text-sm text-gray-400">
          <button onClick={() => setLogin(false)} className="underline">
            Not registered ?
          </button>
        </div>
      </footer>
    </section>
    </>
  );
};

export default Login;
