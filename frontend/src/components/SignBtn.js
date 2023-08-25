import React from 'react';

const SignBtn = ({text, handleClick, className}) => {
    return (
        <button onClick={handleClick} className={className}>{text}</button>
    );
};

export default SignBtn;