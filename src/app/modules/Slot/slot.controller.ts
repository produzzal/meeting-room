import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { SlotsServices } from './slot.service';

//create slot
const createSlots = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await SlotsServices.createSlotsIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slots created successfully',
      data: result,
    });
  },
);

//get available slots
const getAvailableSlots = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await SlotsServices.getAvailableSlotsFromDB(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  },
);

export const SlotsControllers = {
  createSlots,
  getAvailableSlots,
};
