import React, {Component} from 'react';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: props.info
        };

    }

    componentWillReceiveProps(props) {
        this._setInfo(props.info);
    };

    render() {
        return (
            <div>
                <div className="">
                    <img src={this.state.info.avatar_url} alt={this.state.info.login} className="rounded float-left" />
                </div>

                <div className="">
                    <h3>{this.state.info.login}</h3>
                    <span className="badge badge-pill badge-light">Joined GitHub {this._formatDate(this.state.info.created_at)}</span>
                    <a href={this.state.info.url}> {this.state.info.username}</a>
                </div>
            </div>
        );
    }

    _setInfo(obj) {
        this.setState({info: {...obj}});
    }

    _formatDate(strDate) {
        let date = new Date(strDate);
        return date.toLocaleDateString();
    }


}