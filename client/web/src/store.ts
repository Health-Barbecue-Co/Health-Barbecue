import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { UserReducer, userSaga } from './features/user'
import { seriesSaga } from './features/series'
import { mirrorPacsSaga } from './features/mirrorPacs'
import { labelsSaga } from './features/labels'
import serieReducer from './features/series/seriesReducer'
import { authSaga, AuthReducer } from './features/auth'
import { VersionReducer, versionSaga } from './features/version'
import labelsReducer from './features/labels/labelsReducer'
import algoSaga from './features/algo/algoSaga'
import algoReducer from './features/algo/algoReducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  user: UserReducer,
  series: serieReducer,
  auth: AuthReducer,
  version: VersionReducer,
  labels: labelsReducer,
  algo: algoReducer,
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
sagaMiddleware.run(authSaga)
sagaMiddleware.run(versionSaga)
sagaMiddleware.run(labelsSaga)
sagaMiddleware.run(algoSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
