// This is where 'npm start' and 'npm build' will start with our application.
// In this file we need a ReactDOM.render call in order to actually attach our
// App component to the DOM.
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Most often this is the only place we touch the actual DOM, all of our work
// goes inside of App.
ReactDOM.render(<App />, document.getElementById('root'));