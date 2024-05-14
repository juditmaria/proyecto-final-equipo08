import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import { URL_API, URL } from '../../constants';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(URL_API + 'movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data.data);
        } else {
          console.error('Error al obtener las películas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Películas</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.map(movie => (
          <li key={movie.id}>
            <a href={`/movies/${movie.id}`}> link</a>{/* Enlace a la página de detalles de la película */}
              <img 
                src={`${URL}${movie.image}`} // Aquí modificamos la ruta de la imagen
                alt={movie.title} 
                style={{ width: '200px', height: 'auto' }} // Cambia el tamaño de la imagen
              />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
