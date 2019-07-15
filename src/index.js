import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

import Search from './components/search';

ReactDOM.render(
    <BrowserRouter basename="/gitstats">
        <div>
            <Route exact path="/" component={Search}/>
        </div>
    </BrowserRouter>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
