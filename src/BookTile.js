import React from 'react';
import * as BooksAPI from './BooksAPI';

export default (props) => {
    const update = (book, shelf) => BooksAPI.update(book,shelf)
        .then(() => (props.onUpdate || (()=>{}))());
    return <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={e => update(props.book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{(props.book.authors || []).join(', ')}</div>
    </div>
}