import React from 'react';
import '../css/profile.css';
import UserProp from './userprops';
import {get_auth_cookies} from '../cookies';

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
