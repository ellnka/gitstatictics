import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

import Search from './components/search';
import UserProfile from './components/userProfile';
import Stats from './components/stats';
import Repos from './components/repos';

ReactDOM.render(
    <Router basename="/">
        <div>
            <Route path="/" component={Search} />
        </div>
    </Router>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
