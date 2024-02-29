import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HomePage } from './components/pages/HomePage'
import { Provider } from 'react-redux'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </React.StrictMode>,
)
