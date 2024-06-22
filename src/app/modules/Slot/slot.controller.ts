import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { SlotsServices } from './slot.service';

const createSlotsController = catchAsync(
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

export const SlotsControllers = {
  createSlotsController,
};
