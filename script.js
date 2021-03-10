function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1
    case 'REDUZIR':
      return state - 1
    default:
      return state
  }
}

// middleware
const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('action', action)
  console.log('Prev_State', store.getState())
  const actionResult = next(action)
  console.log('New_State', store.getState())
  console.groupEnd()
  return actionResult
}

const { applyMiddleware, compose } = Redux

const composeEnhancers =
  window.__REDUX__DEVTOOLS_EXTENSION__COMPOSE__ || compose

const middleware = composeEnhancers(applyMiddleware(logger))

const store = Redux.createStore(reducer, middleware)

store.dispatch({ type: 'INCREMENTAR' })
console.log(store.getState())
