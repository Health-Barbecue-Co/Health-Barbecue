import * as actionTypes from './actionTypes'
import * as selectors from './selectors'
import serieService from './seriesService'
import seriesSaga from './seriesSaga'

export { default as SeriesReducer } from './seriesReducer'
export { actionTypes }
export { selectors }
export const SerieService = serieService
export { seriesSaga }
