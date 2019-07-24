import React, { Component } from "react";

export default class StatsUser extends Component {

    constructor(props) {
        super(props);

        this.data = props.data;
        this.state = {
            stats: []
        };
    }


    componentDidMount() {

        if (!this.data) return;
        const stats = this._generateStats(this.data);
        this._setStats(stats);
    }

    render() {
        return <div>{this._renderStats(this.state.stats)}</div>;
    }

    _setStats(arr) {
        this.setState({ stats: arr });
    }

    _generateStats(data) {
        if (!data) return;

        return [
            { name: "Public Repos", value: data.public_repos },
            { name: "Public Gists", value: data.public_gists },
            { name: "Followers", value: data.followers },
            { name: "Following", value: data.following }
        ];
    }

    _renderStats(statsObj) {
        if (!statsObj) return;

        const statsArr = Object.values(statsObj);
        const listStats = statsArr.map((stat, i) => {
            return (
                <li className="list-group-item" key={i}>
                    {stat.name}: {stat.value}
                </li>
            );
        });
        return <ul className="list-group list-group-flush">{listStats}</ul>;
    }
}
