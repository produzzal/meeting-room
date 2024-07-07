import httpStatus from 'http-status';
import { Room } from '../Room/room.model';
import { User } from '../User/user.model';

import { Slot } from '../Slot/slot.model';
import { Booking } from './booking.model';
import { TBooking } from './booking.interface';
import AppError from '../../errors/AppError';

//create booking
const createBookingIntoDB = async (params: TBooking) => {
  const { date, slots, room, user } = params;
  const roomDetails = await Room.findById(room);
  const userDetails = await User.findById(user);

  if (!roomDetails || !userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const slotDetails = await Slot.find({ _id: { $in: slots }, room, date });

  if (slotDetails.length !== slots.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const totalAmount = roomDetails.pricePerSlot * slots.length;

  for (const slot of slotDetails) {
    if (slot.isBooked) {
      throw new AppError(httpStatus.CONFLICT, `Already booked`);
    }
    slot.isBooked = true;
    await slot.save();
  }

  // Create the booking document
  const newBooking = await Booking.create({
    date,
    slots,
    room,
    user,
    totalAmount,
    isConfirmed: 'unconfirmed',
    isDeleted: false,
  });
  const populatedBooking = await Booking.findById(newBooking._id)
    .populate('slots')
    .populate('room')
    .populate('user');

  return populatedBooking;
};

//get all bookings

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({ isDeleted: false })
    .populate('slots')
    .populate('room')
    .populate('user');
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

//get my bookings

const getMyBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId, isDeleted: false })
    .populate('slots')
    .populate('room');
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

//update booking by admin

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBookingIntoDB = async (id: string, params: any) => {
  const { isConfirmed } = params;
  const booking = await Booking.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isConfirmed },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

// delete booking by admin
const deleteBookingFromDB = async (id: string) => {
  const booking = await Booking.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
