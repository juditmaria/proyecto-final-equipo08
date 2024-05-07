import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { URL_API } from '../constants';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../slices/auth/authSlice'; 

export const Login = ({ setLogin }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [authToken, setAuthTokenLocal] = useState(""); // Variable para almacenar el authToken

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch( URL_API + "login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Usuari i/o contrasenya incorrectes");
      }

      // Guardar el authToken en el almacenamiento local del navegador
      localStorage.setItem('authToken', responseData.authToken);
      dispatch(setAuthToken(responseData.authToken)); // Almacena el authToken en el estado de Redux

      console.log("Login exitoso:", responseData.authToken);

    } catch (error) {
      console.error('Error de login:', error);
      setError(error.message || "Usuari i/o contrasenya incorrectes");
    }
  }; 

  return (
    <section className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
      <div className="space-y-4">
        <header className="mb-3 text-2xl font-bold">Log in</header>
        <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="text"
            placeholder="Email or username"
            {...register("email", {
              required: "Por favor, introdueix el teu correu electrònic",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Por favor, introdueix un correu electrònic vàlid"
              }
            })}
            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
          />
        </div>
        <div className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Sisplau, la contrassenya no pot ser buida" })}
            className="my-3 w-full border-none bg-transparent outline-none"
          />
          <a href="#" className="font-medium text-gray-400 hover:text-gray-500">FORGOT?</a>
        </div>
        <button
          onClick={handleSubmit(handleLogin)}
          className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
          LOG IN
        </button>
      </div>

      {error && <p className="text-red-600 bg-yellow-200 p-2">{error}</p>}

      <footer>
        <div className="mt-8 text-sm text-gray-400">
          By signing in to ********, you agree to our
          <a href="#" className="font-medium text-gray-500">Terms</a> and
          <a href="#" className="font-medium text-gray-500">Privacy Policy</a>.
        </div>
        <div className="mt-8 text-sm text-gray-400">
          <button onClick={() => setLogin(false)} className="underline">Not registered ?</button>
        </div>
      </footer>
    </section>
  );
};
