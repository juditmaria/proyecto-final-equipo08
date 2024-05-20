import React, { useState, useEffect } from 'react';
import { URL_API } from '../../../../constants';
import { Link } from 'react-router-dom';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        {room.name} - {room.capacity}
                        <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                        <Link to={`/rooms-promoter/${room.id}`}>Show</Link>
                        <Link to={`/rooms-promoter/${room.id}/update`}>Update</Link>
                    </li>
                ))}
                <Link to={`/rooms-promoter/create`}>Crear Room</Link>
            </ul>
        </div>
    );
};

export default RoomPromoterList;
