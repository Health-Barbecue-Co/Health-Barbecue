import { put, takeLatest, all, call } from 'redux-saga/effects'
import authSaga, {
  authenticate,
  logout,
  checkAuth,
  actionWatcher,
} from './authSaga'
import * as actionTypes from './actionTypes'
import authService, { AuthService } from './authService'

jest.mock('../common/HttpRequest')

describe('Auth saga', () => {
  it(`has a actionWatcher`, () => {
    const generator = actionWatcher()
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.AUTH_LOGIN, authenticate)
    )

    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.AUTH_LOGOUT, logout)
    )

    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.AUTH_CHECK, checkAuth)
    )

    expect(generator.next().done).toBeTruthy()
  })

  it(`should dispatch action "${actionTypes.AUTH_LOGIN}" with result from fetch authentication API`, () => {
    const mockResponse = { data: { id: 'my-id' } }
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'removeItem')
    const generator = authenticate({
      type: actionTypes.AUTH_LOGIN,
      login: 'login',
      password: 'password',
    })
    expect(generator.next().value).toEqual(
      put({ type: actionTypes.UNSET_MESSAGE })
    )

    expect(generator.next(mockResponse).value).toEqual(
      call([authService, 'login'], 'login', 'password')
    )

    expect(generator.next({ id: 'my-id' }).value).toEqual(
      put({ type: actionTypes.SET_AUTH, auth: { id: 'my-id' } })
    )
    expect(generator.next().done).toBeTruthy()
  })

  it(`should dispatch action "${actionTypes.AUTH_LOGOUT}" to Fetch one user on API`, () => {
    const cb = () => jest.fn()
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'removeItem')

    const generator = logout({
      type: actionTypes.AUTH_LOGOUT,
      callback: cb,
    })

    expect(generator.next().value).toEqual(call(AuthService.logout))

    expect(generator.next().value).toEqual(
      put({ type: actionTypes.UNSET_AUTH })
    )

    expect(generator.next().value).toEqual(call(cb))
    expect(generator.next().done).toBeTruthy()
  })

  it(`should dispatch action "${actionTypes.AUTH_CHECK}" to check and set Auth`, () => {
    const mockResponse = { data: { id: 'my-id' } }
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'removeItem')

    const generator = checkAuth()

    expect(generator.next(mockResponse).value).toEqual(
      call([authService, 'checkAuth'])
    )
    expect(generator.next({ data: { id: 'my-id' } }).value).toEqual(
      put({ type: actionTypes.SET_AUTH, auth: { id: 'my-id' } })
    )
    expect(generator.next().done).toBeTruthy()
  })

  it('runs Saga', async () => {
    const task = authSaga()
    expect(task.next().value).toEqual(all([actionWatcher()]))
  })
})
