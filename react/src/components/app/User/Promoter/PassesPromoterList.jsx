import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../../../../constants';
import { setPasses, setLoading, setError, setSelectedPassId } from '../../../../slices/passes/passesSlice';
import { Button, Container } from 'react-bootstrap';

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
                const response = await fetch(`${URL_API}passes`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.data);
                    const filteredPasses = data.data.filter(pass => pass.location_id === parseInt(id, 10));
                    dispatch(setPasses(filteredPasses));
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
                    dispatch(setPasses(passes.filter(pass => pass.id !== passId)));
                } else {
                    console.error('Error deleting pass:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting pass:', error);
            }
        }
    };

    const handleShowPass = (passId) => {
        dispatch(setSelectedPassId(passId));
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="text-center my-5">Error: {error}</div>;

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">Passes for Location {id}</h1>
            <ul className="list-unstyled">
                {passes.map(pass => (
                    <li key={pass.id} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Movie:</strong> {pass.movie.title} - <strong>Room:</strong> {pass.room.name} - <strong>Location:</strong> {pass.location.name} - <strong>Date:</strong> {pass.date} - <strong>Time:</strong> {pass.start_time}
                        </div>
                        <div>
                            <Link
                                onClick={() => handleShowPass(pass.id)}
                                to={`/passes-promoter/${pass.id}`}
                                className="btn btn-primary btn-sm me-2"
                                title="Show"
                            >
                                <i className="bi bi-eye"></i>
                            </Link>
                            <Button
                                onClick={() => handleDelete(pass.id)}
                                variant="danger"
                                size="sm"
                                title="Delete"
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                            <Link
                                to={`/passes-promoter/${pass.id}/update`}
                                className="btn btn-secondary btn-sm ms-2"
                                title="Update"
                            >
                                Update
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to={`/passes-promoter/create/${id}`} className="btn btn-success">Create Pass</Link>
        </Container>
    );
};

export default PassesPromoterList;
