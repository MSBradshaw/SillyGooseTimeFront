import React from 'react';
import '../css/login.css';
import {delete_cookies, get_auth_cookies, set_cookies} from '../cookies';

const axios = require("axios");


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    render(){
		console.log('--------');
		console.log(get_auth_cookies());
		console.log('--------');
        return(
			<form>
				<div class="form_item">
					<label for="email">Email</label>
					<input type="text" id="email" value={this.state.email} onChange={this.onMessageChange.bind(this)}></input>
				</div>
				<div class="form_item">
					<label for="email">Password</label>
					<input type="password" id="password" value={this.state.password} onChange={this.onMessageChange.bind(this)}></input>
				</div>
				<button onClick={this.sendMessage.bind(this)}>Login</button>
			</form>
        )
    }

	onMessageChange(event){
		console.log(event.target.value);
		this.setState({[event.target.id]: event.target.value})
	}
	sendMessage(event){
		event.preventDefault()
		var self = this;
		console.log(self.state)
		axios({
		  method: 'post',
		  url: 'http://sillygoosetimeback-dev.us-east-2.elasticbeanstalk.com/login',
		  data: this.state
		}).then(function (response) {
			console.log('---Response----')
			console.log(response);
			console.log('-------')
			set_cookies(self.state.email,response['data']['auth'],response['data']['id']);
			window.location.replace("/");
		}).catch(error => {
		    console.log(error.response['data'])
			alert(error.response['data']);
		});
	}
}

export default Login;
