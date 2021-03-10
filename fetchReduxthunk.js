const initialState = {
  loading: false,
  data: null,
  error: null,
}

function reducer(state = 0, action) {
  switch (action.type) {
    case 'FETCH_STARTED':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { data: null, loading: false, error: action.payload }
    default:
      return state
  }
}

//thunk middleware
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }

  return next(action)
}

const { applyMiddleware, compose } = Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = composeEnhancers(applyMiddleware(thunk))

const store = Redux.createStore(reducer, enhancers)

function fetchUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_STARTED' })
      const response = await fetch(url)
      const dataJson = await response.json()
      console.log(dataJson)
      dispatch({ type: 'FETCH_SUCCESS', payload: dataJson })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }
  }
}

store.dispatch(fetchUrl('https://dogsapi.origamid.dev/json/api/photo'))
