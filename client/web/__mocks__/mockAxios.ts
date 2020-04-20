import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

export const mockAxios = new AxiosMockAdapter(axios)
