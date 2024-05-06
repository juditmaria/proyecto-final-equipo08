import React, { useState } from 'react';
import axios from 'axios';
import {URL, URL_API} from '../constants';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL_API+'register', formData);
            console.log('Usuario registrado exitosamente:', response.data);
            // Puedes redirigir al usuario a otra página después del registro si es necesario
        } catch (error) {
            console.error('Error al registrar usuario:', error.response.data);
            // Puedes mostrar mensajes de error al usuario si ocurre algún error durante el registro
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirmar contraseña" required />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
