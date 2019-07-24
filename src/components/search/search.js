import React, { Component } from "react";

import UserProfile from "../userProfile/userProfile";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.$searchInput = null;
        this.state = {
            username: ""
        };

    }


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

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this._runSearchHandler.bind(this)}
                        >
                            Search
                        </button>
                </div>

                <div className="block">
                    {this._renderUserProfile()}
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
        if (this.$searchInput) return;

        this.$searchInput = event.target;

    }

    _renderUserProfile() {
        if (!this.state.username) return;

        return <div><UserProfile username = {this.state.username} /></div>;
    }

    _runSearchHandler() {
        if (!this.$searchInput) return;

        const value = this.$searchInput.value;
        this._setUsername(value);
    }
}
