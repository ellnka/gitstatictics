import React, {Component} from 'react';
import Services from './../lib/services';
import Repos from "./repos"
import Stats from "./stats"

const url = "https://api.github.com";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this._statsData = [];
        this._tabs = ["stats", "repos", "issues"];
        this._username = props.username || props.params.username;

        this.state = {
            active_tab: this._tabs[0],
            username: this._username,
            userInfo: null,
            stats: [],
            repos: null,
            error: false
        };

        const requestUrl = url + "/users/" + this._username;
        this.render();

        this._fetchUser(requestUrl);


    }

    _setStats(array) {
        this.setState({stats: array});
    }

    _setActiveTab(tab) {
        this.setState({active_tab: tab});
    }

    _setRepos(obj) {
        this.setState({repos: obj});
    }

    _setUsername(value) {
        this.setState({username: value});
    }

    _setUserInfo(obj) {
        this.setState({userInfo: obj});
    }

    _setError(value) {
        this.setState({error: value});
    }


    render() {
        console.log(this.state);
        if (this.state.error) {
            console.log("render error");
            return this._error();
        }
        if (this.state.username && this.state.userInfo) {
            console.log("render user profile");
            return this._userProfile();
        }
        console.log("render loading");
        return (<div> {this._loading()}</div>);
    }


    _error() {
        return (<div className="alert alert-danger" role="alert">
            User not found!
        </div>);
    }

    _loading() {
        return (
            <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        );
    }

    _userProfile() {
        return (
            <div id="coder" className="card">
                <div className="card-body">

                    <div className="">
                        <img src={this.state.userInfo.avatar_url} alt={this.state.userInfo.login} className="rounded float-left"/>
                    </div>

                    <div className="">
                        <h3>{this.state.userInfo.login}</h3>
                        <span className="badge badge-pill badge-light">Joined GitHub {this._formatDate(this.state.userInfo.created_at)}</span>
                        <a href={this.state.userInfo.url} > {this.state.userInfo.username}</a>
                    </div>

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

                    {this._repos()}

                    {this._stats()}

                </div>
            </div>
        );
    }

    _fetchUser(url) {
        Services.fetch(url)
            .then(data => {
                console.log(data);
                if (data.id) {
                    this._setError(false);
                    this._setUserInfo(data);
                    this._setStats(this._initStats(data));
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
                    this._statsData.push({name: "Languages", value: this._getLanguages().join(", ")});
                    this._setStats(this._statsData);
                }
            });
    }

    _initStats(data) {
        this._setStats(null);
        return [
            {name: "Public Repos", value: data.public_repos},
            {name: "Public Gists", value: data.public_gists},
            {name: "Followers", value: data.followers},
            {name: "Following", value: data.following}
        ];
    }

    _getLanguages() {
        let languages = [];
        if (this.state.repos && this.state.repos.length > 0) {
            languages = this.state.repos.map(item => item.language).filter((item, pos, array) => array.indexOf(item) === pos && item);
        }
        return languages;
    }

    _stats() {
        if (this.state.stats && this.state.active_tab === this._tabs[0]) {
            return (
                <Stats stats={this.state.stats}/>
            )
        }
    }

    _repos() {
        if (this.state.repos && this.state.active_tab === this._tabs[1]) {
            return (
                <Repos repos={this.state.repos}/>
            );
        }
    }

    _tabClickHandler(event) {
        if (event.target.tagName !== "A") {
            return;
        }

        const $oldActiveTab = event.target.closest("UL").querySelector("#" + this.state.active_tab);
        const $newActiveTab = event.target;

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