import React, {Component} from 'react';
import {Route} from 'react-router';

import UserProfile from "./userProfile";


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };
        this.$search = null;

        this.render();
    }

    render() {
        return (
            <div className='container' role='main'>

                {this._searchInput()}

                <Route path='/userProfile/:username' component={UserProfile} />

            </div>
        );
    }

    _setUsername(value) {
        this.setState({username: value});
    }

    _setSearch(event) {
        this.$search = event.target;
    }

    _searchInput() {
        return (
            <div>
                <form onSubmit={this._submitHandler.bind(this)}>
                    <div className='form-group'>
                        <input name='search' onChange={this._setSearch.bind(this)} autoComplete='off' placeholder='Search username...' className='form-control' />
                    </div>
                </form>
                {this._userProfile()}
            </div>
        );
    }



    _submitHandler(event) {
        event.preventDefault();

        if (!this.$search) return;

        this.props.history.push("/");
        this._setUsername("");

        const value = this.$search.value;
        const searchTerm = value.toLowerCase().trim();

        this._setUsername(searchTerm);
        this.props.history.push("/userProfile/" + searchTerm);
    }


    _userProfile() {
        if (!this.state.username) return;

        return <UserProfile username={this.state.username} history={this.props.history} />;
    }

}