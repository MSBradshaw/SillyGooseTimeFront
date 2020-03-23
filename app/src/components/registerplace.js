import React from 'react';
import '../css/user.css';
import Register from './register';

class RegisterPlace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Register type={'place'} />
        )
    }

}

export default RegisterPlace;
