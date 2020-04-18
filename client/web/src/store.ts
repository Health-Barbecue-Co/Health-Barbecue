import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { UserReducer } from './features/user'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  user: UserReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
