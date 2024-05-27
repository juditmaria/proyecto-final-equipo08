import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

import PromoterProfile from '../../../../components/app/User/Promoter/PromoterProfile';

let promoterId = localStorage.getItem("promoterId");

const Promoter = ({ activeButton, setActiveButton }) => {
    // const isPromoter = useSelector((state) => state.promoter.promoterId);

    return (
        <>
            {promoterId != "" ? (
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
                
            ) : (
                <>
                    <PromoterProfile />
                </>
            )}
        </>
    );
};

export default Promoter;
