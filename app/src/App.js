import React from 'react';
import logo from './big-goose.png';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Default Message'
        }
    }
    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        It's Silly Goose Time!
                    </p>
                    <form>
                        <label for="message">Secret Message:</label>
                        <input type="text" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)}></input>
                        <button onClick={this.sendMessage.bind(this)}>Send Message</button>
                    </form>
                </header>
            </div>
        )
    }
    onMessageChange(event){
        this.setState({message: event.target.value})
    }
    sendMessage(event){
        event.preventDefault()
        console.log(this.state.message)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log('{"Cheese":"'+this.state.message+'"}')
        xhr.send('{"Cheese":"'+this.state.message+'"}');
    }
}

export default App;
