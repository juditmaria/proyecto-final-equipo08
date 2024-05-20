import React, { useState, useEffect } from 'react';
import { URL_API } from '../../../../constants';
import { useParams, Link } from 'react-router-dom';

const ShowRoom = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch(`${URL_API}rooms/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRoom(data.data);
                } else {
                    setError('Error fetching room');
                }
            } catch (error) {
                setError('Error fetching room');
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id]);

    const handleDeleteRoom = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this room?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}rooms/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    // Redirige al usuario a la lista de salas después de la eliminación
                    window.location.href = '/rooms-promoter';
                } else {
                    setError('Error deleting room');
                }
            } catch (error) {
                setError('Error deleting room');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!room) return <div>Room not found</div>;

    return (
        <div>
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <button onClick={handleDeleteRoom}>Delete</button>
            <Link to="/rooms-promoter">
                <button>Go Back to Rooms Promoter</button>
            </Link>
        </div>
    );
};

export default ShowRoom;
