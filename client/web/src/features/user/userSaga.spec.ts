import { put, takeLatest, all, delay, call } from 'redux-saga/effects'
import userSaga, {
  fetchUsers,
  actionWatcher,
  createOrUpdateUser,
} from './userSaga'
import { IUser } from '../../models/user'
import * as actionTypes from './actionTypes'
import userService from './userService'

jest.mock('../common/HttpRequest')

describe('User saga', () => {
  it(`has a actionWatcher`, () => {
    const generator = actionWatcher()
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ALL_USERS, fetchUsers)
    )

    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.SAVE_ONE_USER, createOrUpdateUser)
    )

    expect(generator.next().done).toBeTruthy()
  })

  it(`should dispatch action "${actionTypes.FETCH_ALL_USERS}" with result from fetch user API`, () => {
    const mockResponse = { data: [] }
    const generator = fetchUsers()
    generator.next()

    expect(generator.next(mockResponse).value).toEqual(
      put({ type: actionTypes.SET_ALL_USERS, users: [] })
    )
    expect(generator.next().done).toBeTruthy()
  })

  describe(`dispatch action "${actionTypes.SAVE_ONE_USER}"`, () => {
    it(`the result is to add a user with API and dispatch action "${actionTypes.SET_USER_FORM_RESULT}" with success`, () => {
      const user = {
        lastname: 'lastname',
        firstname: 'firstname',
        login: 'login',
      } as IUser
      const mockResponse = { ...user, id: 'myId' }
      const generator = createOrUpdateUser({
        type: actionTypes.SAVE_ONE_USER,
        user,
      })

      expect(generator.next().value).toEqual(
        call([userService, 'create'], user)
      )

      expect(generator.next(mockResponse).value).toEqual(
        put({
          type: actionTypes.SET_USER_FORM_RESULT,
          result: { success: mockResponse },
        })
      )

      expect(generator.next().value).toEqual(delay(2000))
      expect(generator.next().value).toEqual(
        put({ type: actionTypes.RESET_USER_FORM_RESULT })
      )
      expect(generator.next().done).toBeTruthy()
    })

    it(`the result is to update a user with API and dispatch action "${actionTypes.SET_USER_FORM_RESULT}" with success`, () => {
      const user = {
        id: 'myId',
        lastname: 'lastname',
        firstname: 'firstname',
        login: 'login',
      } as IUser
      const mockResponse = { ...user, id: 'myId' }
      const generator = createOrUpdateUser({
        type: actionTypes.SAVE_ONE_USER,
        user,
      })

      expect(generator.next().value).toEqual(
        call([userService, 'update'], user.id, user)
      )

      expect(generator.next(mockResponse).value).toEqual(
        put({
          type: actionTypes.SET_USER_FORM_RESULT,
          result: { success: mockResponse },
        })
      )

      expect(generator.next().value).toEqual(delay(2000))
      expect(generator.next().value).toEqual(
        put({ type: actionTypes.RESET_USER_FORM_RESULT })
      )
      expect(generator.next().done).toBeTruthy()
    })

    it(`the result is to add or modify a user with API and dispatch action "${actionTypes.SET_USER_FORM_RESULT}" with error`, () => {
      jest.spyOn(userService, 'create').mockRejectedValue('one error')
      jest.spyOn(userService, 'update')

      const user = {
        lastname: 'lastname',
        firstname: 'firstname',
        login: 'login',
      } as IUser

      const generator = createOrUpdateUser({
        type: actionTypes.SAVE_ONE_USER,
        user,
      })

      expect(generator.next().value).toEqual(
        call([userService, 'create'], user)
      )
      expect(generator.throw('one error').value).toEqual(
        put({
          type: actionTypes.SET_USER_FORM_RESULT,
          result: { error: 'one error' },
        })
      )
      expect(generator.next().done).toBeTruthy()
    })
  })

  it('runs Saga', async () => {
    const task = userSaga()
    expect(task.next().value).toEqual(all([actionWatcher()]))
  })
})
