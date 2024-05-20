import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';

const MovieAdminShow = () => {
  const selectedMovieId = useSelector(state => state.movie.selectedMovie?.id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!selectedMovieId) return;

      try {
        const response = await fetch(`${URL_API}movies/${selectedMovieId}`);
        if (response.ok) {
          const movieData = await response.json();
          setMovie(movieData.data);
        } else {
          console.error('Error fetching movie:', response.statusText);
          setError('Error fetching movie');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Error fetching movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [selectedMovieId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}movies/${selectedMovieId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log('Usuario eliminado:', selectedMovieId);
          // Aquí podrías realizar cualquier acción adicional después de la eliminación del usuario
        } else {
          console.error('Error deleting movie:', response.statusText);
          // Manejo de errores si la eliminación no fue exitosa
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        // Manejo de errores si ocurre algún problema con la solicitud HTTP
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Name: {movie.name}</p>
      <p>Email: {movie.email}</p>
      <p>ID: {movie.id}</p>
      <button onClick={handleDelete}>Delete Movie</button>
      <Link to="/movies-admin">Back to Movie List</Link>
      {/* Render other movie details as needed */}
    </div>
  );
};

export default MovieAdminShow;
