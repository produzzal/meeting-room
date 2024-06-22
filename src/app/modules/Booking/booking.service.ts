import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Room } from '../Room/room.model';
import { User } from '../User/user.model';
import { TBooking } from './booking.interface';
import { Slot } from '../Slot/slot.model';
import { Booking } from './booking.model';

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

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
