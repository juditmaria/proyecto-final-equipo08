import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API, URL } from '../../constants';

const MovieShow = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(URL_API + `movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data.data);
        } else {
          console.error('Error al obtener la película:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener la película:', error);
      }
    };

    fetchMovie();
  }, [id]); // Asegurarse de que se vuelva a cargar cuando cambia el parámetro de la URL

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p>Director: {movie.director}</p>
          <p>Duración: {movie.length}</p>
          <p>Tipo: {movie.type}</p>
          <p>Año de lanzamiento: {movie.release_year}</p>
          <p>Tráiler: {movie.trailer}</p>
          <img 
            src={`${URL}/storage/${movie.image}`} // Aquí modificamos la ruta de la imagen
            alt={movie.title} 
            style={{ width: '200px', height: 'auto' }} // Cambia el tamaño de la imagen
          />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default MovieShow;
