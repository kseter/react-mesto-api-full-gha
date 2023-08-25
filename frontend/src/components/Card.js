import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }  

    function handleLikeClick(){
        onCardLike(card)
    }

    function handleCardDelete(){
        onCardDelete(card)
    }

    return (
        <article className="element">
            <img 
            src={card.link} 
            alt={`${card.name}`} 
            onClick={handleClick} 
            className="element__image" />
            {isOwn && <button 
            className="element__delete-button" 
            onClick={handleCardDelete} 
            type="button" 
            aria-label="Да"></button>}
            <div className="element__description">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-container">
                <button 
                onClick={handleLikeClick} 
                type="button" 
                className={`element__like-button ${isLiked && 'element__like-button_active'}`} 
                aria-label="Нравится"></button>
                <div className="element__likes-counter">{card.likes.length}</div>
                </div>
            </div>
        </article>
        );
};

export default Card;