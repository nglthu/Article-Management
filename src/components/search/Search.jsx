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
import $ from 'jquery'
//import {cucumber} from "cucumber";


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
            status: '',
            rows: [{ "fieldName": "Author", "condition": "Contains", "value": "", "operator": "" }],
            optionsOperatorState: '',
            optionsFieldState: 'Author',
            optionsConditionState: 'Contains',
            searchText: ''
        }

        this.searchChange = this.searchChange.bind(this);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);

        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.getQueryList = this.getQueryList.bind(this);

    }

    getQueryList() {

        return this.state.rows.map((query, index) => (
            <tr key={index}>
                <td> {index == 0 ? '' : <select id={'ddOperator_' + index} value={query.operator} onChange={this.handleoptionsOperatorState.bind(this)} ref="slOperator">
                    <option value="And">And</option><option value="Or">Or</option>
                </select>}
                </td>
                <td>
                    If <select id={'ddFieldName_' + index} value={query.fieldName} onChange={this.handleoptionsFieldState.bind(this)} ref="slField">
                        <option value="Author">Author</option>
                        <option value="Title">Title</option>
                        <option value="Journal">Journal</option>
                        <option value="Status">Status</option>
                        <option value="DOI">DOI</option>
                        {/* <option value="Year">Year</option> */}
                    </select>
                </td>
                <td>
                    <select id={'ddCondition_' + index} value={query.condition} onChange={this.handleoptionsConditionState.bind(this)} ref="slCondition">
                        <option value="Contains">Contains</option>
                        <option value="Doesnotcontains">Does not contains</option>
                        <option value="Beginswith">Begins with</option>
                        <option value="Endswith">Ends with</option>
                        <option value="Isequalto">Is equal to</option>
                        {/* <option value="Islessthan">Is less than</option>
                        <option value="Islessthanorequal">Is less than or equal</option>
                        <option value="Ismorethan">Is more than</option>
                        <option value="Ismorethanorequal">Is more than or equal</option> */}
                    </select>
                </td>
                <td>
                    <input type="text" id={'txtsearch_' + index} value={query.value} onChange={this.handleSearchTextChange.bind(this)} />
                </td>
                <td><button onClick={this.addRow} >Add</button></td>
                <td>{index == 0 ? <button value={index} title='First row delete Disabled' disabled>Remove</button> : <button value={index} onClick={this.removeRow}>Remove</button>}</td>
            </tr>
        ))



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


    getInitialState() {
        return {
            query: "",
            user: this.getArticle
        };
    }
    resetName(event) {
        this.setState({
            user: event.getArticle
        });
    }


    handleoptionsOperatorState(e) {
        var id = e.target.id;

        var rowid = id.substring(id.indexOf('_') + 1);

        var queryRows = this.state.rows;

        queryRows[rowid].operator = e.target.value; //this.refs.slOperator.value;

        this.setState({ rows: queryRows });


        //this.setState({optionsOperatorState:this.refs.slOperator.value},()=>{alert(this.state.optionsOperatorState);console.log("Operator Select");})
        //alert(this.state.optionsOperatorState);
    }

    handleoptionsFieldState(e) {
        var id = e.target.id;

        var rowid = id.substring(id.indexOf('_') + 1);

        var queryRows = this.state.rows;

        queryRows[rowid].fieldName = e.target.value; //this.refs.slField.value;

        this.setState({ rows: queryRows }, () => { console.log("Field Select"); })

        //this.setState({optionsFieldState:this.refs.slField.value},()=>{alert(this.state.optionsFieldState);console.log("Field Select");})
        // alert(this.state.optionsFieldState);
    }

    handleoptionsConditionState(e) {
        var id = e.target.id;


        var rowid = id.substring(id.indexOf('_') + 1);

        var queryRows = this.state.rows;

        queryRows[rowid].condition = e.target.value;  //this.refs.slCondition.value;

        this.setState({ rows: queryRows });

        //	this.setState({optionsConditionState:this.refs.slCondition.value},()=>{alert(this.state.optionsConditionState);console.log("Condition Select");})
        //     alert(this.state.optionsConditionState);
    }

    handleSearchTextChange(e) {
        var id = e.target.id;

        var rowid = id.substring(id.indexOf('_') + 1);

        var queryRows = this.state.rows;



        //var tmprow=  this.state.rows[rowid];

        //alert(JSON.stringify(queryRows[rowid].value));
        queryRows[rowid].value = e.target.value;
        // alert(JSON.stringify(queryRows[rowid].value));
        // alert(JSON.stringify(queryRows));

        this.setState({ rows: queryRows });
        //this.setState({searchText:e.target.value},()=>{alert(this.state.searchText);console.log("Text Change");})
        //alert(this.state.searchText);
    }

    handleChangeDataSource = () => {
        this.setState({
            user: this.getArticle()
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
        console.log("date to after click", this.state.startDateTo);
    }



    toggleCalendar(e) {
        e && e.preventDefault()
        this.setState({ isOpen: !this.state.isOpen })
    }

    dateFilterQuery(data, dateFrom, dateTo) {
        console.log(data);

        var result = JSON.stringify(data);
        var dateFilter = JSON.parse(result);

        var dataFilterYear = dateFilter.filter(function (a) {

            return ((parseInt(a.year) >= dateFrom) && (parseInt(a.year) <= dateTo))

        });
        return dataFilterYear;
    }
    /*Data is after date filter query
    rows is option for search */



    dataFilterAll(data, rows) {

        let optionFilterData = [];
        optionFilterData.length = 0;

        for (var row = 0; row < rows.length; row++) {
            switch (rows[row].fieldName) {
                case 'Author':

                    var dateFilterData2 = data.filter(function (a) {



                        if ((rows[row].condition === "Contains") && (rows[row].value != "") && (a.author.toLowerCase().indexOf(rows[row].value.toLowerCase()) >= 0)) {
                            console.log("author filter:", a);
                            optionFilterData.push(a);
                            return a;
                        }


                        if ((rows[row].condition === "Isequalto") && (rows[row].value != "") && (a.author === rows[row].value)) {
                            console.log("author filter:", a);

                            optionFilterData.push(a);
                            return a;
                        }

                        if ((rows[row].condition === "Doesnotcontains") && (rows[row].value != "") && (a.author.toLowerCase().indexOf(rows[row].value.toLowerCase()) === -1)) {
                            console.log("contain value:", a.author.toLowerCase().includes(rows[row].value));
                            console.log("author filter:", a);
                            optionFilterData.push(a);
                            return a;
                        }


                        if ((rows[row].condition === "Beginswith") && (rows[row].value != "") && (a.author.toLowerCase().trim().startsWith(rows[row].value))) {


                            optionFilterData.push(a);
                            return a;
                        }

                        if ((rows[row].condition === "Endswith") && (rows[row].value != "") && (a.author.toLowerCase().endsWith(rows[row].value))) {

                            optionFilterData.push(a);
                            return a;
                        }

                        else {
                            console.log("NO CONDITION FOUND");
                        }


                    });

                    break;
                case 'Title':

                    var dateFilterData2 = data.filter(function (a) {



                        if ((rows[row].condition === "Contains") && (rows[row].value != "") && (a.title.toLowerCase().indexOf(rows[row].value.toLowerCase()) >= 0)) {
                            console.log("title filter:", a);
                            optionFilterData.push(a);
                            return a;
                        }


                        if ((rows[row].condition === "Isequalto") && (rows[row].value != "") && (a.title === rows[row].value)) {
                            console.log("title filter:", a);

                            optionFilterData.push(a);
                            return a;
                        }

                        if ((rows[row].condition === "Doesnotcontains") && (rows[row].value != "") && (a.title.toLowerCase().indexOf(rows[row].value.toLowerCase()) === -1)) {
                            console.log("contain value:", a.title.toLowerCase().includes(rows[row].value));
                            console.log("title filter:", a);
                            optionFilterData.push(a);
                            return a;
                        }


                        if ((rows[row].condition === "Beginswith") && (rows[row].value != "") && (a.title.toLowerCase().trim().startsWith(rows[row].value))) {


                            optionFilterData.push(a);
                            return a;
                        }

                        if ((rows[row].condition === "Endswith") && (rows[row].value != "") && (a.title.toLowerCase().endsWith(rows[row].value))) {

                            optionFilterData.push(a);
                            return a;
                        }

                        else {
                            console.log("NO CONDITION OF TITLE FOUND");
                        }


                    });

                    break;
                
                    case 'Journal':
                    
                                        var dateFilterData2 = data.filter(function (a) {
                    
                   
                    
                                            if ((rows[row].condition === "Contains") && (rows[row].value != "") && (a.journal.toLowerCase().indexOf(rows[row].value.toLowerCase()) >= 0)) {
                                                console.log("journal filter:", a);
                                                optionFilterData.push(a);
                                                return a;
                                            }
                    
                    
                                            if ((rows[row].condition === "Isequalto") && (rows[row].value != "") && (a.journal.toLowerCase() === rows[row].value.toLowerCase())) {
                                                console.log("journal filter:", a);
                    
                                                optionFilterData.push(a);
                                                return a;
                                            }
                    
                                            if ((rows[row].condition === "Doesnotcontains") && (rows[row].value != "") && (a.journal.toLowerCase().indexOf(rows[row].value.toLowerCase()) === -1)) {
                                                console.log("contain value:", a.journal.toLowerCase().includes(rows[row].value));
                                                console.log("journal filter:", a);
                                                optionFilterData.push(a);
                                                return a;
                                            }
                    
                    
                                            if ((rows[row].condition === "Beginswith") && (rows[row].value != "") && (a.journal.toLowerCase().trim().startsWith(rows[row].value))) {
                    
                    
                                                optionFilterData.push(a);
                                                return a;
                                            }
                    
                                            if ((rows[row].condition === "Endswith") && (rows[row].value != "") && (a.journal.toLowerCase().endsWith(rows[row].value))) {
                    
                                                optionFilterData.push(a);
                                                return a;
                                            }
                    
                                            else {
                                                console.log("NO CONDITION OF JOURNAL FOUND");
                                            }
                    
                    
                                        });
                    
                                        break;

                default:
                    return "";
            }
        }


        console.log("Filter data after Option:");
        console.log(optionFilterData);
        return optionFilterData;



    }
    //TODO: Keep here to work on the search option for date
    searchChange() {


        this.setState({

            user: this.getArticle,
            rows: this.state.rows

        });


        console.log("dateFrom:", this.state.startDateFrom.year());
        console.log("dateTo:", this.state.startDateTo.year());
        console.log("data", this.state.user);

        var yearFrom = parseInt(this.state.startDateFrom.year());
        var yearTo = parseInt(this.state.startDateTo.year());
        var rows = this.state.rows;

        var dataDateFilter = this.dateFilterQuery(this.state.user, yearFrom, yearTo);
        console.log("rows length:", rows.length, "row value: ", rows.value);
        if (rows.length == 1 && typeof rows.value == 'undefined') {
            var dataFilter = dataDateFilter;
        }
        else {
            dataFilter = this.dataFilterAll(dataDateFilter, rows);
        }
        console.log("Data filter: ", dataFilter);

        this.setState({

            user: dataFilter

        });
    }





    textOnClick(e) {
        e.stopPropagation();
    }

    filterText(e) {
        this.props.filterByColumn(this.state.query, this.props.year)
    }

    addRow() {
        var rows = this.state.rows;

        var strval = "";
        if (rows.length >= 1) {
            strval = '{"fieldName":"Author","condition":"Contains","value":"","operator":"And"}';
        }
        else {
            strval = '{"fieldName":"Author","condition":"Contains","value":"","operator":""}';
        }
        rows.push(JSON.parse(strval));
        this.setState({ rows: rows });

    }

    removeRow(e) {
        var ind = e.target.value;
        var rows = this.state.rows;
        rows.splice(ind, 1);
        this.setState({ rows: rows });
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
            displayName: 'Author',
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


                            </Col>
                            <Col sm={4} md={4}>

                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row>
                            <Col sm={1} md={1}>
                                Description:
                            </Col>
                            <Col sm={3} md={9}>
                                {JSON.stringify(this.state.rows, null, 2)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={1} md={1}>
                                Date from:
                            </Col>
                            <Col sm={3} md={3}>
                                <DatePicker ref="dateFrom" className='btn btn-default'
                                    dateFormat="DD-MM-YYYY"
                                    selected={this.state.startDateFrom}
                                    onChange={this.handleChangeFrom}
                                />
                            </Col>
                            <Col sm={1} md={1}>To: </Col>
                            <Col sm={3} md={3}><DatePicker ref="dateTo" className='btn btn-default'
                                dateFormat="DD-MM-YYYY"
                                selected={this.state.startDateTo}
                                onChange={this.handleChangeTo}
                            /></Col>
                            <Col sm={1} md={1}>
                                <Button onClick={this.searchChange}>Filter</Button>
                            </Col>
                            <Col sm={1} md={1}>
                                <Button onClick={this.handleChangeDataSource}>Cancle</Button>
                            </Col>
                        </Row>
                    </Grid>

                </div>

                <div>
                    <table>
                        <tbody>
                            {this.getQueryList()}
                        </tbody>
                    </table>

                </div>

                <div className="container clearfix">


                    <h1>List of Articles from Year to Year:</h1>
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


                    />


                </div>

            </section>

        )

    }
}
module.exports = Search;
// this.Then(/^Filter all data $/, function(callback) {

//     callback.pending();
//   });