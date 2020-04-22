import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import { UserList } from './UserList'
import { UserListRow } from './UserListRow'

describe('UserList', () => {
  let wrapper: any
  const mockStore = configureStore([])
  const store = mockStore({
    user: {
      list: [
        {
          id: '1',
          firstname: 'firstname',
          lastname: 'lastname',
          login: 'login',
          role: 'role',
        },
        {
          id: '2',
          firstname: 'firstname2',
          lastname: 'lastname2',
          login: 'login2',
          role: 'role2',
        },
      ],
    },
  })

  // Add jest mock spy to watch for store.dispatch method. See https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname for more info
  jest.spyOn(store, 'dispatch')

  beforeEach(() => {
    // Clear any saved mock data from previous tests, because jest saves calls data for spies and mocks, https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
    store.dispatch.mockClear()

    wrapper = mount(
      <Provider store={store}>
        <UserList rowActions={() => []} />
      </Provider>
    )
  })

  it('renders without crashing.', () => {
    expect(wrapper.find(UserList).exists()).toBeTruthy()
  })

  it('displays some UserListRows from store user.list', () => {
    expect(wrapper.find(UserListRow).length).toEqual(2)
  })
})
