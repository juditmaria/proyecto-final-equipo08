import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { setProfileImg } from '../../../slices/profile/profileSlice';

import Image from 'react-bootstrap/Image';
import ProfileDefaultImage from '../../../assets/profileDefault.jpg';

//STYLE
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';

const Profile = () => {
    const userName = useSelector((state) => state.auth.userName);
    const userMail = useSelector((state) => state.auth.userMail);
    const profileImg = useSelector((state) => state.profile.profileImg);
    
    const role = localStorage.getItem('role');
    const promoterId = localStorage.getItem('promoterId');

    // Determinar el borde del Card
    let color = 'info';
    let userType = (
        <p className='text-info m-0'><i className="bi bi-person-fill inline-block"></i> {' '} Usuario</p>
    );

    if (role === '1') {
        color = 'danger';
        userType = (
            <p className='text-danger m-0'><i className="bi bi-shield-shaded inline-block"></i> {' '} Administrador</p>
        )
    } else if (promoterId && promoterId !== '' && role !== '1') {
        color = 'primary';
        userType = (
            <p className='text-primary m-0'><i className="bi bi-shop inline-block"></i> {' '} Promotor</p>
        )   
    }

    const [iconSave, setIconSave] = useState(false);
    
    const [showInputGroup, setShowInputGroup] = useState(false);
    const toggleInputGroup = () => setShowInputGroup(!showInputGroup);

    return (
        <>    
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Card border={color} style={{ width: '30rem', background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '1%', }}>
                  
                    {userType && <small className="text-muted">{userType}</small>}

                    {/* <small className="text-muted">
                        <Alert variant="danger" dismissible>
                            <i className="bi bi-shield-fill-exclamation admin inline-block"></i> 
                            {' '} Administrador
                            <br />
                            "Un gran poder conlleva una gran responsabilidad".
                        </Alert>
                    </small> */}
                      
                    <div className="d-flex justify-content-center mt-3">
                        <Image src={ProfileDefaultImage} roundedCircle className="profileImg" style={{ width: '150px', height: '150px' }} />
                    </div>
                    <Card.Body>

                    {showInputGroup ? (
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder={userName}
                                    aria-label="Recipient's username"
                                />
                                <InputGroup.Text
                                    className='bg-dark'
                                    onMouseEnter={() => setIconSave(true)}
                                    onMouseLeave={() => setIconSave(false)}
                                    onClick={toggleInputGroup}
                                >
                                    <i className={`bi ${iconSave ? 'bi-floppy-fill' : 'bi-floppy'}`}></i>
                                </InputGroup.Text>
                            </InputGroup>
                        ) : (
                            <Card.Title 
                                onClick={toggleInputGroup}
                                style={{ 
                                    cursor: 'pointer',
                                    borderBottom: `2px solid ${color}` 
                                }}
                            >
                                <div border="">{userName}</div>
                            </Card.Title>
                        )}
                        <Card.Text className='text-muted'>{userMail}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="outline-danger" size="sm">Borrar cuenta</Button>
                    </Card.Footer>
                </Card>
            </div>
        </>
        
    )
}

export default Profile