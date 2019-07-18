import React, {Component} from 'react';
import {Route} from 'react-router';
import Services from './../lib/services';
import Repos from "./repos";
import Stats from "./stats";
import Issues from "./issues"
import UserInfo from "./userInfo";

const url = "https://api.github.com";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this._tabs = ["stats", "repos", "issues"];
        const username = props.username || props.match.params.username;

        this.state = {
            active_tab: this._tabs[0],
            username: username,
            userInfo: null,
            repos: null,
            error: false
        };

        this._requestUser(username);

    }

    render() {
        if (this.state.error) {
            return this._renderError();
        }
        if (this.state.username && this.state.userInfo) {
            return <div>
                {this._renderUserProfile()}
                <Route path='/userProfile/:username/stats' component={Stats} />
                <Route path='/userProfile/:username/repos' component={Repos} />
                <Route path='/userProfile/:username/issues' component={Issues} />
            </div>
        }
        return (<div> {this._renderLoading()}</div>);
    };

    componentWillReceiveProps(props) {
        this._setUsername(props.username);
        this._setUserInfo(null);
        this._requestUser(props.username);
    }

    _setActiveTab(tab) {
        this.setState({active_tab: tab});
    }

    _setRepos(obj) {
        this.setState({repos: {...obj}});
    }

    _setUsername(value) {
        this.setState({username: value});
    }

    _setUserInfo(obj) {
        this.setState({userInfo: {...obj}});
    }

    _setError(value) {
        this.setState({error: value});
    }


    _renderError() {
        return (<div className="alert alert-danger" role="alert">
            User not found!
        </div>);
    }

    _renderLoading() {
        return (
            <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        );
    }

    _renderUserProfile() {
        return (
            <div id="coder" className="card">

                {this._renderUserInfo()}

                <ul className="nav nav-tabs" onClick={this._tabClickHandler.bind(this)}>
                    <li className="nav-item">
                        <a className="nav-link active" href="#" id={this._tabs[0]}>Statistics</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" id={this._tabs[1]}>Repositories</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" id={this._tabs[2]}>Issues</a>
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
    };

    _renderStats() {
        if ((this.state.userInfo || this.state.repos) && this.state.active_tab === this._tabs[0]) {
            return <Stats info={this.state.userInfo} repos={this.state.repos} />;
        }
    };

    _renderRepos() {
        if (this.state.repos && this.state.active_tab === this._tabs[1]) {
            return <Repos repos={this.state.repos} />;
        }
    }

    _renderIssues() {
        if (this.state.repos && this.state.active_tab === this._tabs[2]) {
            return <Issues repos={this.state.repos} />;
        }
    }

    _requestUser(username) {
        const requestUrl = url + "/users/" + username;
        this._fetchUser(requestUrl);
    }

    _fetchUser(url) {
        Services.fetch(url)
            .then(data => {
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
        Services.fetch(url)
            .then(data => {
                if (data.length) {
                    this._setRepos(data);
                }
            });
    }


    _tabClickHandler(event) {
        if (event.target.tagName !== "A") {
            return;
        }

        const $oldActiveTab = event.target.closest("UL").querySelector(`#${this.state.active_tab}`);
        const $newActiveTab = event.target;

        if($newActiveTab.id === this._tabs[0]) {
            this.props.history.push("/userProfile/" + this.state.username );
        }
        if($newActiveTab.id === this._tabs[1]) {
            this.props.history.push("/userProfile/" + this.state.username + "/repos");
        }
        if($newActiveTab.id === this._tabs[2]) {
            this.props.history.push("/userProfile/" + this.state.username + "/issues");
        }

        if ($oldActiveTab && $oldActiveTab.classList.contains("active")) {
            $oldActiveTab.classList.remove("active");
        }
        $newActiveTab.classList.add("active");

        this._setActiveTab($newActiveTab.id);
    }

    _formatDate(strDate) {
        let date = new Date(strDate);
        return date.toLocaleDateString();
    }


}