import React, {Component} from 'react';

export default class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statsInfo: [],
            statsRepos: []
        };
    }

    componentWillReceiveProps(props) {
        this._resetStates(props);
    }

    componentDidMount() {
        this._resetStates(this.props);
    }

    render() {
        return <div>
            {this._renderStats(this.state.statsInfo)}
            {this._renderStats(this.state.statsRepos)}
        </div>;
    }

    _resetStates(props) {
        if (props.info) {
            let statsInfo = this._generateStatsInfo(props.info);
            this._setStatsInfo(statsInfo);
        }
        if (props.repos) {
            let reposInfo = this._generateStatsRepos(props.repos);
            this._setStatsRepos(reposInfo);
        }
    }

    _setStatsInfo(arr) {
        this.setState({statsInfo: arr});
    }

    _setStatsRepos(arr) {
        this.setState({statsRepos: arr});
    }

    _generateStatsInfo(info) {
        return [
            {name: "Public Repos", value: info.public_repos},
            {name: "Public Gists", value: info.public_gists},
            {name: "Followers", value: info.followers},
            {name: "Following", value: info.following}
        ];
    }

    _generateStatsRepos(repos) {
        let reposArr = Object.values(repos);
        let arr = [];
        arr.push({name: "Languages", value: this._getLanguages(reposArr).join(", ")});
        return arr;
    }

    _renderStats(statsObj) {
        if (!statsObj) return;

        const statsArr = Object.values(statsObj);
        const listStats = statsArr.map((stat, i) => {
                return <li className="list-group-item" key={i}>{stat.name}: {stat.value}</li>;
            }
        );
        return <ul className="list-group list-group-flush">{listStats}</ul>;
    }


    _getLanguages(repos) {
        let languages = [];
        if (repos && repos.length > 0) {
            languages = repos.map(item => item.language).filter((item, pos, array) => array.indexOf(item) === pos && item);
        }
        return languages;
    }
}