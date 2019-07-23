import React, { Component } from "react";

export default class Repos extends Component {
    state = {
        repos: null
    };

    componentDidMount() {
        let repos = this.props.repos || this.state.repos;
        this._setRepos(repos);
    }

    _setRepos(obj) {
        this.setState({ repos: obj });
    }

    render() {
        const repos = this.props.repos || this.state.repos;

        if (!repos) return <div>Repositories not found</div>;

        const reposArr = Object.values(repos);
        const listRepos = reposArr.map((repo, i) => (
            <li className="list-group-item" key={i}>
                {repo.name}
            </li>
        ));

        return (
            <div>
                <ul className="list-group list-group-flush">{listRepos}</ul>
            </div>
        );
    }
}
