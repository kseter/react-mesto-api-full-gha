import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange =(e)=> {
        setEmail(e.target.value);
    };

    const handlePasswordChange =(e)=> {
        setPassword(e.target.value);
    };

   const handleLoginSubmit =(e) => {
    e.preventDefault();
    onLogin({email, password });
   };

    return (
        <section className="enter-page">
            <h1 className='enter-page__title'>Вход</h1>
            <form className='enter-page__form'>
                <div className='enter-page__input-container'>
                    <input 
                    type="email" 
                    className="enter-page__input enter-page__input_type-signup-email" 
                    value={email || ''} 
                    onChange={handleEmailChange}
                    name="email"
                    placeholder='Email'
                    id="signup-input-email" required={true}></input>
                </div>
                <div className='enter-page__input-container'>
                    <input
                    type="password" 
                    className="enter-page__input registration__input_type-signup-email" 
                    value={password || ''} 
                    onChange={handlePasswordChange}
                    name="password"
                    placeholder='Password'
                    id="signup-input-password" required={true}></input> 
                </div>
                <button type="submit" onClick={handleLoginSubmit} className='enter-page__button'>Войти</button>
            </form>
    </section>
    );
};

export default Login;