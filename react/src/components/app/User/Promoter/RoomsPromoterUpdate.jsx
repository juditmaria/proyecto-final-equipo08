import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';

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

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Update Room</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Group controlId="formRoomName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formRoomCapacity" className="mb-3">
                                <Form.Label>Capacity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formRoomNumLine" className="mb-3">
                                <Form.Label>Number of Lines</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={numLine}
                                    onChange={(e) => setNumLine(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formRoomNumSeat" className="mb-3">
                                <Form.Label>Number of Seats per Line</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={numSeat}
                                    onChange={(e) => setNumSeat(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formRoomHour" className="mb-3">
                                <Form.Label>Hour</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
                                    required
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

export default RoomPromoterUpdate;
