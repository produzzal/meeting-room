import { z } from 'zod';

const BookingsValidationSchema = z.object(
  {
    body: z.object({
      date: z.string().nonempty(),
      slots: z.array(z.string()),
      room: z.string().min(1, 'Room ID is required'),
      user: z.string().min(1, 'User ID is required'),
      totalAmount: z.number().optional(),
      isConfirmed: z.enum(['confirmed', 'unconfirmed']).optional(),
      isDeleted: z.boolean().optional(),
    }),
  },
  {},
);

export const BookingValidations = {
  BookingsValidationSchema,
};
