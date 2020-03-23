import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './components/home';
import register from './components/register';
import user from './components/user';
import login from './components/login';
import profile from './components/profile';
import updateprofile from './components/updateprofile';
import NavBar from './components/navbar';

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
                    <NavBar />
                </header>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={home} exact/>
                        <Route path="/register" component={register}/>
                        <Route path="/user/:id" component={user}/>
                        <Route path="/login" component={login}/>
                        <Route path="/profile" component={profile}/>
                        <Route path="/updateprofile" component={updateprofile}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
