import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';



const root = document.getElementById('root');

const renderApp = () => {
    ReactDOM.render(
        <Router basename = "/gitstats">
            <App />
        </Router>
        , root,
    );
};

renderApp();

// Hot module reloading
/*
if (module.hot) {
    module.hot.accept('./components/App', renderApp);
}
*/