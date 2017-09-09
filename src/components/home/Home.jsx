import React from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import {getIndex} from "../../actions/indexActions.js"
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap';

import ReactDOM  from 'react-dom';
//import Griddle, { plugins } from 'griddle-react';
import { DefaultModules } from 'griddle-render';
const { RowDefinition, ColumnDefinition } = DefaultModules

//import { DefaultModules } from 'griddle-render';
//const { RowDefinition, ColumnDefinition } = DefaultModules;

const config = require('../../constants/index.json');

//import {defaultLayout} from "/src/component/application/Header.jsx"
//var defaultLayout = require('./Mascter');

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
        const columnMeta = [{
            columnName: 'author',
            displayName:'Author'
        }, {
            columnName: 'title',
            displayName: 'Title'
        }, {
            columnName: 'journal',
            displayName: 'Journal'
        }, {
            columnName: 'doi',
            displayName: 'DOI'
        },{
            columnName: 'year',
            displayName: 'Year'
        },{
            columnName: 'status',
            displayName: 'Status'
        },
    ];
    const styleConfig = {
        icons: {
          TableHeadingCell: {
            sortDescendingIcon: <small>(desc)</small>,
            sortAscendingIcon: <small>(asc)</small>,
          },
        },
        classNames: {
          Row: 'row-class',
        },
        styles: {
          Filter: { fontSize: 18 },
          Table: { border: "2px solid #555 "},
        }
}
       console.log(this.state.user);
        return (
            <defaultLayout>
                <section id="page-title">
                    <div className="container clearfix">
                        <h1>List of Articles:</h1>
                        <Griddle 
                        results={this.state.user} 
                        showFilter={true} 
                        showSettings={true} 
                        columns={["author", "title","journal","doi","year"]}
                        columnMetadata={columnMeta}
                        tableClassName={'table table-bordered table-striped table-hover'}
                        useGriddleStyles={true}
                        settingsToggleClassName='btn btn-default'
                        customPagerComponent={ BootstrapPager } 
                        resultsPerPage={5}
                        externalChangeSort={this.changeSort}
                        externalSetFilter={this.setFilter}
                        externalSortColumn={this.props.sortColumn}
                        externalSortAscending={this.props.sortAscending}
                        externalSetPageSize={this.setPageSize}
                        externalMaxPage={this.props.maxPages}
                        externalCurrentPage={this.props.currentPage}
                        styleConfig = {styleConfig}
                        />
                    </div>
                </section>
            </defaultLayout>    
            )
         
    }
}
module.exports = Home;
