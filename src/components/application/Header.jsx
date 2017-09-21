import React from 'react';
import { Link } from 'react-router-dom'

//import $ from 'jquery';
//import Banner from 'react-banner'
//import 'react-banner/dist/style.css'
import { Nav, NavItem, NavDropdown, MenuItem, Grid, Col, Row, Button, DropdownButton, DropdownMenu } from 'react-bootstrap'
// import { Image } from 'react-native'


require('react-bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';


import { Navbar } from 'react-bootstrap-navbar/lib/components/Navbar';
var styles = {
    color: 'black',
   // backgroundColor: 'lightgrey',
    fontWeight: 'bold',
    
};

var navBar= {
    textright: {    
      //  alignSelf: 'flex-end',  
      },
    display:'block', 
    //background:'skyblue',
    hover: {
        color: 'black',
        
       // background: '#515151'
        backgroundColor: 'blue'
    },
    
    position: 'relative',
    backgroundColor: '#fefefe',
    
    padding: '10px',
    border: '1px solid #888',
   
};


var config = require('../../constants/index.json');


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleLink = this.handleLink.bind(this)
    }

    handleLink() {
        console.log("handling the link")
    }

    handleSelect(eventKey) {
        event.preventDefault();
        if (eventKey == 1) {  //Data get 
            window.location.replace(config.urlData);
        } else if (eventKey == 2) {
            window.location.replace(config.urlUser);
        }

        // alert(`selected ${eventKey}`);
    }



    render() {



        var self = this;

        var menu = [
            {
                value: "Home",
                link: "/"
            },
            {
                value: "UserLog",
                link: "/user"
            },
            {
                value: "Search",
                link: "/search"
            },
            {
                value: "Article",
                link: "/article"
            }
        ]


        var menuItems = menu.map((item, i) => {
            return (
                <ul className="navbar-nav btn" style={navBar} key={i} >
                    <Link to={item.link} onClick={self.handleLink}>
                        {item.value}
                    </Link>
                </ul>
            )
        })

        return (

            <header id="header" className="full-header">

                <div id="header-wrap">

                    <div className="container clearfix">

                        
                    </div>
                    <div className="collapse navbar-collapse" style={styles}>

                        <nav id="primary-menu" className="navbar navbar-toggleable-md navbar-light bg-active" >

                            <ul className="navbar-nav btn">
                                {menuItems}

                            </ul>

                        </nav>


                    </div>
                </div>
            </header>



        )
    }
}

module.exports = Header;