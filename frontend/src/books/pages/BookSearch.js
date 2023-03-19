import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './BookForm.css';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import BookList from '../components/BookList';

const BookSearch = () => {
  const [loadedBooks, setLoadedBooks] = useState('');
  const [formState, inputHandler] = useForm(
    {
      search: {
        value: '',
        isValid: false
      },
    },
    false
  );

  const searchSubmitHandler = async event => {
    event.preventDefault();
    const encodedSearch = encodeURI(formState.inputs.search.value);
    const response = await fetch(`https://gutendex.com/books?search=${encodedSearch}`)
    const responseData = await response.json();
    console.log(responseData); // send this to the backend!
    setLoadedBooks(responseData.results);
  };

  return (
    <form className="book-form" onSubmit={searchSubmitHandler}>
      <Input
        id="search"
        element="input"
        type="text"
        label="Title or Author"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Search
      </Button>

      <BookList items={loadedBooks} />;
    </form>
  );
};

export default BookSearch;
