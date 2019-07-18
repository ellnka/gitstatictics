import React, {Component} from 'react';

export default class Repos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: props.repos
        };


        this.render();

    }

    render() {
        if(!this.state.repos) return;

        const repos = Object.values(this.state.repos);
        const listRepos = repos.map((repo, i) =>
            <li className="list-group-item" key={i}>{repo.name}</li>
        );
        return (
            <div>
                <ul className="list-group list-group-flush">{listRepos}</ul>
            </div>
        );
    }
}
