const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Reservation = require('../models/reservation');
const User = require('../models/user');

const getReservationById = async (req, res, next) => {
  const reservationId = req.params.pid;

  let reservation;
  try {
    reservation = await Reservation.findById(reservationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a reservation.',
      500
    );
    return next(error);
  }

  if (!reservation) {
    const error = new HttpError(
      'Could not find a reservation for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ reservation: reservation.toObject({ getters: true }) });
};

const getReservationsByUserId = async (req, res, next) => {
  const user = req.params.uid;

  // let reservations;
  let userWithReservations;
  try {
    userWithReservations = await User.findById(user).populate('reservations');
  } catch (err) {
    const error = new HttpError(
      'Fetching reservations failed, please try again later',
      500
    );
    return next(error);
  }

  // if (!reservations || reservations.length === 0) {
  if (!userWithReservations || userWithReservations.reservations.length === 0) {
    return next(
      new HttpError('Could not find reservations for the provided user id.', 404)
    );
  }

  res.json({
    reservations: userWithReservations.reservations.map(reservation =>
      reservation.toObject({ getters: true })
    )
  });
};

const createReservation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, author, date, user } = req.body;
  const existingReservation = await Reservation.findOne({ title, author });

  if(existingReservation) {
    const error = new HttpError('Book already reserved', 202);
    return next(error);
  }
  const createdReservation = new Reservation({
    title,
    author,
    date,
    user
  });

  let reservedUser;
  try {
    reservedUser = await User.findById(mongoose.Types.ObjectId(user));
  } catch (err) {
    const error = new HttpError('Creating reservation failed, please try again', 500);
    return next(error);
  }

  if (!reservedUser) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdReservation.save({ session: sess });
    reservedUser.reservations.push(createdReservation);
    await reservedUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Creating reservation failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ reservation: createdReservation });
};

const updateReservation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { date } = req.body;
  const reservationId = req.params.pid;

  let reservation;
  try {
    reservation = await Reservation.findById(reservationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update reservation.',
      500
    );
    return next(error);
  }

  reservation.title = title;
  reservation.description = description;

  try {
    await reservation.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update reservation.',
      500
    );
    return next(error);
  }

  res.status(200).json({ reservation: reservation.toObject({ getters: true }) });
};

const deleteReservation = async (req, res, next) => {
  const reservationId = req.params.pid;

  let reservation;
  try {
    reservation = await Reservation.findById(reservationId).populate('user');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete reservation.',
      500
    );
    return next(error);
  }

  if (!reservation) {
    const error = new HttpError('Could not find reservation for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await reservation.remove({ session: sess });
    reservation.user.reservations.pull(reservation);
    await reservation.user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete reservation.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted reservation.' });
};

exports.getReservationById = getReservationById;
exports.getReservationsByUserId = getReservationsByUserId;
exports.createReservation = createReservation;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;
