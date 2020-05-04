import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import { SeriesList } from './SeriesList'

jest.mock('../../../features/common/HttpRequest')

describe('SeriesList', () => {
  const mockStore = configureStore([])
  const store = mockStore({
    series: {
      list: [{ id: 'myId' }],
    },
    auth: {
      auth: null,
      message: null,
    },
    algo:  {
      algoResult: "",
      selectedAlgo: {
        name: '',
        user:'',
        seriesUid:''
      }  
    }
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
        <SeriesList />
      </Provider>
    )
    expect(wrapper.find(SeriesList).exists()).toBeTruthy()
  })
})
