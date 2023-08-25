export const BASE_URL = 'https://auth.nomoreparties.co'

export const register = (email, password) => {
    return fetch (`${BASE_URL}/signup`, {
        method: 'POST',
        headers: 
         {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        } else if (res.status === 400) {
            throw new Error(`${res.status} - некорректно заполнено одно из полей `);
        } else {
            throw new Error(`${res.status} ${res.statusText}`)
        }
    })
};

export const login = (email, password) => {
    return fetch (`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        } else if (res.status === 400) {
            throw new Error(`${res.status} - не передано одно из полей`);
        } else if (res.status === 401) {
            throw new Error(`${res.status} - пользователь с email не найден`);
        } else {
            throw new Error(`${res.status} ${res.statusText}`)
        }
    })
};

export const checkToken = (token) => {
    return fetch (`${BASE_URL}/users/me`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        } else if (res.status === 400) {
            throw new Error(`${res.status} — Токен не передан или передан не в том формате`);
        } else if (res.status === 401) {
            throw new Error(`${res.status} - — Переданный токен некорректен`);
        } else {
            throw new Error(`${res.status} ${res.statusText}`)
        }
    })
    .then(data => data);
};

