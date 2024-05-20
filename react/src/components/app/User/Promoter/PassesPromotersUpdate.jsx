import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setPasses } from '../../../../slices/passes/passesSlice';
import { format } from 'date-fns'; // Importa la función de formateo de date-fns

const PassesAdminUpdate = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const [movieId, setMovieId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]); // Estado para almacenar la lista de películas
    const [rooms, setRooms] = useState([]); // Estado para almacenar la lista de salas

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${URL_API}movies`);
                if (response.ok) {
                    const data = await response.json();
                    setMovies(data.data); // Guarda la lista de películas en el estado
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
                    setRooms(data.data); // Guarda la lista de salas en el estado
                } else {
                    setError('Error fetching rooms');
                }
            } catch (error) {
                setError('Error fetching rooms');
            }
        };

        fetchMovies();
        fetchRooms();
    }, []); // Ejecuta la solicitud solo una vez al montar el componente

    useEffect(() => {
        const fetchPass = async () => {
            try {
                const response = await fetch(`${URL_API}passes/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const passData = data.data;
                    setMovieId(passData.movie_id);
                    setRoomId(passData.room_id);
                    setDate(new Date(passData.date));
                    setStartTime(passData.start_time);
                } else {
                    setError('Error fetching pass');
                }
            } catch (error) {
                setError('Error fetching pass');
            }
        };

        fetchPass();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${URL_API}passes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movie_id: movieId,
                    room_id: roomId,
                    date: format(date, 'yyyy-MM-dd'), // Formatea la fecha antes de enviarla
                    start_time: startTime,
                    location_id: id
                })
            });
            console.log('response', response)
            if (response.ok) {
                // Actualiza el estado de los pases después de la actualización
                const updatedPass = await response.json();
                dispatch(setPasses(updatedPass));
                // Redirige al usuario a la lista de pases después de la actualización
                window.location.href = `/locations-promoter/${id}/passes`;
            } else {
                setError('Error updating pass');
            }
        } catch (error) {
            setError('Error updating pass');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Update Pass</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Movie:</label>
                    <select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
                        <option value="">Select a movie</option>
                        {/* Mapea la lista de películas para crear las opciones del desplegable */}
                        {movies.map(movie => (
                            <option key={movie.id} value={movie.id}>{movie.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Room:</label>
                    <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                        <option value="">Select a room</option>
                        {/* Mapea la
                {/* Mapea la lista de salas para crear las opciones del desplegable */}
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default PassesAdminUpdate;
