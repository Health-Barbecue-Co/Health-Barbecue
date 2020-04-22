import { IUser } from '../../models/user'
import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  FETCH_ALL_USERS,
  SET_ALL_USERS,
  SET_USER_FORM_RESULT,
  RESET_USER_FORM_RESULT,
} from './actionTypes'
import userReducer from './userReducer'
import { UserActionTypes, UserState } from './types'

const initialState = {
  user: null,
  list: [],
  form: null,
}

describe('features > user > userReducer', () => {
  it('initial state', () => {
    expect(userReducer(undefined, { type: FETCH_ALL_USERS })).toEqual(
      initialState
    )
  })

  it('default state is provided if action is unknown', () => {
    expect(userReducer(initialState, { type: FETCH_ALL_USERS })).toEqual(
      initialState
    )
  })
  it(`sets user, if ${SET_CURRENT_USER} action is provided`, () => {
    const expectedState = {
      user: {},
      list: [],
      form: null,
    }

    const action: UserActionTypes = {
      type: SET_CURRENT_USER,
      user: {},
    }

    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it(`reset user, if ${UNSET_CURRENT_USER} action is provided`, () => {
    const expectedState = {
      user: null,
      list: [],
      form: null,
    }

    const action: UserActionTypes = {
      type: UNSET_CURRENT_USER,
    }

    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it(`set List if ${SET_ALL_USERS} action is provided`, () => {
    const list = [{} as IUser, {} as IUser]
    const expectedState = {
      user: null,
      form: null,
      list,
    }

    const action: UserActionTypes = {
      type: SET_ALL_USERS,
      users: list,
    }

    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it(`set form if ${SET_USER_FORM_RESULT} action is provided`, () => {
    const form = { error: 'one error' }
    const expectedState = {
      user: null,
      list: [],
      form: { error: 'one error' },
    }
    const action: UserActionTypes = {
      type: SET_USER_FORM_RESULT,
      result: form,
    }

    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it(`reset form if ${RESET_USER_FORM_RESULT} action is provided`, () => {
    const state: UserState = { ...initialState, form: { error: 'one error' }}
    const expectedState = {
      user: null,
      list: [],
      form: null,
    }
    const action: UserActionTypes = {
      type: RESET_USER_FORM_RESULT,
    }

    expect(userReducer(state, action)).toEqual(expectedState)
  })
})
