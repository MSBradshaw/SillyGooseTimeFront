import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './components/home';
import register from './components/register';
import user from './components/user';
import login from './components/login';
import profile from './components/profile';
import updateprofile from './components/updateprofile';
import registeruser from './components/registeruser';
import registerplace from './components/registerplace';
import matches from './components/matches';
import match from './components/match';
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
                    <div class="title_wrapper">
                        <svg viewBox="0 0 500 500">
                            <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                            <text width="500">
                                <textPath href="#curve">
                                Silly Goose Time
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <NavBar />
                </header>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={home} exact/>
                        <Route path="/user/:id" component={user}/>
                        <Route path="/login" component={login}/>
                        <Route path="/profile" component={profile}/>
                        <Route path="/updateprofile" component={updateprofile}/>
                        <Route path="/registeruser" component={registeruser}/>
                        <Route path="/registerplace" component={registerplace}/>
                        <Route path="/matches" component={matches}/>
                        <Route path="/match/:id" component={match}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
