import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import decode from 'jwt-decode'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as serviceWorker from './serviceWorker'
import "semantic-ui-css/semantic.min.css"

import App from './App'
import rootReducer from './rootReducer'
import { userLoggedIn } from './actions/Auth'
import setAuthorizationHeaader from './utils/setAuthorizationHeader'

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)

if(localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT)
    const user = {token: localStorage.bookwormJWT, email: payload.email, confirmed: payload.confirmed}
    setAuthorizationHeaader(localStorage.bookwormJWT)
    store.dispatch(userLoggedIn(user))
}

ReactDOM.render(
<BrowserRouter>
    <Provider store={store}>
        <Route component={App} />
    </Provider>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();