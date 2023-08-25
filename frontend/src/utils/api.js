export class Api {
  constructor({ baseUrl, headers }) {
      this.baseUrl = baseUrl
      this.headers = headers
    };

  _checkResponse(res) {
    if(res.ok){
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  };

  requestUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }
    )
    .then(this._checkResponse);
  };
   
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._checkResponse);
  };

  setUserInfo(data){
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._checkResponse);
  };

  addNewCard(data){
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkResponse);
  };

  changeLikeCardStatus(data, isLiked) {
    if(!isLiked){
      return fetch(`${this.baseUrl}/cards/${data}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(this._checkResponse);
    } else {
      return fetch(`${this.baseUrl}/cards/${data}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(this._checkResponse);
    }
  }

  deleteCard(data){
    return fetch(`${this.baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  };

  changeAvatar(data){
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkResponse);
  };
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
  authorization: 
  '7b35d477-32d9-48d4-8db2-59c7542ebe1e',
  'Content-Type': 'application/json'
  }
});

export default api
  

 