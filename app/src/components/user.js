import React from 'react';
import '../css/user.css';
import UserProp from './userprops';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			info:{
	            name:'',
	            email:'',
	            password:'',
	            interests:'',
	            location:'',
	            picture_path:'',
	            bio:'',
	            id:'',
	        }
        }
    }

    render(){
        return(
            <UserProp user_id={this.props.match.params['id']} />

        )
    }

}

export default User;
