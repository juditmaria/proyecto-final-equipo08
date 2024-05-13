import React, { useState, useEffect } from 'react';
import { URL_API } from '../../constants';
import { URL } from '../../constants';


const Movie = () => {
  console.log('hola')
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(URL_API + 'movies');
        console.log('Response:', response);
        if (response.ok) {
          const data = await response.json();
          console.log('ci');
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

  console.log('movies', movies.data );

  return (
    <div>
      <h1>Películas</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Director: {movie.director}</p>
            <p>Duración: {movie.length}</p>
            <p>Tipo: {movie.type}</p>
            <p>Año de lanzamiento: {movie.release_year}</p>
            <p>Tráiler: {movie.trailer}</p>
            <img src={`${URL}` + movies.image} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
