import store from './store/configureStore.js'
import {
  tokenFetchStart,
  tokenFetchSuccess,
  tokenFetchError,
} from './store/token.js'

import {
  userFetchStart,
  userFetchError,
  userFetchSuccess,
} from './store/user.js'

function fetchToken() {
  const urlToken = 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token'

  const tokenRequestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({ username: 'dog', password: 'dog' }),
  }

  return async (dispatch) => {
    try {
      dispatch(tokenFetchStart())
      const response = await fetch(urlToken, tokenRequestConfig)
      const json = await response.json()
      const { token } = json
      dispatch(tokenFetchSuccess(token))
    } catch (err) {
      dispatch(tokenFetchError(err.message))
    }
  }
}

function fetchUser(token) {
  const urlUser = 'https://dogsapi.origamid.dev/json/api/user'

  const userRequestConfig = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return async (dispatch) => {
    try {
      dispatch(userFetchStart())
      const response = await fetch(urlUser, userRequestConfig)
      const json = await response.json()
      console.log(json)
      dispatch(userFetchSuccess(json))
    } catch (err) {
      dispatch(userFetchError(err.message))
    }
  }
}

console.log(store.getState())

async function getUser(store) {
  let { token } = store.getState().tokenReducer
  if (token) {
    await store.dispatch(fetchUser(token))
  } else {
    await store.dispatch(fetchToken())
    token = store.getState().tokenReducer.token
    await store.dispatch(fetchUser(token))
  }
}

getUser(store)
