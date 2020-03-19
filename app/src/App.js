import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './components/home';
import register from './components/register';
import uploader from './components/uploader';
import logo from './big-goose.png';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        It's Silly Goose Time!
                    </p>
                </header>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={home} exact/>
                        <Route path="/register" component={register}/>
                        <Route path="/uploader" component={uploader}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
