import React from 'react';

const CardDeletePopup = ({isOpen, onClose}) => {
    return (
        <section className={`popup popup_type_delete-card ${isOpen && 'popup_opened'}`}>
		<div className="popup__container popup__container_type_delete-card">
			<h2 className="popup__question">Вы уверены?</h2>
			<button type="button" onClick={onClose} className="popup__close-button" value=" " aria-label="Закрыть"></button>
			<input type="submit" className="popup__save-button popup__delete-card-button" value="Да" aria-label="Да" />
		</div>
	</section>
    );
};

export default CardDeletePopup;