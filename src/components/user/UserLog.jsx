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


class UserLog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

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
          userData: json
        })
      });
  }

  componentDidMount() {
    // this.props.dispatch(getIndex())
    this.setState({

      userData: this.getUserAdminData()
    })
  }
  componentWillUnmount() {
  }

  showUserRole() {

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


        <select ref="sl">
          <option value="admin">Admin </option>
          <option value="moderator">Moderator </option>
          <option value="user">User </option>
        </select>

        <button onClick={this.showUserRole.bind(this)}>Show value</button>




        <defaultLayout>
          <section id="page-title">
            <div className="container clearfix">
              <h1>List of User:</h1>
              <Griddle

                results={this.state.userData}
                showFilter={true}
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