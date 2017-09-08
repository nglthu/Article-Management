import React from 'react'
import {createStore} from 'redux';
import { Provider } from "react-redux"
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom';

import reducers from "../src/reducers/index"
import routes from "../src/routes.js"


export function handleRender(req, res, options={}){
    var url = req.url
    var data = {}
    if(options.hasOwnProperty("url")){
        url =  options['url'] + req.url
    }
    const context = {};
    const store = createStore(reducers, data); // set the store date for initial state
    const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
    const reactComponent = renderToString(
        <Provider store={store}>
            <StaticRouter
                location={url} //remember to add /location + req.url when implementing another 
                context={context}>
                {routes}
            </StaticRouter>
        </Provider>
        )
        res.status(200).render('index',{reactComponent, initialState}) // render the component with initial store data
}
