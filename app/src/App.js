import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './components/home';
// import register from './components/register';
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

// Dark mode code adapted from this website https://hn.werick.codes/how-to-add-a-dark-mode-to-your-react-web-app-cjzdu6ic1000auss1irfq4rtt
class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // Define a state object to hold our app's state
    state = {
    // Boolean attribute that will allow us to toggle the switch
    // Keep the switch on if the theme is dark
    checked: localStorage.getItem("theme") === "dark" ? true : false,
    /**
     * When a user activates the dark theme we will store the value
     * on localstorage or set default value to light if it is neither dark
     * nor light
     */
    theme: localStorage.getItem("theme")
    };

    componentDidMount() {
    // Update the data-theme attribute of our html tag
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
    }

    // Class method allowing us to toggle the theme change
    toggleThemeChange = () => {
    const { checked } = this.state;
    // If theme is light then change to dark
    if (checked === false) {
      // Update localstorage
      localStorage.setItem("theme", "dark");
      /**
       * The document.getElementsByTagName(...).setAttribute(...)
       * will only update the value
       */
      // Update the data-theme attribute of our html tag
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      // Update our state
      this.setState({
        // Ensure our switch is on if we change to dark theme
        checked: true
      });
    } else {
      // Update localstorage
      localStorage.setItem("theme", "light");
      /**
       * The document.getElementsByTagName(...).setAttribute(...)
       * will only update the value until the App is mounted and we change
       * the state of the switch so we will need to introduce
       * a React lifecycle called ˝componentDidMount()˝
       */
      // Update the data-theme attribute of our html tag
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      // Update our state
      this.setState({
        // Ensure our switch is off if we change to light theme
        checked: false
      });
    };
}

    render() {
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
                <p> Click the button to toggle between light and dark mode </p>
                <label class="switch">
                <input type="checkbox" 
                    // checked={this.state.checked}
                    defaultChecked={this.state.checked}
                    onChange={() => this.toggleThemeChange()}
                />
                <span class="slider round" />
                </label>
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
