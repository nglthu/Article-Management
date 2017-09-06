import React from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import {getIndex} from "../../actions/indexActions.js"


import ReactDOM  from 'react-dom';
//import Griddle, { plugins } from 'griddle-react';
import { DefaultModules } from 'griddle-render';
const { RowDefinition, ColumnDefinition } = DefaultModules

//import { DefaultModules } from 'griddle-render';
//const { RowDefinition, ColumnDefinition } = DefaultModules;

const config = require('../../constants/index.json');


console.log(config.url);
@connect((store) =>{
    return {
        index: store.index
    }
})
 
class Home extends React.Component{
        
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }
    getArticle(){
        fetch(config.url)
        .then( (response) => {
            return response.json()
        })
        .then( (json) => {
            this.setState({
                user: json
            })
        });
    }
    componentDidMount(){
        this.props.dispatch(getIndex())
        this.setState({
        user: this.getArticle()
    })
    }
    componentWillUnmount(){
    }
    
    
    render(){
       console.log(this.state.user);
        return(
          
                <section id="page-title">
                    <div className="container clearfix">
                        <h1>List of Articles:</h1>
                        <Griddle results={this.state.user} showFilter={true} showSettings={true} columns={["author", "title","journal","doi","year","status"]}/>
                    </div>
                </section>
            )
         
    }
}
module.exports = Home;
