import React from 'react';
import '../css/user.css';
import Register from './register';

class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Register type={'users'} />
        )
    }

}

export default RegisterUser;
