import React from 'react';
import '../css/register.css';
import '../css/user.css';

class Register extends React.Component {

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

	componentDidMount() {
		// get the user's info form the back end based on the url param
		fetch("http://localhost:3000/users/"+this.props.match.params['id'])
        .then(res => res.json())
        .then((data) => {
			data[0]['picture_path'] = data[0]['picture_path']
          this.setState({ info: data[0] })
        })
        .catch(console.log)
	}

    render(){
        return(
			<div class="user-profile">
            	<h1>{this.state.info['name']}</h1>
				<div class="user-profile__image-wrapper">
					<img src={"http://localhost:8081/" + this.state.info['picture_path']} />
				</div>
				<p class="user-profile__info">Interests - {this.state.info['interests']}</p>
				<p class="user-profile__info">Zip - {this.state.info['location']}</p>
				<p class="user-profile__bio">{this.state.info['bio']}</p>
			</div>
        )
    }

}

export default Register;
