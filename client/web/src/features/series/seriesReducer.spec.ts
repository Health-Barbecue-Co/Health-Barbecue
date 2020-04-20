import { ISeries } from '../../models/series'

import {
  SET_CURRENT_SERIES,
  UNSET_CURRENT_SERIES,
  SET_ALL_SERIES,
  FETCH_ALL_SERIES,
} from './actionTypes'
import serieReducer from './seriesReducer'
import { SeriesActionTypes } from './types'

const initialState = {
  series: null,
  list: [],
}

describe('features > series > serieReducer', () => {
  it('initial state', () => {
    expect(serieReducer(undefined, { type: FETCH_ALL_SERIES })).toEqual(
      initialState
    )
  })

  it('default state is provided if action is unknown', () => {
    expect(serieReducer(initialState, { type: FETCH_ALL_SERIES })).toEqual(
      initialState
    )
  })

  it(`sets serie, if ${SET_CURRENT_SERIES} action is provided`, () => {
    const expectedState = {
      series: {},
      list: [],
    }

    const action: SeriesActionTypes = {
      type: SET_CURRENT_SERIES,
      series: {} as ISeries,
    }

    expect(serieReducer(initialState, action)).toEqual(expectedState)
  })

  it(`reset serie, if ${UNSET_CURRENT_SERIES} action is provided`, () => {
    const expectedState = {
      series: null,
      list: [],
    }

    const action: SeriesActionTypes = {
      type: UNSET_CURRENT_SERIES,
    }

    expect(serieReducer(initialState, action)).toEqual(expectedState)
  })

  it(`set List if ${SET_ALL_SERIES} action is provided`, () => {
    const list = [{} as ISeries, {} as ISeries]
    const expectedState = {
      series: null,
      list,
    }

    const action: SeriesActionTypes = {
      type: SET_ALL_SERIES,
      series: list,
    }

    expect(serieReducer(initialState, action)).toEqual(expectedState)
  })
})
