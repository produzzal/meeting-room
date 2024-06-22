import { z } from 'zod';

const slotValidationSchema = z.object({
  body: z.object({
    room: z.string().min(1, 'ID is required'),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    isBooked: z.boolean().optional(),
  }),
});

export const SlotValidations = {
  slotValidationSchema,
};
