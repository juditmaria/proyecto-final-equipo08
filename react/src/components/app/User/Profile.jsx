import React from 'react'
import { useSelector } from 'react-redux';

import Image from 'react-bootstrap/Image';
import ProfileDefaultImage from '../../../assets/profileDefault.jpg';

const Profile = () => {
    const userId = useSelector((state) => state.auth.userId);
    const userName = useSelector((state) => state.auth.userName);
    const userMail = useSelector((state) => state.auth.userMail);
    
    return (
        <>
            <Image src={ProfileDefaultImage} roundedCircle className="profileImg" />
            <p>{userName}</p>
            <p>{userMail}</p>
        </>
        
    )
}

export default Profile