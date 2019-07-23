import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import Services from "../../lib/services";
import Repos from "./repos/repos";
import StatsUser from "./stats/statsUser";
import Issues from "./issues/issues";
import UserInfo from "./userInfo/userInfo";
import Utils from "../../lib/utils";

const url = "https://api.github.com";

export default class UserProfile extends Component {
    _tabs = ["stats", "repos", "issues"];
    state = {
        username: "",
        userInfo: null,
        repos: null,
        error: false
    };

    render() {
        if (this.state.error) {
            return Utils.userNotFoundDiv();
        }
        if (this.state.username && this.state.userInfo) {
            return <div>{this._renderUserProfile()}</div>;
        }
        return <div> {Utils.loadingDiv()}</div>;
    }

    componentDidMount() {
        const { username } = this.props.match.params;

        this._setUsername(username);
        this._setUserInfo(null);
        this._requestUser(username);
    }

    _renderUserProfile() {
        return (
            <div id="coder" className="card">
                {this._renderUserInfo()}

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link
                            to={{ pathname: `/userProfile/${this.state.username}` }}
                            className="nav-link"
                            id={this._tabs[0]}
                        >
                            Statistics
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={{ pathname: `/userProfile/${this.state.username}/repos` }}
                            className="nav-link"
                            id={this._tabs[1]}
                        >
                            Repositories
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={{ pathname: `/userProfile/${this.state.username}/issues` }}
                            className="nav-link"
                            id={this._tabs[2]}
                        >
                            Issues
                        </Link>
                    </li>
                </ul>

                {this._renderRepos()}

                {this._renderStats()}

                {this._renderIssues()}
            </div>
        );
    }

    _renderUserInfo() {
        if (this.state.userInfo && this.state.username) {
            return <UserInfo info={this.state.userInfo} />;
        }
    }

    _renderStats() {
        if (
            (this.state.userInfo || this.state.repos) &&
                this._getActiveTab() === this._tabs[0]
        ) {
            return (
                <div>
                    <StatsUser data={this.state.userInfo} />
                </div>
            );
        }
    }

    _renderRepos() {
        if (this.state.repos && this._getActiveTab() === this._tabs[1]) {
            console.log("repos tab is active");
            return (
                <div>
                    <Route
                        path="/userProfile/:username/repos"
                        render={() => <Repos repos={this.state.repos} />}
                    />
                </div>
            );
        }
    }

    _renderIssues() {
        if (this.state.repos && this._getActiveTab() === this._tabs[2]) {
            return (
                <div>
                    <Route
                        path="/userProfile/:username/issues"
                        render={() => <Issues repos={this.state.repos} />}
                    />
                </div>
            );
        }
    }

    _requestUser(username) {
        const requestUrl = url + "/users/" + username;
        this._fetchUser(requestUrl);
    }

    _fetchUser(url) {
        Services.fetch(url).then(data => {
            if (data.id) {
                this._setError(false);
                this._setUserInfo(data);
                this._fetchRepos(data.repos_url);
            } else {
                this._setError(true);
            }
        });
    }

    _fetchRepos(url) {
        Services.fetch(url).then(data => {
            if (data.length) {
                this._setRepos(data);
            }
        });
    }

    _setRepos(obj) {
        this.setState({ repos: { ...obj } });
    }

    _setUsername(value) {
        this.setState({ username: value });
    }

    _setUserInfo(obj) {
        this.setState({ userInfo: { ...obj } });
    }

    _setError(value) {
        this.setState({ error: value });
    }

    _getActiveTab() {
        const path = this.props.location.pathname;

        if (path.includes("/repos")) return this._tabs[1];
        if (path.includes("/issues")) return this._tabs[2];
        return this._tabs[0];
    }
}
