import React, { useState, useEffect } from 'react';
import { URL_API } from '../../../../constants';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';


const ShowRoom = () => {
   const { id } = useParams();
   const [room, setRoom] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);


   useEffect(() => {
       const fetchRoom = async () => {
           try {
               const response = await fetch(`${URL_API}rooms/${id}`);
               if (response.ok) {
                   const data = await response.json();
                   setRoom(data.data);
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


   const handleDeleteRoom = async () => {
       const confirmDelete = window.confirm('Are you sure you want to delete this room?');
       if (confirmDelete) {
           try {
               const response = await fetch(`${URL_API}rooms/${id}`, {
                   method: 'DELETE'
               });
               if (response.ok) {
                   window.location.href = '/rooms-promoter';
               } else {
                   setError('Error deleting room');
               }
           } catch (error) {
               setError('Error deleting room');
           }
       }
   };


   if (loading) return (
       <Container className="text-center my-5">
           <Spinner animation="border" />
           <div>Loading...</div>
       </Container>
   );
   if (error) return (
       <Container className="text-center my-5">
           <Alert variant="danger">{error}</Alert>
       </Container>
   );
   if (!room) return (
       <Container className="text-center my-5">
           <Alert variant="warning">Room not found</Alert>
       </Container>
   );


   return (
       <Container className="my-5">
           <Row className="justify-content-center">
               <Col md={8} lg={6}>
                   <h2 className="mb-4 text-center">{room.name}</h2>
                   <ListGroup variant="flush" style={{ margin: '0 auto', maxWidth: '50%' }}>
                       <ListGroup.Item><strong>Capacity:</strong> {room.capacity}</ListGroup.Item>
                       <ListGroup.Item><strong>Lines:</strong> {room.num_line}</ListGroup.Item>
                       <ListGroup.Item><strong>Seats:</strong> {room.num_seat}</ListGroup.Item>
                       <ListGroup.Item><strong>Hour:</strong> {room.hour}</ListGroup.Item>
                   </ListGroup>
                   <Button variant="danger m-4" onClick={handleDeleteRoom}>
                       Delete
                   </Button>
                   <Link to="/rooms-promoter">
                       <Button variant="secondary">
                           Go Back to Rooms Promoter
                       </Button>
                   </Link>
               </Col>
           </Row>
       </Container>
   );
};


export default ShowRoom;