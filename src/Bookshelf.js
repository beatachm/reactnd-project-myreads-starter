import React from 'react';
import BooksGrid from './BooksGrid';

export default (props) =>
    <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelf}</h2>
    <div className="bookshelf-books">
       <BooksGrid books={props.books} onUpdate={props.onUpdate}></BooksGrid>
    </div>
    </div>