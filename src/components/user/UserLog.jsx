import React from 'react';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import { getIndex } from "../../actions/indexActions.js"
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap';

import ReactDOM from 'react-dom';

import { DefaultModules } from 'griddle-render';
const { RowDefinition, ColumnDefinition } = DefaultModules


const config = require('../../constants/index.json');




//console.log("++++++++FILE HOME.JSX " + config.urlData);

//two variables for searching on Grid
var _ = require('underscore');
var squish = require('object-squish');


class UserLog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userDataInitial: {}, //get 1 time
      status: '',
      userData: {}
    }
  }


  getUserAdminData() {
    fetch(config.urlUserAdmin)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({
          userData: json,
          userDataInitial: json
        })
      });
  }

  getInitialState() {
    return {
      "query": "",
      userData: this.getUserAdminData,

    };
  }

  componentDidMount() {
    // this.props.dispatch(getIndex())
    this.setState({
      userData: this.getUserAdminData(),

    })
  }
  componentWillUnmount() {
  }

  customFilterFunction(items, query) {
    //alert("Items: " + items);
    //alert("query: " + query);
    return _.filter(items, (item) => {
      //alert("------Item without s: " + item); //filter each row on Grid
      var flat = squish(item);
      console.log("1. Filter Check");
      console.log(query);
      var test = false;

      for (var key in flat) {
        if (String(flat[key]).toLowerCase().indexOf(query.toLowerCase()) >= 0)
          return true;
      }


      return false;
    });
  }


  updateSearch() {
    var getValueSelect = this.refs.sl.value;
    //alert(getValueSelect);

    if (getValueSelect === 'All') {
      //alert("1");
      this.setState({
        userData: this.getUserAdminData()
      });

    }
    else {
      // alert("2");

      var userFilter = this.customFilterFunction(this.state.userDataInitial, getValueSelect);
      this.setState({

        userData: userFilter

      });

    }




  }

  render() {


    //field will be find in settings
    var columnMeta2 = [{
      columnName: 'LoginName',
      displayName: 'Login Name'
    }, {
      columnName: 'Role',
      displayName: 'Role Name'
    }
    ];


    //   console.log("++++++++This is state of user (HOME.JSX)" + this.state.userData);
    return (


      <div>
        <style>


          {`td, td * {   white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            } 
            
           
            `}




        </style>

        


        <p style={{ display: 'flex', justifyContent: 'center' }}>
          <select className='btn btn-default'  ref="sl" onChange={this.updateSearch.bind(this)} >
            <option value='All'>All User</option>
            <option value="admin">Admin </option>
            <option value="moderator">Moderator </option>
            <option value="user">User </option>
          </select>
        </p>
        {/* <button onClick={this.showUserRole.bind(this)}>Show value</button> */}

        <defaultLayout>
          <section id="page-title">
            <div className="container clearfix">
              <h1>List of User:</h1>
              <Griddle

                results={this.state.userData}
                showFilter={false}
                showSettings={true}
                columns={["LoginName", "FullName", "Email", "Affiliation", "Role", "Gender", "Age"]}
                columnMetadata={columnMeta2}
                tableClassName={'table table-bordered table-striped table-hover '}
                useGriddleStyles={true}
                settingsToggleClassName='btn btn-default'
                customPagerComponent={BootstrapPager}
                resultsPerPage={50}
                externalChangeSort={this.changeSort}
                externalSetFilter={this.setFilter}
                externalSortColumn={this.props.sortColumn}
                externalSortAscending={this.props.sortAscending}
                externalSetPageSize={this.setPageSize}
                externalMaxPage={this.props.maxPages}
                externalCurrentPage={this.props.currentPage}
              >
              </Griddle>
            </div>
          </section>

        </defaultLayout>
      </div>

    )



  }

}
module.exports = UserLog;
