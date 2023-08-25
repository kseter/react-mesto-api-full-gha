import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({onRegister, handleInfoTooltipOpen}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmailChange =(e)=> {
        setEmail(e.target.value);
    };

    const handlePasswordChange =(e)=> {
        setPassword(e.target.value);
    };

    const handleRegisterSubmit =(e)=> {
        e.preventDefault();
        onRegister({email, password});
    };

    return (
        <section className="enter-page">
            <h1 className='enter-page__title'>Регистрация</h1>
            <form className='enter-page__form'>
                <div className='enter-page__input-container'>
                    <input 
                    type="email" 
                    className="enter-page__input enter-page__input_type-signup-email" 
                    value={email} 
                    onChange={handleEmailChange}
                    name="email"
                    placeholder='Email'
                    id="signup-input-email" required={true}></input>
                </div>
                <div className='enter-page__input-container'>
                    <input
                    type="password" 
                    className="enter-page__input registration__input_type-signup-email" 
                    value={password} 
                    onChange={handlePasswordChange}
                    name="password"
                    placeholder='Password'
                    id="signup-input-password" required={true}></input> 
                </div>
                <button type="submit" onClick={handleRegisterSubmit} className='enter-page__button'>Зарегистрироваться</button>
            </form>
            <div className='enter-page__paragraph-container'>
                <p className='enter-page__paragraph'>Уже зарегистрированы?</p> 
                <Link style={{color:'white', textDecoration:'none', fontFamily:'Inter', 
                fontSize: '14px',  }} to="/sign-in">&nbsp;Войти</Link>
            </div>
        </section>
    );
};

export default Register;