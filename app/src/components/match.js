import React from 'react';
import '../css/matches.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
		console.log(this.props.match.params['id'])
        return(
			<h1>{this.props.match.params['id']}</h1>
        )
    }

}

export default User;
