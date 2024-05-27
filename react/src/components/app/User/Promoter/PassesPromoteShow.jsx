import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPasses } from '../../../../slices/passes/passesSlice';
import { Button, Container, ListGroup } from 'react-bootstrap';

const PassesPromoterShow = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const passes = useSelector(state => state.passes.passes);

    const [pass, setPass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPass = async () => {
            try {
                const response = await fetch(`${URL_API}passes/${id}`);
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
        <Container className="my-5">
            <h1 className="mb-4">Pass Details</h1>
            <ListGroup variant="flush" style={{ margin: '0 auto', maxWidth: '30%' }}>
                <ListGroup.Item><strong>Movie:</strong> {pass.movie_id}</ListGroup.Item>
                <ListGroup.Item><strong>Room:</strong> {pass.room_id}</ListGroup.Item>
                <ListGroup.Item><strong>Location:</strong> {pass.location_id}</ListGroup.Item>
                <ListGroup.Item><strong>Date:</strong> {pass.date}</ListGroup.Item>
                <ListGroup.Item><strong>Time:</strong> {pass.start_time}</ListGroup.Item>
            </ListGroup>
            <div className="mt-3 d-flex justify-content-center">
                <Button variant="danger" className="me-2" onClick={handleDelete}>Delete Pass</Button>
                <Button variant="secondary" onClick={() => window.history.back()}>Back to Passes List</Button>
            </div>
        </Container>
    );
};

export default PassesPromoterShow;
