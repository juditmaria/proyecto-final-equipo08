import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';

const RoomPromoterUpdate = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [numLine, setNumLine] = useState('');
    const [numSeat, setNumSeat] = useState('');
    const [hour, setHour] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch(`${URL_API}rooms/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const roomData = data.data;
                    setName(roomData.name);
                    setCapacity(roomData.capacity);
                    setNumLine(roomData.num_line);
                    setNumSeat(roomData.num_seat);
                    setHour(roomData.hour);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${URL_API}rooms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    capacity: parseInt(capacity),
                    num_line: parseInt(numLine),
                    num_seat: parseInt(numSeat),
                    hour
                })
            });
            if (response.ok) {
                // Redirige al usuario a la lista de salas después de actualizar la sala
                window.location.href = '/rooms-promoter';
            } else {
                setError('Error updating room');
            }
        } catch (error) {
            setError('Error updating room');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Update Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Capacity:</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Number of Lines:</label>
                    <input
                        type="number"
                        value={numLine}
                        onChange={(e) => setNumLine(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Number of Seats per Line:</label>
                    <input
                        type="number"
                        value={numSeat}
                        onChange={(e) => setNumSeat(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hour:</label>
                    <input
                        type="text"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default RoomPromoterUpdate;
