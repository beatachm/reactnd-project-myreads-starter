import React from 'react';
import BookTile from './BookTile';

export default (props) => 
    <ol className="books-grid">
        {props.books.map(book => 
            <li key={book.title}>
                <BookTile book={book} onUpdate={props.onUpdate}></BookTile>
            </li>)}
    </ol>;