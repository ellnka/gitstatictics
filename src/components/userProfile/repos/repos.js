import React, { Component } from "react";

export default class Repos extends Component {

    constructor(props) {
        super(props);

        this.repos = props.repos;
    }

    render() {
        const reposArr = Object.values(this.repos);
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
