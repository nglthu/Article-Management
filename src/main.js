import React from 'react';
 import ReactDOM from 'react-dom'
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index"
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import routes from "./routes"
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middlewares = [thunk,promise()]

if(process.env.NODE_ENV !== 'production'){
  middlewares = [...middlewares, logger]
}

const middleware = composeEnhancers(applyMiddleware(...middlewares));
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware)

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
)

render(
  Routes, document.getElementById('wrapper')
);
