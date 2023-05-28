/* eslint-disable class-methods-use-this */

import { TokenLSkey } from '../utils/constants'

class APIforPetStore {
  constructor() {
    console.log('Я родился! (c)экземпляр класса APIforPetStore')
    this.group = 'group-11'
    this.URLbase = 'https://api.react-learning.ru/'
    this.URLsignup = 'signup/'
    this.URLsignin = 'signin/'
    this.URLproductsAll = 'products/'
    this.URLuserInfo = `v2/${this.group}/users/me/` // with GET method
    this.URLuserEdit = `v2/${this.group}/users/me` // with PATCH method
    this.URLuserAvatarEdit = `v2/${this.group}/users/me/avatar`
  }

  async authUserRequest(email, password) {
    const reqBody = {
      email,
      password,
    }
    try {
      const response = await fetch(`${this.URLbase}${this.URLsignin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в authUserRequest')
      throw new Error(error)
    }
  }

  async regUserRequest(email, password) {
    const reqBody = {
      email,
      group: this.group,
      password,
    }
    try {
      const response = await fetch(`${this.URLbase}${this.URLsignup}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в regUserRequest')
      throw new Error(error)
    }
  }

  async getUserDataRequest(token) {
    try {
      const response = await fetch(`${this.URLbase}${this.URLuserInfo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в getUserDataRequest')
      throw new Error(error)
    }
  }

  async editUserDataRequest(name, about) {
    const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    const reqData = { name, about }
    try {
      const response = await fetch(`${this.URLbase}${this.URLuserInfo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqData),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в editUserDataRequest')
      throw new Error(error)
    }
  }

  async editUserAvatar(avatar) {
    const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    const reqData = { avatar }
    try {
      const response = await fetch(`${this.URLbase}${this.URLuserAvatarEdit}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqData),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в URLuserAvatarEdit')
      throw new Error(error)
    }
  }

  async getAllProductsRequest() {
    const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    try {
      const response = await fetch(`${this.URLbase}${this.URLproductsAll}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в getAllProductsRequest')
      throw new Error(error)
    }
  }

  checkTokenAvailabilityInLS() {
    const tokenObjFromLS = localStorage.getItem(TokenLSkey)
    if (!tokenObjFromLS) return ''
    const tokenObj = JSON.parse(tokenObjFromLS)
    if (!tokenObj.token) return ''
    console.log(`token=${tokenObj.token}`)
    return tokenObj.token
  }
}

export const api = new APIforPetStore()
