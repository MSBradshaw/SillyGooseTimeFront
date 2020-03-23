import React from 'react';
import '../css/profile.css';
import UserProp from './userprops';


const axios = require("axios");

function get_auth_cookies(){
	var cookies = document.cookie
	var email = cookies.match(/sillygoose_email=[^\s]*;/g)[0].replace('sillygoose_email=','').replace(';','');
	var auth = cookies.match(/sillygoose_auth=.*(;|$)/g)[0].replace('sillygoose_auth=','').replace(';','');
	var id = cookies.match(/sillygoose_id=[^\s]*/g)[0].replace('sillygoose_id=','');
	return([email,auth,id]);
}


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
			<h2 class="edit_button"><a src="">Edit Profile</a></h2>

			<UserProp user_id={cookies[2]}/>
			</div>
        )
    }

}

export default Profile;
