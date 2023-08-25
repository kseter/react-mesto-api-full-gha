import React  from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({cards, onEditProfile, onAddPlace, onEditAvatar, 
	onCardClick, onCardLike, onCardDelete}) => {
		
	const currectUser = React.useContext(CurrentUserContext);
    
    return (
    	<main className="content">
			<section className="profile">
				<div className="profile__container">
					<img style={{backgroundImage: `url(${currectUser.avatar})`}} alt="" className="profile__avatar" />
					<div className="profile__overlay" onClick={onEditAvatar}></div>
				</div>
				<div className="profile__info">
					<h1 className="profile__user-name">{currectUser.name}</h1>
					<button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
					<p className="profile__user-about">{currectUser.about}</p>
				</div>
				<button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
			</section>
			<section 
				className="elements">
				{cards.map((card) => 
				<div key={card._id}>
					<Card 
					card={card}
					onCardClick={(card) => onCardClick(card)}
					onCardLike={(card) => onCardLike(card)}
					onCardDelete={(card) => onCardDelete(card)}
					/>
				</div>
				)}
			</section>
	</main>
    );
};

export default Main;