import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

import Search from './components/search';
import UserProfile from './components/userProfile';
import Stats from './components/stats';
import Repos from './components/repos';

ReactDOM.render(
    <BrowserRouter basename="/gitstats">
        <div>
            <Route exact path="/" component={Search}/>
            <Route path='/userProfile/:username' component={UserProfile}/>
            <Route path='/userProfile/:username/stats' component={Stats}/>
            <Route path='/userProfile/:username/repos' component={Repos}/>
        </div>
    </BrowserRouter>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
