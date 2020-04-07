import React from 'react';
import '../App.css';
import '../css/home.css';

import sillygooseimg from '../sillygoosetime.jpeg';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Default Message'
        }
    }
    render(){
        return(
            <div class='homepage'>
                <html>
                <body>
                <p>A Silly Goose Time is meant to describe a fun time spent with good people. Examples of A Silly Goose Time are: playing pick-up soccer, going to see a new movie, trying a new restaurant, or just going for a stroll. A Silly Goose Time is not stressful. A Silly Goose Time is inclusive. A Silly Goose Time is safe, relaxed, fun, and-well-SILLY!</p>
                <button onclick="myFunction()">Toggle dark mode</button>
                <script>
                function myFunction() {
                   var element = document.body;
                   element.classList.toggle("dark-mode");
                }
                </script>
                </body>
                </html>
        
                 <div class='homepage__img_wrapper'>
                    <img src={sillygooseimg} alt=""/>
                </div>
            </div>
        )
    }
}

export default Home;
