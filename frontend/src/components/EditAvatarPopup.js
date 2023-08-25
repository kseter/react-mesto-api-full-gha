import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

  const [avatar, setAvatar] = useState('');

  React.useEffect(() => {
    setAvatar('');
  },[isOpen])

  function handleAvatarChange(e) {
      setAvatar(e.target.value);
    }

  function handleAvatarSubmit(e) {
      e.preventDefault();
    
      onUpdateAvatar({
        avatar
      })
    };

  return (
    <div>
      <PopupWithForm 
      title='Обновить аватар'
      name='avatar'
      button='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
          onSubmit={handleAvatarSubmit}>
        <input 
          type="url" 
          className="popup__form-item popup__form-item_avatar_link popup__input" 
          value={avatar || ''} 
          onChange={handleAvatarChange}
          name="avatar"
          id="avatar-link-input" placeholder="Ссылка на картинку" required={true} />
          <span className="popup__form-item popup__form-item_error avatar-link-input-error"></span>
      </PopupWithForm>
    </div>
    );
  };

export default EditAvatarPopup;