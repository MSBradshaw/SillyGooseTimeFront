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
                <p>A Silly Goose Time is meant to describe a fun time spent with good people. Examples of A Silly Goose Time are: playing pick-up soccer, going to see a new movie, trying a new restaurant, or just going for a stroll. A Silly Goose Time is not stressful. A Silly Goose Time is inclusive. A Silly Goose Time is safe, relaxed, fun, and-well-SILLY!</p>
                <div class='homepage__img_wrapper'>
                    <img src={sillygooseimg}/>
                </div>
            </div>
        )
    }
}

export default Home;
