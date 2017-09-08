import React from 'react';
import {Link} from 'react-router-dom'
//import Banner from 'react-banner'
//import 'react-banner/dist/style.css'

class Header extends React.Component{

    constructor(props){
        super(props)
        this.handleLink = this.handleLink.bind(this)
    }

    handleLink(){
        console.log("handling the link")
    }

    render(){
        
        var self = this;
        var menu = [
            {
                value:"Home",
                link: "/"
            },
            {
                value:"Data",
                link: "/dataGet"
            }
        ]
        var menuItems = menu.map((item,i) => {
            return(
                <li key={i} >
                    <Link to={item.link} onClick={self.handleLink}>
                        {item.value}
                    </Link>
                </li>
            )
        })

        return(
            <header id="header" className="full-header">
                <div id="header-wrap">
                    <div className="container clearfix">
                        <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
                        <nav id="primary-menu" className="style-4">
                            <ul>
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