import React from 'react';

const PopupWithForm = ({title, name, button, children, isOpen, onClose, onSubmit}) => {

    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
		<div className="popup__container">
			<h2 className="popup__title">{title}</h2>
			<button type="button" onClick={onClose} className="popup__close-button" value=" "
				aria-label="Закрыть"></button>
			<form onSubmit={onSubmit} action="test" method="get" className="popup__form" name={name} id="place-form"
				noValidate>
                    {children}
                    <button type="submit" className="popup__save-button" aria-label="Сохранить">{button}</button>   
			</form>
		</div>
	</section>
    );
};

export default PopupWithForm;