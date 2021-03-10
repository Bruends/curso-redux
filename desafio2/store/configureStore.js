import tokenReducer from './token.js'
import userReducer from './user.js'
import logger from './middlewares/logger.js'
import thunk from './middlewares/thunk.js'
import localStorage from './middlewares/localStorage.js'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose

const enhancer = composeEnhancers(
  Redux.applyMiddleware(logger, thunk, localStorage)
)

const reducers = Redux.combineReducers({ tokenReducer, userReducer })
const store = Redux.createStore(reducers, enhancer)

export default store
