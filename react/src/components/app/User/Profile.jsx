import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setUserMail, setError } from '../../../slices/auth/authSlice';
import { URL_API } from '../../../constants';

import Image from 'react-bootstrap/Image';
import ProfileDefaultImage from '../../../assets/profileDefault.jpg';

//STYLE
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';

const Profile = () => {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.auth.userId);
    const userName = useSelector((state) => state.auth.userName);
    const userMail = useSelector((state) => state.auth.userMail);
    const profileImg = useSelector((state) => state.profile.profileImg);
    
    const role = localStorage.getItem('role');
    const promoterId = localStorage.getItem('promoterId');

    // Determinar el borde del Card
    let cardBorder = 'info';
    let userType = (
        <p className='text-info m-0'><i className="bi bi-person-fill inline-block"></i> {' '} Usuario</p>
    );
    let colorBorder = "#0dcaf0";

    if (role === '1') {
        cardBorder = 'danger';
        userType = (
            <p className='text-danger m-0'><i className="bi bi-shield-shaded inline-block"></i> {' '} Administrador</p>
        )
        colorBorder = "#dc3545";
    } else if (promoterId && promoterId !== '' && role !== '1') {
        cardBorder = 'primary';
        userType = (
            <p className='text-primary m-0'><i className="bi bi-shop inline-block"></i> {' '} Promotor</p>
        )
        colorBorder = "#0d6efd";   
    }

    const [iconSave, setIconSave] = useState(false);
    const [iconSee, setIconSee] = useState(false);
    const [close, setClose] = useState(false);
    
    const [showInputGroup, setShowInputGroup] = useState(false);
    const toggleInputGroup = () => setShowInputGroup(!showInputGroup);

    const [newUserName, setNewUserName] = useState(userName);
    const [newUserMail, setNewUserMail] = useState(userMail);
    const [newUserPassword, setNewUserPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar la contraseña como texto legible

    // Función para mostrar u ocultar la contraseña como texto legible
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdate = async () => {
        try {
          const response = await fetch(URL_API+`users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: newUserName,
              email: newUserMail,
              password: newUserPassword,
            }),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            setError(result.message);
            localStorage.setItem('userName', newUserName);
            localStorage.setItem('userMail', newUserMail);
            dispatch(setUserName(newUserName));
            dispatch(setUserMail(newUserMail));
          } else {
            setError(result.message || 'Something went wrong');
          }
        } catch (error) {
            setError('Network error');
        }
      };

      const handleClick = () => {
        toggleInputGroup();
        handleUpdate();
        setNewUserPassword("");
      };

      const handleClickPassword = () => {
        togglePasswordVisibility();
      };

      const handleClickClose = () => {
        toggleInputGroup();
        setNewUserPassword("");
      };
      
    return (
        <>    
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Card border={cardBorder} style={{ width: '30rem', background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '1%', }}>
                    
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
                            <>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        aria-label="Nuevo nombre de usuario"
                                        placeholder={userName}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        value={newUserMail}
                                        onChange={(e) => setNewUserMail(e.target.value)}
                                        aria-label="Nuevo correo electrónico de usuario"
                                        placeholder={userMail}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        value={newUserPassword}
                                        onChange={(e) => setNewUserPassword(e.target.value)}
                                        aria-label="Nueva contraseña de usuario"
                                        placeholder="Introduce nueva contraseña" // Actualiza el placeholder a una cadena vacía
                                        type={showPassword ? "text" : "password"} // Añade esta línea para cambiar el tipo de input
                                    />

                                    <InputGroup.Text
                                        className='bg-dark d-flex justify-content-center align-items-center'
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setIconSee(true)}
                                        onMouseLeave={() => setIconSee(false)}
                                        onClick={handleClickPassword}
                                    >
                                        <i className={`bi ${iconSee ? 'bi-eye-fill' : 'bi-eye'}`}></i>
                                    </InputGroup.Text>
                                </InputGroup>

                                <InputGroup className='d-flex justify-content-center align-items-center'>
                                    <InputGroup.Text
                                        className='bg-dark'
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setIconSave(true)}
                                        onMouseLeave={() => setIconSave(false)}
                                        onClick={handleClick}
                                    >
                                        <i className={`bi ${iconSave ? 'bi-floppy-fill' : 'bi-floppy'}`}></i>
                                    </InputGroup.Text>
                                    <InputGroup.Text
                                        className='bg-dark'
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setClose(true)}
                                        onMouseLeave={() => setClose(false)}
                                        onClick={handleClickClose}
                                    >
                                        <i className={`text-danger bi ${close ? 'bi-x-lg' : 'bi-x'}`}></i>
                                    </InputGroup.Text>
                                </InputGroup>
                            </>
                        ) : (
                            <>
                                <Card.Title 
                                    onClick={toggleInputGroup}
                                    className='p-1'
                                    style={{ 
                                        cursor: 'pointer',
                                        borderBottom: `2px solid ${colorBorder}`
                                    }}
                                >
                                    {userName}
                                </Card.Title>
                                <Card.Title 
                                    onClick={toggleInputGroup}
                                    className='p-1'
                                    style={{ 
                                        cursor: 'pointer',
                                        borderBottom: `2px solid ${colorBorder}`
                                    }}
                                    
                                >
                                    {userMail}
                                </Card.Title>
                                <Card.Title 
                                    onClick={toggleInputGroup}
                                    className='p-1'
                                    style={{ 
                                        cursor: 'pointer',
                                        borderBottom: `2px solid ${colorBorder}`
                                    }}
                                >
                                    <small>Nunca guardamos tus secretos, solo los protegemos</small>
                                </Card.Title> 
                            </>
                        )}
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