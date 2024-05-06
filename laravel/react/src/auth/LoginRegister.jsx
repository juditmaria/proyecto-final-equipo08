import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export const LoginRegister = () => {
    const [isLogin, setLogin] = useState(true);

    return (
        <>
            {isLogin ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
        </>
    );
};