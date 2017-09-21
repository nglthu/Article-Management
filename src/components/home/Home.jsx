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
// import 'react-date-picker/index.css';
// import { DateField, Calendar } from 'react-date-picker'


//var datepicker = require('react-datepicker');

//import { DefaultModules } from 'griddle-render';
//const { RowDefinition, ColumnDefinition } = DefaultModules;

const config = require('../../constants/index.json');
var _ = require('underscore');
var squish = require('object-squish');

var colType={
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

class Home extends React.Component {

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
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        // this.onChange = this.onChange.bind(this);
        this.searchChange = this.searchChange.bind(this);
        //this.changeFilter = this.changeFilter.bind(this);

        // this.searchChange = this.searchChange.bind();

    }
    //search function to filter out value equal to Query
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
            user: this.getArticle
        };
    }
    resetName(event) {
        this.setState({
            user: event.getArticle
        });
    }
    searchChange() {
        //window.location.reload();
        //this.sevtState({ user: this.getArticle });
        console.log('test user:');

        var userFilter = this.customFilterFunction(this.state.user, this.refs.status.value);
        //var userFilter = this.customFilterFunction(this.state.user, this.state.selectedItem );
        this.setState({
            status: this.refs.status.value,

            user: userFilter

        });

        console.log('value of select');
        console.log(this.refs.status.value.toString());
        console.log('userFilter');
        console.log(userFilter);
        console.log('after filter a b c');
        console.log(this.state.user);
        // this.props.state.user.bind(this);

        //console.log(this.customFilterFunction(this.state.user,this.state.query));

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
                   
                </div>

                

                <div className="container clearfix">


                    <h1>List of Articles:</h1>
                    <Griddle
                        tableClassName={'table table-bordered table-striped table-hover'}
                        results={this.state.user}
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
module.exports = Home;
