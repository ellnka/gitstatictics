'use strict';

import React, {Component} from 'react';
import Services from './../lib/services';
import UserProfile from "./userProfile";

const url = "https://api.github.com/search/users";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            user: null
        };


        this._setSearch = this._setSearch.bind(this);

        this.render();


    }

    _setSearch(event) {
        this.setState({search: event.target.value});
    }

    _setUser(obj) {
        this.setState({user: obj});
    }


    _searchInput() {
        return (
            <div>
                <form onSubmit={this._submitHandler.bind(this)}>
                    <div className='form-group'>
                        <input name='search' onChange={this._setSearch} autoComplete='off' placeholder='Search...'
                               className='form-control'/>
                    </div>
                </form>
                {this._userProfile()}
            </div>
        );
    }

    render() {
        return (
            <div className='container' role='main'>
                {this._searchInput()}
            </div>
        );
    }

    _search() {
    }

    _pressKeyHandler() {
    }


    _submitHandler(event) {
        event.preventDefault();
        this._setUser(null);

        const value = this.state.search;
        const searchTerm = value.toLowerCase().trim();

        const requestUrl = url + "?q=" + searchTerm;
        this._fetchUser(requestUrl);
    }

    _fetchUser(url) {
        Services.fetch(url)
            .then(data => {
                if (data.total_count) {
                    let user_url = data.items[0].url;
                    Services.fetch(user_url)
                        .then(data => {
                            this._setUser(data);
                        });
                }
            });
    }

    _userProfile() {
        if (this.state.user) {
            return <UserProfile userInfo={this.state.user}/>;
        }
    }
}
