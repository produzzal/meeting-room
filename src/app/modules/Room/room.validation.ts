import { z } from 'zod';

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    roomNo: z.number().int().min(1, 'Room number must be a positive integer'),
    floorNo: z.number().int().min(1, 'Floor number must be a positive integer'),
    capacity: z.number().int().min(1, 'Capacity must be a positive integer'),
    pricePerSlot: z
      .number()
      .min(0, 'Price per slot must be a non-negative number'),
    amenities: z.array(z.string()).nonempty('At least one amenity is required'),
    isDeleted: z.boolean().optional(),
  }),
});

export const RoomValidations = {
  roomValidationSchema,
};
