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
//import Griddle, { plugins } from 'griddle-react';
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
//import {defaultLayout} from "/src/component/application/Header.jsx"
//var defaultLayout = require('./Mascter');

console.log(config.url);
@connect((store) => {
    return {
        index: store.index
    }
})

class Search extends React.Component {

    getArticle() {
        fetch(config.url)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.setState({
                    user: json
                })
            });
    }
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userFull: {},
            startDateFrom: moment(),
            startDateTo: moment(),
            query: '',
            status: ''



        }

        this.searchChange = this.searchChange.bind(this);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);

    }
    //search function to filter out value equal to Query
    //Query matching
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
    //TODO: get object and filter year and Month from here
    ///////////////////
    dataFilterNotMaching(data, item) {
        console.log(data);

        var result = JSON.stringify(data);
        var dataphrase = JSON.parse(result);

        console.log('Data Filter Not Maching:', dataphrase.filter(({ status }) => status != item));
        return dataphrase.filter(({ status }) => status != item);


    }


    getInitialState() {
        return {
            "query": "",
            user: this.getArticle
        };
    }
    resetName(event) {
        this.setState({
            user: event.getArticle
        });
    }


    dataArticleStatus(data, item) {
        console.log(data);

        var result = JSON.stringify(data);
        var dataphrase = JSON.parse(result);

        console.log('Article Status:', dataphrase.filter(({ status }) => status != item));
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
    //TODO: Keep here to work on the search option for date
    searchChange() {

        if (this.refs.status.value === config.articlesStatusAll) {
            this.setState({
                articles: this.getArticleFilter()

            });
            console.log("status case 1:", this.refs.status.value);
            console.log("status 1: Log data:", this.status.articles);
        }

        else {
            if (this.refs.status.value === config.articleStatus5) {

                var selectBoxValue = config.articleStatus4;

                var userFilter = this.dataFilterNotMaching(this.state.allArticles, selectBoxValue);
                console.log("status case 2:", this.refs.status.value);



            }
            else {

                userFilter = this.customFilterFunction(this.state.allArticles, this.refs.status.value);

                console.log("status case 3:", this.refs.status.value);
            }
        }

        this.setState({
            status: this.refs.status.value,

            articles: userFilter

        });



    }

    handleChangeDataSource() {
        this.setState({
            user: getArticle
        })
    }

    handleChangeFrom(date) {
        this.setState({
            startDateFrom: date

        });
        this.toggleCalendar()
    }

    handleChangeTo(date) {
        this.setState({
            startDateTo: date

        });
        this.toggleCalendar()
    }



    toggleCalendar(e) {
        e && e.preventDefault()
        this.setState({ isOpen: !this.state.isOpen })
    }



    textOnClick(e) {
        e.stopPropagation();
    }

    filterText(e) {
        this.props.filterByColumn(this.state.query, this.props.year)
    }


    componentDidMount() {
        this.props.dispatch(getIndex())
        this.setState({
            user: this.getArticle()
        })
    }
    componentWillUnmount() {
        this.setState({
            user: this.getArticle()
        })
    }
    searchChangeNew(e, value) {
        console.log(e, value);
        this.props.changeFilter(value);
    }
    handleClick = () => {
        ReactDOM.findDOMNode(this.refs.status).value = "";
        this.setState({
            user: this.getArticle()
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
                    <Grid>
                        <Row>
                            <Col sm={2} md={2}>

                            </Col>
                            <Col sm={6} md={6}>





                                {/* <DropdownButton onClick={this.searchChange} ref="status" cache={false} >
                                <MenuItem key="1995">1995</MenuItem>
                                <MenuItem key="2004">2004</MenuItem>
                                <MenuItem key="2010" active>2010</MenuItem>
                                <MenuItem divider />
                                <MenuItem key="2013">2013</MenuItem>
                            </DropdownButton> } */}
                                {/* 
                                <Button onClick={this.handleClick}>Cancel</Button> */}
                            </Col>
                            <Col sm={4} md={4}>



                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row>


                            <Col sm={1} md={1}>
                                Date from:
                            </Col>
                            <Col sm={3} md={3}>
                                <DatePicker ref="dateFrom" className='btn btn-default' 
                                    selected={this.state.startDateFrom}
                                    onChange={this.handleChangeFrom}
                                />
                            </Col>
                            <Col sm={1} md={1}>To: </Col>
                            <Col sm={3} md={3}><DatePicker ref="dateTo" className='btn btn-default'
                                selected={this.state.startDateTo}
                                onChange={this.handleChangeTo}
                            /></Col>
                            <Col sm={2} md={2}>
                                <Button onClick={this.searchChange}>Filter</Button>
                            </Col>
                        </Row>
                    </Grid>

                </div>



                <div className="container clearfix">


                    <h1>List of Articles:</h1>
                    <Griddle
                        tableClassName={'table table-bordered table-striped table-hover'}
                        results={this.state.user}
                        showFilter={true}
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

                    /*  { useCustomFilterer={true}
                      customFilterer={this.customFilterFunction}
                      useCustomFilterComponent={true}
                      customFilterComponent={this.customFilterComponent} }*/

                    />


                </div>

            </section>

        )

    }
}
module.exports = Search;
