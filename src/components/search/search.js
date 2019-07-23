import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import UserProfile from "../userProfile/userProfile";

export default class Search extends Component {
    state = {
        username: ""
    };


    render() {
        return (
            <div className="container" role="main">
                <div className="form-inline block">
                    <div className="form-group">
                        <input
                            name="search"
                            onChange={this._setSearch.bind(this)}
                            autoComplete="off"
                            placeholder="Search username..."
                            className="form-control"
                        />
                    </div>
                    <Link
                        to={{
                            pathname: `/userProfile/${this.state.username}`,
                            state: {
                                username: this.state.username
                            }
                        }}
                    >
                        <button className="btn btn-primary" type="button">
                            Search
                        </button>
                    </Link>
                </div>

                <div className="block">
                    <Route
                        path="/userProfile/:username"
                        render={props => (
                            <UserProfile {...props} key={this.props.location.key} />
                        )}
                    />
                </div>
            </div>
        );
    }

    _setUsername(value) {
        this.setState({
            username: value
        });
    }

    _setSearch(event) {
        const value = event.target.value;
        this._setUsername(value);
    }
}
