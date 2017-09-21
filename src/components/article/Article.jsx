import React from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
var moment = require('moment');
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import { Grid, Col, Row, Button, DropdownButton, MenuItem, DropdownMenu } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Banner from 'react-banner';

import 'react-banner/dist/style.css';

import { getIndex } from "../../actions/indexActions.js"
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap';

import ReactDOM from 'react-dom';

import { DefaultModules } from 'griddle-render';
import { TextInput, Input } from 'react-native';

const { RowDefinition, ColumnDefinition } = DefaultModules

import 'react-datepicker/dist/react-datepicker.css';


const config = require('../../constants/index.json');
var _ = require('underscore');
var squish = require('object-squish');

var colType = {
    textAlign: "justify"
};

var boderSet = {
    border: '1px solid #ccc'
}
@connect((store) => {
    return {
        index: store.index
    }
})

class Article extends React.Component {

    getArticleFilter() {
        fetch(config.url)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.setState({
                    articles: json,
                    allArticles: json,
                })
            });
    }

    constructor(props) {
        super(props)
        this.state = {
            articles: {},
            allArticles: {},
            startDateFrom: moment(),
            startDateTo: moment(),
            query: '',
            status: ''



        }
      
        this.searchChange = this.searchChange.bind(this);
      
    }


    dataFilterNotMaching(data, item) {
        console.log(data);

        var result = JSON.stringify(data);
        var dataphrase = JSON.parse(result);
       
        console.log('Data Filter Not Maching:',dataphrase.filter(({ status }) => status != item));
        return dataphrase.filter(({ status }) => status != item);


    }

    dataArticleStatus(data, item) {
        console.log(data);

        var result = JSON.stringify(data);
        var dataphrase = JSON.parse(result);
        
        console.log('Article Status:',dataphrase.filter(({ status }) => status != item));
        return dataphrase.filter(({ status }) => status != item);


    }


    customFilterFunction(items, query) {
        return _.filter(items, (item) => {
            var flat = squish(item);

            for (var key in flat) {
                if (String(flat[key]).toLowerCase().indexOf(query.toLowerCase()) >= 0)
                    return true;
            }


            return false;
        });
    }



    getInitialState() {
        return {
            "query": "",
            articles: this.getArticleFilter
        };
    }
    resetName(event) {
        this.setState({
            articles: event.getArticleFilter()
        });
    }
    searchChange() {

        if(this.refs.status.value === config.articlesStatusAll){
            this.setState({
                articles: this.getArticleFilter()
    
            });
            console.log("status case 1:",this.refs.status.value);
            console.log("status 1: Log data:", this.status.articles);
        }
        
        else {
            if (this.refs.status.value === config.articleStatus5) {
                
                            var selectBoxValue = config.articleStatus4;
                            
                            var userFilter = this.dataFilterNotMaching(this.state.allArticles, selectBoxValue);
                            console.log("status case 2:",this.refs.status.value);
                
                        

            }
            else{

            userFilter = this.customFilterFunction(this.state.allArticles, this.refs.status.value);
           
            console.log("status case 3:",this.refs.status.value);
            }
        }

        this.setState({
            status: this.refs.status.value,

            articles: userFilter

        });



    }

    


    componentDidMount() {
        this.props.dispatch(getIndex())
        this.setState({
            articles: this.getArticleFilter()
        })
    }
    componentWillUnmount() {
        this.setState({
            articles: this.getArticleFilter()
        })
    }
    
    handleClick = () => {
        ReactDOM.findDOMNode(this.refs.status).value = "";
        this.setState({
            articles: this.getArticleFilter()
        })
    }

    render() {


        const columnMeta = [{
            columnName: 'author',
            displayName: 'Author'
        }, {
            columnName: 'title',
            displayName: 'Title'
        }, {
            columnName: 'journal',
            displayName: 'Journal'
        }, {
            columnName: 'doi',
            displayName: 'DOI',

            customHeaderComponentProps: { color: 'blue' }
        }, {
            columnName: 'year',
            displayName: 'Year'
        }, {
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
                Table: { border: "2px solid #555 " },
            }
        }


        return (


            <section id="page-title">
                <div style={{ display: 'flex' }}>


                </div>

                <Grid>
                    <Row >
                        <Col sm={4} md={4}>


                        </Col>
                        <Col sm={8} md={8}>

                            <select onChange={this.searchChange} className='btn btn-default' style={boderSet} ref="status" cache={false} >
                                <option value={config.articlesStatusAll}>{config.articlesStatusAll}</option>
                                <option value={config.articleStatus1}>{config.articleStatus1}</option>
                                <option value={config.articleStatus2}>{config.articleStatus2}</option>
                                <option value={config.articleStatus3}>{config.articleStatus3}</option>
                                <option value={config.articleStatus4}>{config.articleStatus4}</option>
                                <option value={config.articleStatus5}>{config.articleStatus5}</option>

                            </select>


                            <Button onClick={this.handleClick}>Cancel Filter of Articles</Button>
                        </Col>

                    </Row>
                    <Row>
                        <Col></Col>
                    </Row>

                </Grid>

                <div className="container clearfix">


                    <h1>List of Articles:</h1>
                    <Griddle
                        tableClassName={'table table-bordered table-striped table-hover'}
                        results={this.state.articles}
                        //showFilter={true}
                        showSettings={true}
                        columns={["author", "title", "journal", "status", "year"]}
                        columnMetadata={columnMeta}
                        tableClassName={'table table-bordered table-striped table-hover'}
                        useGriddleStyles={true}
                        settingsToggleClassName='btn btn-default'
                        customPagerComponent={BootstrapPager}
                        resultsPerPage={5}
                        externalChangeSort={this.changeSort}
                        externalSetFilter={this.setFilter}
                        externalSortColumn={this.props.sortColumn}
                        externalSortAscending={this.props.sortAscending}
                        externalSetPageSize={this.setPageSize}
                        externalMaxPage={this.props.maxPages}
                        externalCurrentPage={this.props.currentPage}
                        styleConfig={styleConfig}

                    />


                </div>

            </section>

        )

    }
}
module.exports = Article;
