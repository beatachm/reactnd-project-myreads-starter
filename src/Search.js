import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            searchText: '',
            books: []
        };
        this.timer = null;
        this.getMyBooks();
    }

    getMyBooks = () => {
        this.myBooks = BooksAPI.getAll()
            .then(myBooks => myBooks.reduce((a, c) => ({...a, [c.id]:c.shelf}), {}));
    }

    handleChange = (e) => {
        clearTimeout(this.timer);
        this.setState({searchText: e.target.value});
        this.timer = setTimeout(this.search, 500);
    }

    search = () => {
        this.myBooks.then(myBooks => 
            BooksAPI.search(this.state.searchText)
                .then(results=> {console.log(results); return results;})
                .then(results => Array.isArray(results) ? results.map(r => ({...r, shelf: myBooks[r.id] || 'none'})) : [])
                .then(results => this.setState({results}))
        );
    }

    render(){
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                        value={ this.state.searchText }
                        onChange={ this.handleChange } />
                </div>
            </div>
            { this.state.results ? 
            <div className="search-books-results">
                <BooksGrid books={this.state.results} onUpdate={() => {this.getMyBooks(); this.search();}} />
            </div>
            : null }
        </div>;
    }
}
    