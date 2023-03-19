import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import './css/BookItem.css';

const BookItem = props => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showAddToShortlistHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelAddHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmAddHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelAddHandler}
        header="Are you sure?"
        footerClass="book-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelAddHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmAddHandler}>
              ADD
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and add this book to your shortlist?
        </p>
      </Modal>
      <li className="book-item">
        <Card className="book-item__content">
          <div className="book-item__info">
            <h2>{props.title}</h2>
            <h3>By {props.author}</h3>
          </div>
          <div className="book-item__actions">
            <Button danger onClick={showAddToShortlistHandler}>
              Add
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default BookItem;
