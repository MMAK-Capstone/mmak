import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// establishes socket connection
import './socket'

ReactDOM.render(
<Provider store={store}>
  <MuiThemeProvider>
    <Router history={history}>
      <App />
    </Router>
  </MuiThemeProvider>
</Provider>,
  document.getElementById('app')
)
