import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import store from './store'

import './index.scss'

import App from './App'

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>,
  document.getElementById('root')
)
