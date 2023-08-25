import React from 'react';
import logoPath from '../images/logo.svg'
import { Route, Routes } from 'react-router-dom'
import SignBtn from './SignBtn';
import NavBar from './NavBar';


const Header = ({userEmail, handleSignOut, navigateToSignIn, navigateToSignUp}) => {
    return (
        <header className="header">
		    <img src={logoPath} alt="Лого Mesto" className="header__logo" />
            <Routes>
                <Route path="/sign-up" element={<SignBtn 
                text={"Войти"}
                handleClick={navigateToSignIn}
                className={"header__btn_white"}
                />}/>
                <Route path="/sign-in" element={<SignBtn 
                text={"Регистрация"}
                handleClick={navigateToSignUp}
                className={"header__btn_white"}
                />}/>
                <Route path='/' element={ 
                    <NavBar 
                        userEmail={userEmail}
                        handleSighOut={handleSignOut}
                        />}/>
            </Routes>
	</header>
    );
};

export default Header;