import { IAuthenticatedUser } from '../../models/authenticatedUser'
import {
  SET_AUTH,
  UNSET_AUTH,
  SET_MESSAGE,
  UNSET_MESSAGE,
  AUTH_CHECK,
} from './actionTypes'
import authReducer from './authReducer'
import { AuthActionTypes } from './types'

const initialState = {
  auth: null,
  message: null,
}

describe('features > user > authReducer', () => {
  it('initial state', () => {
    expect(authReducer(undefined, { type: AUTH_CHECK })).toEqual(initialState)
  })

  it('default state is provided if action is unknown', () => {
    expect(authReducer(initialState, { type: AUTH_CHECK })).toEqual(
      initialState
    )
  })

  it(`sets auth, if ${SET_AUTH} action is provided`, () => {
    const expectedState = {
      auth: { Id: 'my-id' },
      message: null,
    }

    const action: AuthActionTypes = {
      type: SET_AUTH,
      auth: { Id: 'my-id' } as IAuthenticatedUser,
    }

    expect(authReducer(initialState, action)).toEqual(expectedState)
  })

  it(`reset auth, if ${UNSET_AUTH} action is provided`, () => {
    const expectedState = {
      auth: null,
      message: null,
    }

    const action: AuthActionTypes = {
      type: UNSET_AUTH,
    }

    expect(authReducer(initialState, action)).toEqual(expectedState)
  })

  it(`set a message if ${SET_MESSAGE} action is provided`, () => {
    const expectedState = {
      auth: null,
      message: 'my-message',
    }

    const action: AuthActionTypes = {
      type: SET_MESSAGE,
      message: 'my-message',
    }

    expect(authReducer(initialState, action)).toEqual(expectedState)
  })

  it(`set form if ${UNSET_MESSAGE} action is provided`, () => {
    const state = { ...initialState, message: { error: 'one error' } }
    const action: AuthActionTypes = { type: UNSET_MESSAGE }

    expect(authReducer(state, action)).toEqual(initialState)
  })
})
