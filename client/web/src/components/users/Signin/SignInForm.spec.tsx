import React from 'react'
import { mount } from 'enzyme'
import { SignInForm } from './SignInForm'


describe('SignInForm', () => {
  let wrapper: any = null
  const handleSubmit = jest.fn()
  const handleChange = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <SignInForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={() => jest.fn()}
      />
    )
  })

  it('renders without a form.', () => {
    expect(wrapper.find('form').exists()).toBeTruthy()
  })

  it('should set current user on submit', () => {
    wrapper.find('button[type="submit"]').simulate('submit')
    expect(handleSubmit).toBeCalledTimes(1)
  })
})
