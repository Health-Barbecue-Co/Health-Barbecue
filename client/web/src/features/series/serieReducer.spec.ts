import { ISerie } from '../../models/serie'

import {
  SET_CURRENT_SERIE,
  UNSET_CURRENT_SERIE,
  SET_ALL_SERIES,
  FETCH_ALL_SERIES,
} from './actionTypes'
import serieReducer from './serieReducer'
import { SerieActionTypes } from './types'

const initialState = {
  serie: null,
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

  it(`sets serie, if ${SET_CURRENT_SERIE} action is provided`, () => {
    const expectedState = {
      serie: {},
      list: [],
    }

    const action: SerieActionTypes = {
      type: SET_CURRENT_SERIE,
      serie: {} as ISerie,
    }

    expect(serieReducer(initialState, action)).toEqual(expectedState)
  })

  it(`reset serie, if ${UNSET_CURRENT_SERIE} action is provided`, () => {
    const expectedState = {
      serie: null,
      list: [],
    }

    const action: SerieActionTypes = {
      type: UNSET_CURRENT_SERIE,
    }

    expect(serieReducer(initialState, action)).toEqual(expectedState)
  })

  it(`set List if ${SET_ALL_SERIES} action is provided`, () => {
    const list = [{} as ISerie, {} as ISerie]
    const expectedState = {
      serie: null,
      list,
    }

    const action: SerieActionTypes = {
      type: SET_ALL_SERIES,
      series: list,
    }

    expect(serieReducer(initialState, action)).toEqual(expectedState)
  })
})
