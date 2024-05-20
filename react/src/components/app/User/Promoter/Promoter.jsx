import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Promoter = ({ activeButton, setActiveButton }) => {
    return (
        <div className="d-flex justify-content-center align-items-center m-4">
            {/* Botón para la ruta "/profile-promoter" */}
            <Button className="m-2 ">
                <Link to="/profile-promoter" className="text-white">PERFIL</Link>
            </Button>
            {/* Botón para la ruta "/locations-promoter" */}
            <Button className="m-2 ">
                <Link to="/locations-promoter" className="text-white">UBICACIONES</Link>
            </Button>
            {/* Botón para la ruta "/rooms-promoter" */}
            <Button className="m-2">
                <Link to="/rooms-promoter" className="text-white">SALAS</Link>
            </Button>
        </div>
    );
};

export default Promoter;
