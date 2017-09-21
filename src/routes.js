import React from 'react'
import {Route, Switch} from 'react-router-dom'

//Dynamic Components
import Home from  "./components/home/Home.jsx"
import UserLog from  "./components/user/UserLog.jsx"
import Search from  "./components/search/Search.jsx"
import Article from  "./components/article/Article.jsx"

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
        <Switch >
        
             <Route exact path="/" component={Home}/> 
             <Route path="/user" component={UserLog}/>
             <Route path="/search" component={Search}/>
             <Route path="/article" component={Article}/>
             <Route component={NotFound}/>
          
        </Switch>
    </div>
    )
    
export default routes;