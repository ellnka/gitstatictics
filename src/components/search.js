'use strict';

import React, {Component} from 'react';
import UserProfile from "./userProfile";


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            username: null
        };


        this._setSearch = this._setSearch.bind(this);

        this.render();
    }

    _setSearch(event) {
        this.setState({search: event.target.value});
    }

    _setUsername(obj) {
        this.setState({username: obj});
    }


    _searchInput() {
        return (
            <div>
                <form onSubmit={this._submitHandler.bind(this)}>
                    <div className='form-group'>
                        <input name='search' onChange={this._setSearch} autoComplete='off'
                               placeholder='Search username...'
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

    _submitHandler(event) {
        event.preventDefault();
        this._setUsername("");
        const value = this.state.search;
        const searchTerm = value.toLowerCase().trim();

        this._setUsername(searchTerm);
    }


    _userProfile() {
        if (this.state.username) {
            return <UserProfile username={this.state.username}/>;
        }
    }
}
