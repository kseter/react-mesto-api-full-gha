import React from 'react';
import { Route, Routes } from 'react-router';
import SignBtn from './SignBtn';

const NavBar = ({userEmail, handleSighOut}) => {
    return (
        <div>
            <div className='header__icon'></div>
                <ul className='header__navbar'>
                    <li className='header__email'>{userEmail}</li>
                    <li className='header__link'>
                        <Routes>
                            <Route 
                            path="/" 
                            element={<SignBtn 
                            text={"Выйти"}
                            handleClick={handleSighOut}
                            className={"header__btn"}
                            />} />
                        </Routes>
                    </li>
                </ul>
        </div>
    );
};

export default NavBar;