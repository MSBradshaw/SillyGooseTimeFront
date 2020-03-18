import React from 'react';
import '../css/register.css';
import logo from '../big-goose.png';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            interests:'',
            zip:'',
            picture_path:'dumby/path/for/now.png',
            bio:''
        }
    }
    render(){
        // generate multiple more or less identical form fields
        // these are their names, they much match what is in state
        var fields = ['name','email','password','zip','interests'];
        var items = [];
        // these need to be ordered the same at the fields list
        var state_values = [
            this.state.name,
            this.state.email,
            this.state.password,
            this.state.zip,
            this.state.interests];
        // create a div with stuff in it for each one
        for (const [index, value] of fields.entries()) {
            items.push(
                <div class="form_item">
                    <label for={value}>{value}</label>
                    <input type="text" id={value} value={state_values[index]} onChange={this.onMessageChange.bind(this)}></input>
                </div>
            )
        }
        return(
            <form>
                {items}
                <div class="form_item">
                    <label for="bio">bio</label>
                    <textarea type="text" id="bio" value={this.state.bio} onChange={this.onMessageChange.bind(this)}></textarea>
                </div>
                <button onClick={this.sendMessage.bind(this)}>Register</button>
            </form>
        )
    }
    onMessageChange(event){
        console.log(event.target.value);
        // this {state item: value}
        this.setState({[event.target.id]: event.target.value})
    }
    sendMessage(event){
        event.preventDefault()
        // send a post request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/users', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // make all the info in state JSON
        var info = JSON.stringify(this.state);
        console.log(info);
        // send it!
        xhr.send(info);
    }
}

export default Register;
