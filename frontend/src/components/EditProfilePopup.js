import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]); 

    function handleFormSubmit(e){
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
          })
      };

    function handleNameChange(e) {
        setName(e.target.value);
      };

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
      };

    return (
        <div>
            <PopupWithForm 
            title='Редактировать профиль'
            name='user'
            button='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleFormSubmit}>
				<div className="popup__form-section">
					<input 
                    type="text" 
                    className="popup__form-item popup__form-item_user_name popup__input" 
                    value={name || ''} 
                    onChange={handleNameChange} 
                    name="name"
					id="user-name-input" minLength="2" maxLength="40" placeholder="Введите имя" 
                    required />
					<span className="popup__form-item popup__form-item_error"></span>
				</div>
				<div className="popup__form-section">
					<input 
                    type="text" 
                    className="popup__form-item popup__form-item_user_about popup__input"  
                    value={description || ''} 
                    onChange={handleDescriptionChange}
					name="about" 
                    id="user-about-input" minLength="2" maxLength="200" placeholder="Какова Ваша профессия?"
					required />
					<span className="popup__form-item popup__form-item_error"></span>
				</div>
		</PopupWithForm>
        </div>
    );
};

export default EditProfilePopup;