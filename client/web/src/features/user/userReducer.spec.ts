import { SET_CURRENT_USER, UNSET_CURRENT_USER } from './actionTypes'
import userReducer from './userReducer'
import { UserActionTypes } from './types'

describe('features > user > userReducer', () => {
  it(`sets user, if ${SET_CURRENT_USER} action is provided`, () => {
    const initialState = {
      user: null,
    }

    const expectedState = {
      user: {},
    }

    const action: UserActionTypes = {
      type: SET_CURRENT_USER,
      user: {},
    }

    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it(`reset user, if ${UNSET_CURRENT_USER} action is provided`, () => {
    const initialState = {
      user: {},
    }

    const expectedState = {
      user: null,
    }

    const action: UserActionTypes = {
      type: UNSET_CURRENT_USER,
    }

    expect(userReducer(initialState, action)).toEqual(expectedState)
  })
})
