import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import moment from "moment";
import './css/BookItem.css';

const BookItem = props => {
  const DEFAULT_RESERVED_DAYS = 15; // we can change that later on
  const auth = useContext(AuthContext);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const { sendRequest } = useHttpClient();

  // RESERVATION (for this modal, better to create a separate component for it)
  const showReserveHandler = () => {
    setShowReserveModal(true);
  };

  const cancelReserveHandler = () => {
    setShowReserveModal(false);
  };

  const confirmReserveHandler = async (reservedDays = DEFAULT_RESERVED_DAYS) => {
    setShowReserveModal(false);
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/reservations',
        'POST',
        JSON.stringify({
          title: props.title,
          author: props.author,
          user: auth.userId,
          date: moment().add(reservedDays, 'days'),
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      // On success here you can show a modal
      console.log(responseData);
    } catch (err) {
      console.log(err);
    } // on failure you can show another modal, for now I console logged it
  };
  

  return (
    <React.Fragment>
      <Modal
        show={showReserveModal}
        onCancel={cancelReserveHandler}
        header="Are you sure?"
        footerClass="book-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelReserveHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmReserveHandler}>
              ADD
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to reserve this book for 15 days?
        </p>
      </Modal>

      <li className="book-item">
        <Card className="book-item__content">
          <div className="book-item__info">
            <h2>{props.title}</h2>
            <h3>By {props.author}</h3>
          </div>
          <div className="book-item__actions">
            <Button danger onClick={showReserveHandler}>
              Reserve
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default BookItem;
