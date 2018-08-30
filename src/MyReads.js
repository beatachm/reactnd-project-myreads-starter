import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';

export default class MyReads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };

        this.loadData();    
    }

    loadData = () => BooksAPI.getAll()
        .then(books => books.reduce((a, c) => ({ ...a, [c.shelf]: (a[c.shelf] || []).concat(c) }), {}))
        .then(grouped => this.setState({data: grouped}));

    render() {
        return <div className="list-books">
            <div className="list-books-title">
            <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                { this.state.data ? <div>
                <Bookshelf shelf="Currently Reading" books={this.state.data["currentlyReading"]} 
                    onUpdate={this.loadData}></Bookshelf>
                <Bookshelf shelf="Want To Read" books={this.state.data["wantToRead"]} 
                    onUpdate={this.loadData}></Bookshelf>
                <Bookshelf shelf="Read" books={this.state.data["read"]} 
                    onUpdate={this.loadData}></Bookshelf>
                </div> : null }
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    }
}
    