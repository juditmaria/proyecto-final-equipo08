import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPasses, setLoading, setError, setSelectedPassId } from '../../../../slices/passes/passesSlice'; // Importa la acción setSelectedPassId

const PassesPromoterList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const passes = useSelector(state => state.passes.passes);
    const loading = useSelector(state => state.passes.loading);
    const error = useSelector(state => state.passes.error);

    useEffect(() => {
        const fetchPasses = async () => {
            dispatch(setLoading(true));
            try {
                const response = await fetch(`${URL_API}passes?location_id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setPasses(data.data));
                } else {
                    dispatch(setError('Error fetching passes'));
                }
            } catch (error) {
                dispatch(setError('Error fetching passes'));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchPasses();
    }, [dispatch, id]);

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
                    dispatch(setPasses(passes.filter(pass => pass.id !== passId)));
                } else {
                    console.error('Error deleting pass:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting pass:', error);
            }
        }
    };

    // Función para manejar el clic en el botón "Show"
    const handleShowPass = (passId) => {
        // Despacha la acción para guardar el ID del pase seleccionado en el estado de Redux
        dispatch(setSelectedPassId(passId));
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
                        {/* Usa la función handleShowPass para manejar el clic en el botón "Show" */}
                        <Link onClick={() => handleShowPass(pass.id)} to={`/passes-promoter/${pass.id}`}>
                            Show
                        </Link>
                        {/* Agrega un enlace para actualizar el pase */}
                        <Link to={`/passes-promoter/${pass.id}/update`}>
                            Update
                        </Link>
                    </li>
                ))}
                <Link to={`/passes-promoter/create/${id}`}>
                    Crear Passe
                </Link>
            </ul>
        </div>
    );
};

export default PassesPromoterList;
