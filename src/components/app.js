import React, { Component } from "react";
import { Route } from "react-router-dom";

import Search from "./search/search";

export default class App extends Component {
    render() {
        return (
            <div className="app-routes">
                <Route path="/" component={Search} />
            </div>
        );
    }
}
