import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setLocations } from '../../../../slices/location/locationSlice';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';

const LocationPromoterUpdate = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const selectedUser = useSelector(state => state.promoter.promoterId);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [direction, setDirection] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`${URL_API}locations/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const locationData = data.data;
                    setName(locationData.name);
                    setPhone(locationData.phone);
                    setDirection(locationData.direction);
                } else {
                    setError('Error fetching location');
                }
            } catch (error) {
                setError('Error fetching location');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('promoter_id', selectedUser);
            formData.append('direction', direction);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch(`${URL_API}locations/${id}`, {
                method: 'POST', // Asegúrate de que el servidor soporte POST para actualizaciones
                body: formData,
            });

            if (response.ok) {
                const updatedLocation = await response.json();
                dispatch(setLocations(prevLocations => 
                    prevLocations.map(loc => loc.id === id ? updatedLocation : loc)
                ));
                window.location.href = '/locations-promoter';
            } else {
                setError('Error updating location');
            }
        } catch (error) {
            setError('Error updating location');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Update Location</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Group controlId="formLocationName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formLocationPhone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formLocationDirection" className="mb-3">
                                <Form.Label>Direction</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={direction}
                                    onChange={(e) => setDirection(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formLocationImage" className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control   
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading} className="w-25">
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Container>
    );
};

export default LocationPromoterUpdate;
