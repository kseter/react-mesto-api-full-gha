import React from 'react';

const ImagePopup = ({card, isOpen, onClose}) => {
	return (
		<section className={`popup popup_type_image-fullscreen ${isOpen && 'popup_opened'}`} onClick={onClose}>
			<div className="popup__container popup__container_type_image-fullscreen">
				<div className="popup__image-container">
					<button type="button" 
					onClick={onClose} 
					className="popup__close-button popup__close-button_type_image-fullscreen" 
					value=" "
					aria-label="Закрыть"></button>
					<img src={card.link} className="popup__image" alt={card.name} onClick={evt=> evt.stopPropagation()}/>
					<p className="popup__paragraph">{card.name}</p>
				</div>
			</div>
		</section>
		);
	};

export default ImagePopup;