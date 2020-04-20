import { put, takeLatest, all } from 'redux-saga/effects'
import userSaga, { fetchUsers, actionWatcher } from './userSaga'
import * as actionTypes from './actionTypes'

jest.mock('../common/HttpRequest')

describe('User saga', () => {
  it(`should dispatch action "${actionTypes.FETCH_ALL_USERS}"`, () => {
    const generator = actionWatcher()
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ALL_USERS, fetchUsers)
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

  it('runs Saga', async () => {
    const task = userSaga()
    expect(task.next().value).toEqual(all([actionWatcher()]))
  })
})
