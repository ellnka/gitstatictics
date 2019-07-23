import React, { Component } from "react";

export default class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: []
        };
    }

    render() {
        return <div>{this._renderStats(this.state.stats)}</div>;
    }

    componentWillReceiveProps() {
        this._resetStates(this.props);
    }

    _setStats(arr) {
        this.setState({ stats: arr });
    }

    _resetStates(props) {
        let stats = this._generateStats(props.data);
        this._setStats(stats);
    }

    _generateStats() {}

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
