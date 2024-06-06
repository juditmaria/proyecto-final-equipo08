import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLocations, setSelectedLocation } from '../../../../slices/location/locationSlice';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LocationPromoterList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const locations = useSelector(state => state.location.locations);
    const selectedUser = useSelector(state => state.promoter.promoterId);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(URL_API + 'locations');
                if (response.ok) {
                    const data = await response.json();
                    const filteredLocations = data.data.filter(location => location.promoter_id == selectedUser);
                    dispatch(setLocations(filteredLocations));
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

        if (selectedUser !== null && selectedUser !== undefined) {
            fetchLocations();
        } else {
            setLoading(false);
        }
    }, [dispatch, selectedUser]);

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
                            <strong>{location.name}</strong> - Direction: {location.direction}
                        </div>
                        <div>
                            <Link
                                onClick={() => handleClick(location)}
                                to={`/locations-promoter/${location.id}`}
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
                            <Link
                                to={`/locations-promoter/${location.id}/update`}
                                variant=""
                                size="sm"
                                title="Update"
                                className="btn btn-secondary btn-sm"
                            >
                                <i className="bi bi-pencil"></i> 
                            </Link>
                            <Link
                                to={`/locations-promoter/${location.id}/passes`}
                                className="btn btn-secondary btn-sm ms-2"
                                title="Passes"
                            >
                                Passes
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to={`/locations-promoter/create`} className="btn btn-success">Create</Link>
        </Container>
    );
};

export default LocationPromoterList;
