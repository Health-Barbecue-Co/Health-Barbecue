import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { UserReducer, userSaga } from './features/user'
import { serieSaga } from './features/series'
import serieReducer from './features/series/serieReducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  user: UserReducer,
  serie: serieReducer,
})

/* Configuration Redux Saga */
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), devToolsEnhancer({}))
)

sagaMiddleware.run(userSaga)
sagaMiddleware.run(serieSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
