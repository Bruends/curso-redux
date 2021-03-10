// user/FETCH_STARTED, user/FETCH_SUCCESS, user/FETCH_ERROR

//constants
const FETCH_STARTED = 'user/FETCH_STARTED'
const FETCH_SUCCESS = 'user/FETCH_SUCCESS'
const FETCH_ERROR = 'user/FETCH_ERROR'

//inital state
const initialState = {
  loading: false,
  user: null,
  error: null,
}

//action creators
export function userFetchStart() {
  return { type: FETCH_STARTED }
}

export function userFetchSuccess(payload) {
  return { type: FETCH_SUCCESS, payload }
}

export function userFetchError(payload) {
  return { type: FETCH_ERROR, payload }
}

//reducer
function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      return { user: action.payload, error: null, loading: false }
    case FETCH_ERROR:
      return { user: null, error: action.payload, loading: false }
    default:
      return state
  }
}

export default userReducer
