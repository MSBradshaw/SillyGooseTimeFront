import React from 'react';
import '../css/profile.css';
import UserProp from './userprops';
import {delete_cookies, get_auth_cookies, set_cookies} from '../cookies';


const axios = require("axios");

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			info:{
	            email:'',
	            password:''
	        }
        }
    }

    render(){
		var cookies = get_auth_cookies();
        return(
			<div>
			<h2 class="edit_button"><a href="/updateprofile">Edit Profile</a></h2>

			<UserProp user_id={cookies[2]}/>
			</div>
        )
    }

}

export default Profile;
