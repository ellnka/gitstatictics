import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';


import App from './components/app';

const root = document.getElementById('root');

const renderApp = () => {
    ReactDOM.render(
            <App />
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