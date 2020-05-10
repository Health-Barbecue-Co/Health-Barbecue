import React from 'react'
import renderer from 'react-test-renderer'

import { Toolbar } from './Toolbar'

describe('Toolbar', () => {
  it('contains a label which is displayed', () => {
    const wrapper = renderer.create(<Toolbar label="hello" />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('contains a leftAction array as props', () => {
    const wrapper = renderer.create(
      <Toolbar label="hello" leftActions={[<span>left</span>]} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('contains a rightAction array as props', () => {
    const wrapper = renderer.create(
      <Toolbar label="hello" rightActions={[<span>right</span>]} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
