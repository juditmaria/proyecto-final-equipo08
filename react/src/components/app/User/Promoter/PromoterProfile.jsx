import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPromoterId, setPromoterName, setError } from '../../../../slices/promoter/promoterSlice';
import { useNavigate } from 'react-router-dom';
import { URL_API } from '../../../../constants';

import Image from 'react-bootstrap/Image';
import PromoterProfileDefaultImage from '../../../../assets/promoterProfileDefault.jpg';

//STYLE
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const Promoter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const promoterName = useSelector((state) => state.promoter.promoterName);
  const promoterId = localStorage.getItem('promoterId');
  const userId = localStorage.getItem('userId');
  // const promoterName = localStorage.getItem('promoterName');
  
  // Determinar el borde del Card
  let colorBorder = "#6c757d";

  const [iconSave, setIconSave] = useState(false);
  const [close, setClose] = useState(false);
  
  const [showInputGroup, setShowInputGroup] = useState(false);
  const toggleInputGroup = () => setShowInputGroup(!showInputGroup);

  const [newPromoterName, setNewPromoterName] = useState(promoterName);
  const [createPromoterName, setCreatePromoterName] = useState("");

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('name', createPromoterName);
   /*  if (image) {
      formData.append('image', image);
    } */
    try {
      const response = await fetch(URL_API + 'promoters', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        dispatch(setPromoterId(result.data.id));
        dispatch(setPromoterName(createPromoterName));
        localStorage.setItem('promoterId', result.data.id);
        localStorage.setItem('promoterName', createPromoterName);
      } else {
        dispatch(setError(result.message || 'Error al crear el promotor'));
      }
    } catch(error) {
      dispatch(setError('Error de red'));
    }
  }
 
  const handleUpdate = async () => {
      try {
        const response = await fetch(URL_API+`promoters/${promoterId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: newPromoterName,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setError(result.message);
          localStorage.setItem('promoterName', newPromoterName);
          dispatch(setPromoterName(newPromoterName));
        } else {
          setError(result.message || 'Something went wrong');
        }
      } catch (error) {
          setError('Network error');
      }
    };

    const handleDelete = async () => {
      try {
        const response = await fetch(URL_API+`promoters/${promoterId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          setError(result.message);
        } else {
          setError(result.message || 'No se ha podido eliminar el promotor');
        }
      } catch (error) {
          setError('Network error');
      }
      navigate('/');
    };

    const handleClick = () => {
      toggleInputGroup();
      handleUpdate();
    };

    const handleClickClose = () => {
      toggleInputGroup();
      setNewPromoterName("");
    };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Card border="secondary" style={{ width: '30rem', background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '1%', }}>
          
          <small>
            <p className='m-0 text-muted'><i className="bi bi-person-vcard-fill inline-block"></i> {' '} Perfil de Promotor</p>
          </small>
            
          {promoterId != "" ? (
              <>
                <div className="d-flex justify-content-center mt-3">
                  <Image src={PromoterProfileDefaultImage} roundedCircle className="profileImg" style={{ width: '150px', height: '150px' }} />
                </div>
                <Card.Body>
                {showInputGroup ? (
                  <>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={newPromoterName}
                            onChange={(e) => setNewPromoterName(e.target.value)}
                            aria-label="Nuevo nombre de promotor"
                            placeholder={promoterName}
                        />
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
                        {promoterName}
                      </Card.Title>
                      <Card.Title 
                          onClick={toggleInputGroup}
                          className='p-1'
                      >
                          <small>Se pueden comprar efectos especiales, no la magia.</small>
                      </Card.Title> 
                    </>
                  )}
                </Card.Body>
                <Card.Footer>
                  <Button onClick={handleDelete} variant="outline-danger" size="sm">Borrar promotor</Button>
                </Card.Footer>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center mt-3">
                  <Image src={PromoterProfileDefaultImage} roundedCircle className="profileImg" style={{ width: '150px', height: '150px' }} />
                </div>
                <Card.Body>
                  <InputGroup className="mb-3">
                  <Form.Control
                      value={createPromoterName}
                      onChange={(e) => setCreatePromoterName(e.target.value)}
                      aria-label="Nombre de Promotor"
                      placeholder="Nombre de Promotor"
                  />
                  </InputGroup>                     
                </Card.Body>
                <Card.Footer>
                  <Button onClick={handleCreate} variant="success">Crear promotor</Button>
                </Card.Footer>
              </>
            )}
          </Card>
      </div>
    </>
  )
}

export default Promoter