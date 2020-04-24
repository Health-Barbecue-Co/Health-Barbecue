import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import { Backdrop } from '@material-ui/core'
import { UserRegister } from './RegisterUser'

describe('UserList', () => {
  let wrapper: any
  const mockStore = configureStore([])
  const store = mockStore({
    user: {
      list: [],
      form: null,
    },
  })

  const onValidate = () => jest.fn()

  // Add jest mock spy to watch for store.dispatch method. See https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname for more info
  jest.spyOn(store, 'dispatch')

  beforeEach(() => {
    // Clear any saved mock data from previous tests, because jest saves calls data for spies and mocks, https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
    store.dispatch.mockClear()

    wrapper = mount(
      <Provider store={store}>
        <UserRegister afterValidate={onValidate} />
      </Provider>
    )
  })

  it('renders without crashing.', () => {
    expect(wrapper.find(UserRegister).exists()).toBeTruthy()
  })

  it('displays a form', () => {
    expect(wrapper.find('form').exists()).toBeTruthy()
  })

  it('displays a backdrop on submitting', () => {
    const button = wrapper.find('*[type="submit"]')
    const backdrop = wrapper.find(Backdrop)

    expect(button.exists()).toBeTruthy()
    expect(backdrop.exists()).toBeTruthy()

    expect(backdrop.props().open).toBeFalsy()
  })
})
