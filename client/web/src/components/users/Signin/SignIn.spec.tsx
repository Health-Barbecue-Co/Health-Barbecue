import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import { SignIn } from './SignIn'
import { SignInForm } from './SignInForm'

jest.mock('../../../features/common/HttpRequest')

jest.mock('react-router-dom', () => ({
  useRouteMatch: () => ({ url: 'myUrl' }),
  useHistory: () => ({
    push: () => jest.fn(),
  }),
}))

describe('SignIn', () => {
  const mockStore = configureStore([])
  const store = mockStore({
    auth: {
      auth: {
        name: 'test',
      },
    },
  })

  // Add jest mock spy to watch for store.dispatch method. See https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname for more info
  jest.spyOn(store, 'dispatch')

  beforeEach(() => {
    // Clear any saved mock data from previous tests, because jest saves calls data for spies and mocks, https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
    store.dispatch.mockClear()
  })

  it('renders without crashing.', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SignIn />
      </Provider>
    )
    expect(wrapper.find(SignInForm).exists()).toBeTruthy()
  })
})
