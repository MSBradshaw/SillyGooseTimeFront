import React from 'react';
import '../css/login.css';
const axios = require("axios");


function set_cookies(email,auth,id){
	var date = new Date();
	date.setDate(date.getDate() + 1);

	var cookie_string_email = "sillygoose_email=EMAIL; expires=DATE";
	cookie_string_email = cookie_string_email.replace('EMAIL',email);
	cookie_string_email = cookie_string_email.replace('DATE',date);

	var cookie_string_auth = "sillygoose_auth=AUTH; expires=DATE";
	cookie_string_auth = cookie_string_auth.replace('AUTH',auth);
	cookie_string_auth = cookie_string_auth.replace('DATE',date);

	var cookie_string_id = "sillygoose_id=ID; expires=DATE";
	cookie_string_id = cookie_string_id.replace('ID',id);
	cookie_string_id = cookie_string_id.replace('DATE',date);

	console.log(cookie_string_auth)
	console.log(cookie_string_email)
	console.log(cookie_string_id)
	document.cookie = cookie_string_auth;
	document.cookie = cookie_string_email;
	document.cookie = cookie_string_id;
}


function get_auth_cookies(){
	var cookies = document.cookie
	var email = cookies.match(/sillygoose_email=[^\s]*;/g)[0].replace('sillygoose_email=','').replace(';','');
	var auth = cookies.match(/sillygoose_auth=.*(;|$)/g)[0].replace('sillygoose_auth=','').replace(';','');
	var id = cookies.match(/sillygoose_id=[^\s]*/g)[0].replace('sillygoose_id=','').replace(';','');
	return([email,auth,id]);
}


class Login extends React.Component {

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

		axios({
		  method: 'post',
		  url: 'http://localhost:8081/login',
		  data: this.state
		}).then(function (response) {
			console.log(response);
			set_cookies(self.state.email,response['data']['auth'],response['data']['id']);
		}).catch(error => {
		    console.log(error.response['data'])
			alert(error.response['data']);
		});
	}
}

export default Login;
