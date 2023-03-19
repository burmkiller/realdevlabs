const express = require('express');
const { check } = require('express-validator');

const reservationController = require('../controllers/reservation-controller');

const router = express.Router();

router.get('/:pid', reservationController.getReservationById);

router.get('/user/:uid', reservationController.getReservationsByUserId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('author')      
      .not()
      .isEmpty(),
    check('date')
      .not()
      .isEmpty()
  ],
  reservationController.createReservation
);

router.patch(
  '/:pid',
  [
    check('date')
      .not()
      .isEmpty()
  ],
  reservationController.updateReservation
);

router.delete('/:pid', reservationController.deleteReservation);

module.exports = router;
