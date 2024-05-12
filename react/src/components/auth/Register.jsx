import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setError, setFormData, clearFormData } from '../../slices/auth/authSlice';
import { URL_API } from '../../constants';

const Register = ({ setLogin }) => {
  const dispatch = useDispatch();
  const { formData, error } = useSelector(state => state.auth);

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
        body: JSON.stringify(formData),
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

      const saveAuthToken = responseData.authToken;
      dispatch(setAuthToken(saveAuthToken));

      // Limpiar el formData después del registro exitoso
      dispatch(clearFormData());

      // Maneja la respuesta como desees
      console.log("Usuario registrado con éxito", formData);
      //console.log("Token de autenticación:", authToken);

    } catch (error) {
      // Error de red
      dispatch(setError("Ha ocurrido un error en la red. Inténtalo de nuevo más tarde."));
    }
  };

  return (
    <section className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
      <div className="space-y-4">
        <header className="mb-3 text-2xl font-bold">Crea Usuario</header>

        <form onSubmit={handleRegister}>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Repetir Contraseña"
              required
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
          >
            CREA CUENTA
          </button>
        </form>

        {error && <p className="text-red-600 bg-yellow-200 p-2">{error}</p>}

        <div className="mt-8 text-sm text-gray-400">
          <button onClick={() => setLogin(true)} className="underline">
            ¿Ya registrado?
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
