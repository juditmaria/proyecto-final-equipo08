import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setPasses } from '../../../../slices/passes/passesSlice';
import { format } from 'date-fns';

const PassesAdminUpdate = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const [movieId, setMovieId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
        fetchRooms();
    }, []);

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
                    date: format(date, 'yyyy-MM-dd'),
                    start_time: startTime,
                    location_id: id
                })
            });
            if (response.ok) {
                const updatedPass = await response.json();
                dispatch(setPasses(updatedPass));
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

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Update Pass</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Group controlId="formMovie" className="mb-3">
                                <Form.Label>Movie:</Form.Label>
                                <Form.Select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
                                    <option value="">Select a movie</option>
                                    {movies.map(movie => (
                                        <option key={movie.id} value={movie.id}>{movie.title}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formRoom" className="mb-3">
                                <Form.Label>Room:</Form.Label>
                                <Form.Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                                    <option value="">Select a room</option>
                                    {rooms.map(room => (
                                        <option key={room.id} value={room.id}>{room.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formDate" className="mb-3">
                                <Form.Label>Date:</Form.Label>
                                <DatePicker
                                    selected={date}
                                    onChange={date => setDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                />
                            </Form.Group>
                            <Form.Group controlId="formStartTime" className="mb-3">
                                <Form.Label>Start Time:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading} className="w-25">
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Container>
    );
};

export default PassesAdminUpdate;
