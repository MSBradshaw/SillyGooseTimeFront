import React from 'react';
import '../css/login.css';
import {set_cookies} from '../cookies';


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
		this.setState({[event.target.id]: event.target.value})
	}
	sendMessage(event){
		event.preventDefault()
		var self = this;
		axios({
		  method: 'post',
		  url: 'http://sillygoosetimeback-dev.us-east-2.elasticbeanstalk.com/login',
		  data: this.state
		}).then(function (response) {
			set_cookies(self.state.email,response['data']['auth'],response['data']['id']);
			window.location.replace("/");
		}).catch(error => {
			alert(error.response['data']);
		});
	}
}

export default Login;
