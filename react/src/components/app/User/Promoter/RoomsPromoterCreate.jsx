import React, { useState } from 'react';
import { URL_API } from '../../../../constants';

const RoomPromoterCreate = () => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [numLine, setNumLine] = useState('');
    const [numSeat, setNumSeat] = useState('');
    const [hour, setHour] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${URL_API}rooms`, {
                method: 'POST',
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
                // Redirige al usuario a la lista de salas después de crear la sala
                window.location.href = '/rooms-promoter';
            } else {
                setError('Error creating room');
            }
        } catch (error) {
            setError('Error creating room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Room</h2>
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
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default RoomPromoterCreate;
