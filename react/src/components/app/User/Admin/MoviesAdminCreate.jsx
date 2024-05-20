import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { URL_API } from '../../../../constants';
import { setMovies } from '../../../../slices/movie/movieSlice';

const MovieAdminCreate = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [length, setLength] = useState('');
    const [type, setType] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [trailer, setTrailer] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('director', director);
            formData.append('length', length);
            formData.append('type', type);
            formData.append('release_year', releaseYear);
            formData.append('trailer', trailer);
            formData.append('image', image);

            const response = await fetch(URL_API + 'movies', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const newMovie = await response.json();
                dispatch(setMovies(prevMovies => [...prevMovies, newMovie]));
                // Navegar de vuelta a la lista de películas
                window.location.href = '/movies-admin';
            } else {
                setError('Error creating movie');
            }
        } catch (error) {
            setError('Error creating movie');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Create Movie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </div>
                <div>
                    <label>Length:</label>
                    <input
                        type="text"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Release Year:</label>
                    <input
                        type="text"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Trailer:</label>
                    <input
                        type="text"
                        value={trailer}
                        onChange={(e) => setTrailer(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default MovieAdminCreate;
