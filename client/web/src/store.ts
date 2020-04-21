import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { UserReducer, userSaga } from './features/user'
import { seriesSaga } from './features/series'
import { mirrorPacsSaga } from './features/mirrorPacs'
import serieReducer from './features/series/seriesReducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  user: UserReducer,
  series: serieReducer,
})

/* Configuration Redux Saga */
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), devToolsEnhancer({}))
)

sagaMiddleware.run(userSaga)
sagaMiddleware.run(seriesSaga)
sagaMiddleware.run(mirrorPacsSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
