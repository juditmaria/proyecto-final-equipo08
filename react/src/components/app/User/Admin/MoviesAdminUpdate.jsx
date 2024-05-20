import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../../../../constants';
import { setMovies } from '../../../../slices/movie/movieSlice';

const MovieAdminUpdate = () => {
    const dispatch = useDispatch();
    const selectedMovie = useSelector(state => state.movie.selectedMovie);
    const [title, setTitle] = useState(selectedMovie ? selectedMovie.title : '');
    const [description, setDescription] = useState(selectedMovie ? selectedMovie.description : '');
    const [director, setDirector] = useState(selectedMovie ? selectedMovie.director : '');
    const [length, setLength] = useState(selectedMovie ? selectedMovie.length : '');
    const [type, setType] = useState(selectedMovie ? selectedMovie.type : '');
    const [releaseYear, setReleaseYear] = useState(selectedMovie ? selectedMovie.release_year : '');
    const [trailer, setTrailer] = useState(selectedMovie ? selectedMovie.trailer : '');
    const [image, setImage] = useState(selectedMovie ? selectedMovie.image : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedMovie) {
            setError('No movie selected');
        }
    }, [selectedMovie]);

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

            const response = await fetch(URL_API + `movies/${selectedMovie.id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                const updatedMovie = await response.json();
                dispatch(setMovies(prevMovies =>
                    prevMovies.map(movie => (movie.id === selectedMovie.id ? updatedMovie : movie))
                ));
                // Navegar de vuelta a la lista de películas
                window.location.href = '/movies-admin';
            } else {
                setError('Error updating movie');
            }
        } catch (error) {
            setError('Error updating movie');
        } finally {
            setLoading(false);
        }
    };

    if (!selectedMovie) return <div>No movie selected</div>;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Edit Movie</h1>
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default MovieAdminUpdate;
