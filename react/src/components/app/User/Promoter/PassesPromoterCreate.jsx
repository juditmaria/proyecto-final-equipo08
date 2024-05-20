import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setPasses } from '../../../../slices/passes/passesSlice';
import { format } from 'date-fns'; // Importa la función de formateo de date-fns

const PassesAdminCreate = () => {
    const dispatch = useDispatch();
    const { id, passId } = useParams(); // Added passId from useParams
    const [movieId, setMovieId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${URL_API}movies`);
                if (response.ok) {
                    const data = await response.json();
                    setMovies(data.data);
                } else {
                    setError('Error fetching movies');
                }
            } catch (error) {
                setError('Error fetching movies');
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await fetch(`${URL_API}rooms`);
                if (response.ok) {
                    const data = await response.json();
                    setRooms(data.data);
                } else {
                    setError('Error fetching rooms');
                }
            } catch (error) {
                setError('Error fetching rooms');
            }
        };

        fetchMovies();
        fetchRooms();
    }, []);

    useEffect(() => {
        // Fetch pass data if passId exists (for update)
        const fetchPass = async () => {
            try {
                const response = await fetch(`${URL_API}passes/${passId}`);
                if (response.ok) {
                    const data = await response.json();
                    setMovieId(data.movie_id);
                    setRoomId(data.room_id);
                    setDate(new Date(data.date));
                    setStartTime(data.start_time);
                } else {
                    setError('Error fetching pass');
                }
            } catch (error) {
                setError('Error fetching pass');
            }
        };

        if (passId) {
            fetchPass();
        }
    }, [passId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let method = 'POST';
            let url = `${URL_API}passes`;
            if (passId) {
                method = 'PUT';
                url = `${URL_API}passes/${passId}`;
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movie_id: movieId,
                    room_id: roomId,
                    date: format(date, 'yyyy-MM-dd'),
                    start_time: startTime,
                    location_id: id
                })
            });

            if (response.ok) {
                const updatedPass = await response.json();
                if (passId) {
                    // If updating, replace the existing pass with the updated one
                    dispatch(setPasses(prevPasses => prevPasses.map(pass => pass.id === parseInt(passId) ? updatedPass : pass)));
                } else {
                    // If creating, add the new pass to the existing list of passes
                    dispatch(setPasses(prevPasses => [...prevPasses, updatedPass]));
                }
                window.location.href = `/locations-promoter/${id}/passes`;
            } else {
                setError('Error ' + (passId ? 'updating' : 'creating') + ' pass');
            }
        } catch (error) {
            setError('Error ' + (passId ? 'updating' : 'creating') + ' pass');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{passId ? 'Update' : 'Create'} Pass</h1> {/* Changed title based on passId existence */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Movie:</label>
                    <select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
                        <option value="">Select a movie</option>
                        {movies.map(movie => (
                            <option key={movie.id} value={movie.id}>{movie.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Room:</label>
                    <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                        <option value="">Select a room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="text"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <button type="submit">{passId ? 'Update' : 'Create'}</button> {/* Changed button text based on passId existence */}
            </form>
        </div>
    );
};

export default PassesAdminCreate;
