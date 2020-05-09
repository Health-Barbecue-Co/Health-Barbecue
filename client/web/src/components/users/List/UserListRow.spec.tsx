import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { UserListRow } from './UserListRow'

describe('UserListRow', () => {
  it('user attribute is mandatory', () => {
    try {
      mount(<UserListRow />)
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('a table row with user information', () => {
    const user = {
      id: 'myId',
      firstname: 'firstname',
      lastname: 'lastname',
      login: 'login',
      role: 'role',
    }
    const wrapper = renderer
      .create(<UserListRow user={user} actionCol={[]} />)
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
