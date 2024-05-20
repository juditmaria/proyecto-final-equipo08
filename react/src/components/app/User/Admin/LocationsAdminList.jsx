import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLocations, setSelectedLocation } from '../../../../slices/location/locationSlice';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LocationAdminList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const locations = useSelector(state => state.location.locations);
    
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(URL_API + 'locations');
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setLocations(data.data));
                } else {
                    console.error('Error fetching locations:', response.statusText);
                    setError('Error fetching locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                setError('Error fetching locations');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [dispatch]);

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="text-center my-5">Error: {error}</div>;

    const handleClick = (location) => {
        dispatch(setSelectedLocation(location));
    };
    
    const handleDelete = async (locationId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this location?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}locations/${locationId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    dispatch(setLocations(locations.filter(location => location.id !== locationId)));
                } else {
                    console.error('Error deleting location:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting location:', error);
            }
        }
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">Locations</h1>
            <ul className="list-unstyled">
                {locations.map(location => (
                    <li key={location.id} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{location.name}</strong><br />
                            {location.address}
                        </div>
                        <div>
                            <Link
                                onClick={() => handleClick(location)}
                                to={`/locations-admin/${location.id}`}
                                className="btn btn-primary btn-sm me-2"
                                title="View"
                            >
                                <i className="bi bi-eye"></i>
                            </Link>
                            <Button
                                onClick={() => handleDelete(location.id)}
                                variant="danger"
                                size="sm"
                                title="Delete"
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default LocationAdminList;
