import React from 'react';
import '../css/register.css';

const axios = require("axios");

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            interests:'',
            location:'',
            picture_path:'',
            bio:'',
            type_of_user: this.props.type
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        console.log('image changed!')

        const formData = new FormData();
        formData.append('myImage',e.target.files[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://sillygoosetimeback-dev.us-east-2.elasticbeanstalk.com/photos",formData,config)
            .then((response) => {
                console.log(response)
                // the response if successful is the path to the file on the server
                // save the path in the state
                this.setState({picture_path: response.data});
                console.log("The file is successfully uploaded");
            }).catch((error) => {
                console.log('something failed')
        });
    }
    render(){
        // generate multiple more or less identical form fields
        // these are their names, they much match what is in state
        var fields = ['name','email','password','location','interests'];
        var items = [];
        // these need to be ordered the same at the fields list
        var state_values = [
            this.state.name,
            this.state.email,
            this.state.password,
            this.state.location,
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
                <div class="form_item photo_upload">
                    <input type="file" name="myImage" onChange= {this.onChange} />
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
        // From: https://stackoverflow.com/questions/50774176/sending-file-and-json-in-post-multipart-form-data-request-with-axios
        // var self = this;
        axios({
          method: 'post',
          url: 'http://sillygoosetimeback-dev.us-east-2.elasticbeanstalk.com/users',
          data: this.state
      }).then(function(response){
          window.location.replace("/login");
      });
    }
}

export default Register;
