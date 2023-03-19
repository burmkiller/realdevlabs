import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import BookItem from './BookItem';
import './css/BooksList.css';

const BookList = props => {
  if (props.items.length === 0) {
    return (
      <div className="book-list center">
        <Card>
          <h2>No books found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="book-list">
      {props.items.map(book => (
        <BookItem
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.authors.length === 0 ? 'Unknown' : book.authors[0].name} // we should have a function that maps the names
        />
      ))}
    </ul>
  );
};

export default BookList;
