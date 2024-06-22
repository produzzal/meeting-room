import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BookingServices } from './booking.service';

//create bookings
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

// get all bookings

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
