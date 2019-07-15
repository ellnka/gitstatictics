'use strict';

import React, {Component} from 'react';
import autoBind from 'react-autobind';
import Services from './../lib/services';

const url = "https://api.github.com/search/users";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: props.userInfo,
            repos: null,
            languages: []
        };
        
        this.userCreatedDate = new Date(Date.parse(this.state.userInfo.created_at));
        this.render();
        this._fetchRepos(this.state.userInfo.repos_url);


    }


    render() {
        return (
            <div id="coder">
                <div className="row">
                    <div className="col-12 col-2-xl col-3-l col-4-m meta">
                        <div className="padh">
                            <header><h3>{this.state.userInfo.login}</h3></header>
                            <img src={this.state.userInfo.avatar_url} alt={this.state.userInfo.login} className="img-fluid"/>
                            <p>Joined GitHub {this.userCreatedDate.toLocaleDateString()}</p>
                            <a href="https://github.com/{this.state.userInfo.login}" className="block">
                                <i aria-hidden="true" className="fa fa-github"></i>
                                {this.state.userInfo.username}
                            </a>
                        </div>
                        <ul>
                            <li><p>Pushed to repos: {this.state.userInfo.public_repos} </p></li>
                            <li><p>Main languages: {this.state.languages.join(", ")} </p></li>
                            <li><p>Followers:{this.state.userInfo.followers} </p></li>
                            <li><p>Following: {this.state.userInfo.following}</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    _setRepos(obj) {
        this.setState({repos: obj});
    }

    _setLang(arr) {
        this.setState({languages: arr});
    }

    _fetchRepos(url) {
        Services.fetch(url)
            .then(data => {
                console.log(data);
                console.log(data.length);
                if (data.length) {
                    this._setRepos(data);
                    this._getLanguages();
                }
            });
    }

    _getLanguages() {
        if (this.state.repos && this.state.repos.length > 0) {
            let languages = this.state.repos.map( item => item.language).filter( (item, pos, array) =>  array.indexOf(item) === pos && item);
            this._setLang(languages);
        }
    }


}


