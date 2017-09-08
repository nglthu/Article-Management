import React from 'react'
import {Route, Switch} from 'react-router-dom'

//Dynamic Components
import Home from  "./components/home/Home.jsx"

//Static Components
import Header from "./components/application/Header.jsx"



const Status = function ({ code, children }){
  return (
        <Route render={function({ staticContext }) {
          if (staticContext)
            staticContext.status = code
          return children
        }}/>
    )
}

const NotFound = function(){
    return (
      <Status code={404}>
        <div>
          <h2> Sorry, can’t find this page</h2>
        </div>
      </Status>
    )
}
const routes = (
    <div>
        <Header/>
        <Switch>
            <Route path="/" component={Home}/>  
            <Route component={NotFound}/>
        </Switch>
    </div>
    )
    
export default routes;