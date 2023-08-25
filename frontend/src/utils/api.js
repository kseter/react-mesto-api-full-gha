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
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json',
      }
    }
    )
    .then(this._checkResponse);
  };
   
  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse);
  };

  setUserInfo(data){
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._checkResponse);
  };

  addNewCard(data){
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkResponse);
  };

  changeLikeCardStatus(data, isLiked) {
    const token = localStorage.getItem('jwt');

    if(!isLiked){
      return fetch(`${this.baseUrl}/cards/${data}/likes`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json',
        },
      })
      .then(this._checkResponse);
    } else {
      return fetch(`${this.baseUrl}/cards/${data}/likes`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json',
        },
      })
      .then(this._checkResponse);
    }
  }

  deleteCard(data){
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json',
      },
    })
  };

  changeAvatar(data){
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkResponse);
  };
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api
  

 