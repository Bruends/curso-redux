import getLocalStorage from './helpers/getLocalStorage.js'

//constants
const FETCH_STARTED = 'token/FETCH_STARTED'
const FETCH_SUCCESS = 'token/FETCH_SUCCESS'
const FETCH_ERROR = 'token/FETCH_ERROR'

//inital state
const initialState = {
  loading: false,
  token: getLocalStorage('token', null),
  error: null,
}

//action creators
export function tokenFetchStart() {
  return { type: FETCH_STARTED }
}

export function tokenFetchSuccess(payload) {
  return { type: FETCH_SUCCESS, payload, localStorage: 'token' }
}

export function tokenFetchError(payload) {
  return { type: FETCH_ERROR, payload }
}

//reducer
function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      return { token: action.payload, error: null, loading: false }
    case FETCH_ERROR:
      return { token: null, error: action.payload, loading: false }
    default:
      return state
  }
}

export default tokenReducer
