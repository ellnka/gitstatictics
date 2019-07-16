'use strict';

import React, {Component} from 'react';

export default class Repos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: props.repos
        };

        this._repos = props.repos;

        this.render();

    }

    _setRepos(obj) {
        this.setState({repos: obj});
    }


    render() {
        console.log(this._repos);
        const listRepos = this._repos.map((repo) =>
            <li className="list-group-item">{repo.name}</li>
        );
        return (
            <div>
                <ul className="list-group list-group-flush">{listRepos}</ul>
            </div>
        );
    }
}
