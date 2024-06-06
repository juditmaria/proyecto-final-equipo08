import React, { useState, useEffect } from 'react';
import { URL_API } from '../../../../constants';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RoomPromoterList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchRooms();
    }, []);

    const handleDeleteRoom = async (roomId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this room?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}rooms/${roomId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setRooms(rooms.filter(room => room.id !== roomId));
                } else {
                    setError('Error deleting room');
                }
            } catch (error) {
                setError('Error deleting room');
            }
        }
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="text-center my-5">Error: {error}</div>;

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Rooms</h2>
            <ul className="list-unstyled">
                {rooms.map(room => (
                    <li key={room.id} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{room.name}</strong> - {room.capacity}
                        </div>
                        <div>
                            <Button
                                onClick={() => handleDeleteRoom(room.id)}
                                variant="danger"
                                size="sm"
                                title="Delete"
                                className="me-2"
                            >
                                <i className="bi bi-trash"></i> 
                            </Button>
                            <Link to={`/rooms-promoter/${room.id}`} className="btn btn-primary btn-sm me-2" title="Show">
                                <i className="bi bi-eye"></i> 
                            </Link>
                            <Link to={`/rooms-promoter/${room.id}/update`} className="btn btn-secondary btn-sm" title="Update">
                                <i className="bi bi-pencil"></i> 
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to={`/rooms-promoter/create`} className="btn btn-success">Create Room</Link>
        </Container>
    );
};

export default RoomPromoterList;
