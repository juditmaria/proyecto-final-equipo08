import React, {useContext} from 'react'
import { UserContext } from "../../userContext";
import { URL_API } from '../../constants';

export const Header = () => {

const { authToken, setAuthToken } = useContext(UserContext);

const logout = async () => {
    try {
        const response = await fetch(URL_API + 'logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (response.ok) {
            setAuthToken('');
            localStorage.removeItem('authToken');
        } else {
            console.error('Error al cerrar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

  return (
    <div>
        <nav>
            CinemasWEB     
            <div>
                <a onClick={logout} href="#">logout</a>
            </div>
        </nav>
    </div>
  )
}