import React from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
var moment = require('moment');
import DatePicker from "react-datepicker";
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

//import {defaultLayout} from "/src/component/application/Header.jsx"
//var defaultLayout = require('./Mascter');



class Search extends React.Component {


    render() {
        return (
            <div className="container clearfix">
                <h1>Search...</h1>
            </div>
        )
    }

}
module.exports = Search;
