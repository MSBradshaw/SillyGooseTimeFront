import React from 'react';
import '../css/navbar.css';
import {delete_cookies, get_auth_cookies} from '../cookies';

const axios = require("axios");

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

	componentDidMount() {
		var cookies = get_auth_cookies();
		console.log('-----')
		console.log(cookies)
		console.log('-----')
	}
	logout(){
		console.log('logging out');
		delete_cookies();
		window.location.replace("/");
	}
    render(){
		var cookies = get_auth_cookies();
		if(cookies !== -1){
			return(
	            <div>
					<a class="nav_item" href="/">Home</a>
					<a class="nav_item" href="/profile">Profile</a>
					<a class="nav_item" href="/profile">Matches</a>
					<span class="nav_item" onClick={this.logout}>Logout</span>
				</div>
	        )
		}else{
			return(
				<div>
					<a class="nav_item" href="/">Home</a>
					<a class="nav_item" href="/login">Login</a>
					<a class="nav_item" href="/register">Register User</a>
					<a class="nav_item" href="/register">Register Business</a>
				</div>
			)
		}
    }

}

export default NavBar;
