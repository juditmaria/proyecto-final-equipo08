import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setSelectedMovie } from '../../../../slices/movie/movieSlice';

const MovieAdminList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);
    console.log('movies', movies)
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(URL_API + 'movies');
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setMovies(data.data));
                } else {
                    console.error('Error fetching movies:', response.statusText);
                    setError('Error fetching movies');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Error fetching movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleClick = (movie) => {
        dispatch(setSelectedMovie(movie));
        console.log('dispatch', movie);
    };
    
    const handleDelete = async (movieId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}movies/${movieId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    console.log('Movie deleted:', movieId);
                    // Actualizar el estado local eliminando la ubicación de la lista
                    dispatch(setMovies(movies.filter(movie => movie.id !== movieId)));
                } else {
                    console.error('Error deleting movie:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        }
    };

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.title} - 
                        <Link onClick={() => handleClick(movie)} to={`/movies-admin/${movie.id}`}>
                            <i className="bi bi-eye"></i>
                        </Link>
                        <Link onClick={() => handleClick(movie)} to={`/movies-admin/${movie.id}/update`}>
                            <i className="bi bi-pen"></i>
                        </Link>
                        <button onClick={() => handleDelete(movie.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </li>
                ))}
                <Link to={`/movies-admin/create`}>
                    Crear
                </Link>
            </ul>
        </div>
    );
};

export default MovieAdminList;
