import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Room } from '../Room/room.model';
import { User } from '../User/user.model';

import { Slot } from '../Slot/slot.model';
import { Booking } from './booking.model';
import { TBooking } from './booking.interface';

//create booking
const createBookingIntoDB = async (params: TBooking) => {
  const { date, slots, room, user } = params;
  const roomDetails = await Room.findById(room);
  const userDetails = await User.findById(user);

  if (!roomDetails || !userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Room or User');
  }
  const slotDetails = await Slot.find({ _id: { $in: slots } });

  if (slotDetails.length !== slots.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Slots');
  }
  for (const slot of slotDetails) {
    if (slot.isBooked) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Slot ${slot._id} already booked`,
      );
    }
    slot.isBooked = true;
    await slot.save();
  }

  const totalAmount = roomDetails.pricePerSlot * slots.length;

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
  const result = await Booking.find()
    .populate('slots')
    .populate('room')
    .populate('user');
  return result;
};

//get my bookings

const getMyBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId })
    .populate('slots')
    .populate('room');
  return result;
};

//update booking by admin

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBookingIntoDB = async (id: string, params: any) => {
  const { isConfirmed } = params;

  const result = await Booking.findByIdAndUpdate(
    id,
    { isConfirmed },
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
};
