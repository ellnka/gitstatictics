'use strict';

import React, {Component} from 'react';

export default class Stats extends Component {
    constructor(props) {
        super(props);

        this._stats = props.stats;
        console.log(this._stats);
        this.render();
    }



    render() {
        const listStats = this._stats.map((stat) =>
            <li className="list-group-item">{stat.name}: {stat.value}</li>
        );
        return (
            <div>
                <ul className="list-group list-group-flush">{listStats}</ul>
            </div>
        );
    }
}
