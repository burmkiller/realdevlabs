import React, {useEffect, useState} from 'react';

import BookList from '../components/BookList';

const UserReservations = () => {
  const [loadedReservations, setLoadedReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      // Replace this with the reservations API endpoint
      const response = await fetch(`https://gutendex.com/books`)
      const responseData = await response.json();
      setLoadedReservations(responseData.results);
    };
    fetchReservations();
  }, []);
  return <BookList items={loadedReservations} isReservation="true" />;
};

export default UserReservations;
