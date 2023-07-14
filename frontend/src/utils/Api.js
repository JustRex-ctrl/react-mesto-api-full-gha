class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleFirstResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    const { method, headers, body } = options;
    return fetch(`${this._baseUrl + endpoint}`, { credentials: 'include', method, headers, body }).then(this._handleFirstResponse);
  }

  getUserInfo() {
    return this._request('/users/me', {credentials: 'include', headers: this._headers });
  }

  patchUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  patchAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  getInitialCards() {
    return this._request('/cards', {credentials: 'include', headers: this._headers});
  }

  postCard(cardData) {
    return this._request('/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }
  
  clickLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: 'https://mestobackendrex.nomoredomains.work',
  // baseUrl: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
