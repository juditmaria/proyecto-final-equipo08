import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';

const PassesPromoterList = () => {
    const { id } = useParams();

    const [passes, setPasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPasses = async () => {
            try {
                const response = await fetch(`${URL_API}passes?location_id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPasses(data.data);
                } else {
                    setError('Error fetching passes');
                }
            } catch (error) {
                setError('Error fetching passes');
            } finally {
                setLoading(false);
            }
        };

        fetchPasses();
    }, [id]);

    const handleDelete = async (passId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this pass?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}passes/${passId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    console.log('Pass deleted:', passId);
                    // Actualizar la lista de pases después de la eliminación
                    setPasses(prevPasses => prevPasses.filter(pass => pass.id !== passId));
                } else {
                    console.error('Error deleting pass:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting pass:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Passes for Location {id}</h1>
            <ul>
                {passes.map(pass => (
                    <li key={pass.id}>
                        Movie: {pass.movie_id} - Room: {pass.room_id} - Location: {pass.location_id} - Date: {pass.date} - Time: {pass.start_time}
                        <button onClick={() => handleDelete(pass.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PassesPromoterList;
