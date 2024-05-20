import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPasses } from '../../../../slices/passes/passesSlice';

const PassesPromoterShow = () => {
    const dispatch = useDispatch();
    const passes = useSelector(state => state.passes.passes.id);
    
    const [pass, setPass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log('passesid', passes)
    useEffect(() => {
        const fetchPass = async () => {
            try {
                const response = await fetch(`${URL_API}passes/${passes}`);
                if (response.ok) {
                    const data = await response.json();
                    setPass(data.data);
                } else {
                    setError('Error fetching pass');
                }
            } catch (error) {
                setError('Error fetching pass');
            } finally {
                setLoading(false);
            }
        };

        fetchPass();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this pass?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}passes/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    console.log('Pass deleted:', id);
                    // Actualizar la lista de pases después de la eliminación
                    dispatch(setPasses(passes.filter(pass => pass.id !== id)));
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
            <h1>Pass Details</h1>
            <p>
                Movie: {pass.movie_id} - Room: {pass.room_id} - Location: {pass.location_id} - Date: {pass.date} - Time: {pass.start_time}
            </p>
            <button onClick={handleDelete}>Delete Pass</button>
            <button onClick={() => window.history.back()}>Back to Passes List</button>
        </div>
    );
};

export default PassesPromoterShow;
