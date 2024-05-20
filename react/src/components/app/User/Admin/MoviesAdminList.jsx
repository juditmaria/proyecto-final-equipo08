import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setSelectedMovie } from '../../../../slices/movie/movieSlice';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MovieAdminList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);
    
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

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="text-center my-5">Error: {error}</div>;

    const handleClick = (movie) => {
        dispatch(setSelectedMovie(movie));
    };
    
    const handleDelete = async (movieId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}movies/${movieId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
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
        <Container className="my-5">
            <h1 className="mb-4 text-center">Movies</h1>
            <ul className="list-unstyled">
                {movies.map(movie => (
                    <li key={movie.id} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{movie.title}</strong>
                        </div>
                        <div>
                            <Link
                                onClick={() => handleClick(movie)}
                                to={`/movies-admin/${movie.id}`}
                                className="btn btn-primary btn-sm me-2"
                                title="View"
                            >
                                <i className="bi bi-eye"></i>
                            </Link>
                            <Link
                                onClick={() => handleClick(movie)}
                                to={`/movies-admin/${movie.id}/update`}
                                className="btn btn-secondary btn-sm me-2"
                                title="Edit"
                            >
                                <i className="bi bi-pen"></i>
                            </Link>
                            <Button
                                onClick={() => handleDelete(movie.id)}
                                variant="danger"
                                size="sm"
                                title="Delete"
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </li>
                ))}
                <li className="mt-3">
                    <Link to={`/movies-admin/create`} className="btn btn-success">
                        Crear
                    </Link>
                </li>
            </ul>
        </Container>
    );
};

export default MovieAdminList;
