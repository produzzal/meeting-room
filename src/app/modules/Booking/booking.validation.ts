import { z } from 'zod';
const BookingsValidationSchema = z.object({
  date: z.string().nonempty(),
  slots: z.array(z.string()),
  room: z.string().min(1, 'room id is required'),
  user: z.string().min(1, 'user id is required'),
  totalAmount: z.number().min(1, 'total amount is required'),
  isConfirmed: z.enum(['confirmed', 'unconfirmed']),
  isDeleted: z.boolean(),
});

export const BookingValidations = {
  BookingsValidationSchema,
};
