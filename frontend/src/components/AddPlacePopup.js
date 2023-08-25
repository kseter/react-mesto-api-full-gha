import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onPlaceAdd}) => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    React.useEffect(() => {
        setName('')
        setLink('')
    },[isOpen]);

    function handleCardNameChange(e) {
        setName(e.target.value);
    };

    function handleCardLinkChange(e) {
        setLink(e.target.value);
    };

    function handleNewCardSubmit(e){
        e.preventDefault();

        onPlaceAdd({
            name, 
            link
        });
    };

        return (
            <div>
                <PopupWithForm 
                title='Новое место'
                name='new-place'
                button='Создать'
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleNewCardSubmit}>
                    <div className="popup__form-section">
                        <input 
                        type="text" 
                        className="popup__form-item popup__form-item_card_name popup__input"
                        value={name || ''} 
                        onChange={handleCardNameChange}
                        name="name"
                        id="card-name-input" minLength="2" maxLength="30"  placeholder="Название" required={true} />
                        <span className="popup__form-item popup__form-item_error card-name-input-error"></span>
                    </div>
                    <div className="popup__form-section">
                        <input 
                        type="url" 
                        className="popup__form-item popup__form-item_card_link popup__input" 
                        value={link || ''} 
                        onChange={handleCardLinkChange}
                        name="link"
                        id="card-link-input" placeholder="Ссылка на картинку" required={true} />
                        <span className="popup__form-item popup__form-item_error card-link-input-error"></span>
                    </div>
                </PopupWithForm>
            </div>
        );
    };

export default AddPlacePopup;