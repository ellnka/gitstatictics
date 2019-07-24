import React, {Component} from "react";

import Services from "../../lib/services";
import Repos from "./repos/repos";
import StatsUser from "./stats/statsUser";
import Issues from "./issues/issues";
import UserInfo from "./userInfo/userInfo";
import Utils from "../../lib/utils";

const url = "https://api.github.com";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this._tabs = ["stats", "repos", "issues"];
        this.state = {
            activeTab: this._tabs[0],
            userInfo: null,
            repos: null,
            error: false
        };
        this.username = props.username;
    }

    componentDidMount() {
        if (!this.username) return;
        this._requestUser(this.username);
    }

    render() {
        if (this.state.error) {
            return Utils.userNotFoundDiv();
        }
        if (this.username && this.state.userInfo) {
            return <div>{this._renderUserProfile()}</div>;
        }
        return <div> {Utils.loadingDiv()}</div>;
    }

    _renderUserProfile() {
        return (
            <div id="coder" className="card">
                {this._renderUserInfo()}

                <ul className="nav nav-tabs" onClick={this._tabClickHandler.bind(this)}>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link"
                            id={this._tabs[0]}
                        >
                            Statistics
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link"
                            id={this._tabs[1]}
                        >
                            Repositories
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#"
                            className="nav-link"
                            id={this._tabs[2]}
                        >
                            Issues
                        </a>
                    </li>
                </ul>

                {this._renderStats()}

                {this._renderRepos()}

                {this._renderIssues()}
            </div>
        );
    }

    _renderUserInfo() {
        if (this.state.userInfo) {
            return <div><UserInfo info={this.state.userInfo}/></div>;
        }
    }

    _renderStats() {
        if (this.state.userInfo && this.state.activeTab === this._tabs[0]) {
            return <div><StatsUser data={this.state.userInfo}/></div>;
        }
    }

    _renderRepos() {
        if (this.state.repos && this.state.activeTab === this._tabs[1]) {
            return <div><Repos repos={this.state.repos}/></div>;
        }
    }

    _renderIssues() {
        if (this.state.repos && this.state.activeTab === this._tabs[2]) {
            return <div><Issues repos={this.state.repos}/></div>;
        }
    }

    _requestUser(username) {
        const requestUrl = url + "/users/" + username;
        this._fetchUser(requestUrl);
    }

    _fetchUser(url) {
        Services.fetch(url).then(data => {
            console.log(data);
            if (data.id) {
                this._setError(false);
                this._setUserInfo(data);
                this._setActiveTab(this._tabs[0]);
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

    _setActiveTab(value) {
        this.setState({activeTab: value});
    }


    _tabClickHandler(event) {
        const $el = event.target;
        console.log($el);
        if ($el.tagName !== "A") return;
        console.log($el.id);
        this._setActiveTab($el.id);
    }
}
