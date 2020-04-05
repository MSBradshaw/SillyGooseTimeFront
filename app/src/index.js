import React from 'react';
// Please refer this: https://www.npmjs.com/package/react-snapshot
// import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';

import './index.css';
import App from './App';

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
