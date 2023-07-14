class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleFirstResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl + endpoint}`, options).then(this._handleFirstResponse);
  }

  registration({ password, email }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email" : email,
        "password": password
      })
    });
  }

  login({ password, email }) {
    return this._request('/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "email" : email,
        "password" : password
      })
    });
  }

  checkToken() {
    return this._request('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'aplication/json',
      }
    });
  }
}

const auth = new Auth({
  baseUrl: 'https://mestobackendrex.nomoredomains.work',
  // baseUrl: 'http://localhost:8000',
  headers: { 
    'Content-Type': 'application/json' 
  }
});

export default auth;